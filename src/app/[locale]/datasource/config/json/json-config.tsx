"use client";
import React, { useState } from 'react';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { updateDataSourceConfig, updateDataSourceSchema } from '@/controller/datasource';
import { convertRowKeysToSchemaFields } from '@/controller/schema';
import { ArrowLeft } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import { DataSourceField, DataSourceType } from '@/types/datasource-schema'
import JsonConfigForm, { jsonConfigSchema, JsonConfigForm as JsonConfigFormType } from './json-config-form';
import SampleDataCard from './sample-data-card';
import SchemaEditor from '../schema-editor';

export default function JsonConfig({ dataSource }: { dataSource: DataSourceType }) {
  // Use state for defaultValues so it can be updated when config changes
  const [defaultValues, setDefaultValues] = useState<JsonConfigFormType>({
    url: '',
    totalItemsField: '',
    itemsField: '',
    pageField: '',
    pageSizeField: '',
    currentPageField: '',
    ...JSON.parse(dataSource.config || '{}'),
  });

  // Update defaultValues when dataSource.config changes (after save)
  React.useEffect(() => {
    setDefaultValues({
      url: '',
      totalItemsField: '',
      itemsField: '',
      pageField: '',
      pageSizeField: '',
      currentPageField: '',
      ...JSON.parse(dataSource.config || '{}'),
    });
  }, [dataSource.config]);

  const router = useRouter();
  const params = useParams();
  const locale = Array.isArray(params?.locale) ? params.locale[0] : params?.locale || 'en';

  const [sample, setSample] = useState<any>(null);
  const [schema, setSchema] = useState<DataSourceField[]>(() => {
    try {
      const raw = typeof dataSource.schema === "string" && dataSource.schema.trim()
        ? JSON.parse(dataSource.schema)
        : [];
      // If already has id, return as is; else, convert
      if (raw.length > 0 && raw[0].id) return raw;
      // Only pass string keys to convertRowKeysToSchemaFields
      const filtered = Object.fromEntries(
        Object.entries(Array.isArray(raw) && raw.length === 1 ? raw[0] : raw)
          .filter(([k, v]) => typeof k === 'string')
      );
      return convertRowKeysToSchemaFields(filtered);
    } catch {
      return [];
    }
  });
  const [fetching, setFetching] = useState(false);
  const [schemaSaving, setSchemaSaving] = useState(false);
  const [schemaSaved, setSchemaSaved] = useState(false);

  const [formState, setFormState] = useState({
    isSubmitting: false,
    isSubmitSuccessful: false,
    errors: {},
  });

  const handleFormSubmit = async (values: JsonConfigFormType) => {
    setFormState(s => ({ ...s, isSubmitting: true }));
    await updateDataSourceConfig(dataSource.id!, values);
    setFormState(s => ({ ...s, isSubmitting: false, isSubmitSuccessful: true }));
    setTimeout(() => setFormState(s => ({ ...s, isSubmitSuccessful: false })), 1200);
    // Update defaultValues after save
    setDefaultValues({ ...values });
  };

  const fetchSample = async () => {
    setFetching(true);
    setSample(null);
    try {
      // Use config values from database (defaultValues)
      const url = defaultValues.url;
      const itemsField = defaultValues.itemsField;
      const totalItemsField = defaultValues.totalItemsField;
      const pageSizeField = defaultValues.pageSizeField;
      const currentPageField = defaultValues.currentPageField;

      // Build query params for pagination
      let fetchUrl = url;
      const urlObj = new URL(url, window.location.origin);
      if (pageSizeField) urlObj.searchParams.set(pageSizeField, '10');
      if (currentPageField) urlObj.searchParams.set(currentPageField, '1');
      fetchUrl = urlObj.toString();

      const res = await fetch(fetchUrl);
      let data = await res.json();

      // Drill down to items using itemsField (e.g. 'data.items')
      let items = data;
      if (itemsField) {
        const keys = itemsField.split('.');
        for (const key of keys) {
          if (items && typeof items === 'object' && key in items) {
            items = items[key];
          } else {
            items = undefined;
            break;
          }
        }
      }

      // Optionally get total count using totalItemsField (e.g. 'data.total')
      let totalItems = undefined;
      if (totalItemsField) {
        let total = data;
        const keys = totalItemsField.split('.');
        for (const key of keys) {
          if (total && typeof total === 'object' && key in total) {
            total = total[key];
          } else {
            total = undefined;
            break;
          }
        }
        totalItems = total;
      }

      // Infer schema from all keys in all rows (not just first row)
      let sampleData, schemaData: DataSourceField[] = [];
      if (Array.isArray(items) && items?.length > 0) {
        // Merge all keys from all rows
        const mergedRow: any = {};
        for (const row of items) {
          if (typeof row === 'object' && row !== null) {
            Object.assign(mergedRow, row);
          }
        }
        sampleData = items[0];
        schemaData = convertRowKeysToSchemaFields(mergedRow);
      } else if (items && typeof items === 'object') {
        sampleData = items;
        schemaData = convertRowKeysToSchemaFields(items);
      } else {
        sampleData = items;
        schemaData = [];
      }
      setSample(sampleData);
      setSchema(schemaData);
    } catch (e) {
      setSample({ error: 'Failed to fetch or parse data.' });
      setSchema([]);
    }
    setFetching(false);
  };

  // Helper to update nested schema fields and handle delete by id
  function handleSchemaFieldChangePath(id: string, key: string, value: string) {
    if (key === 'replace') {
      // value is a JSON stringified array of fields
      try {
        const arr = JSON.parse(value);
        if (Array.isArray(arr)) {
          setSchema(arr);
          return;
        }
      } catch {}
    }
    function update(fields: DataSourceField[]): DataSourceField[] {
      return fields
        .map(f => {
          if (f.id === id) {
            if (key === 'delete') return undefined;
            return { ...f, [key]: value };
          }
          if (f.children) {
            const updatedChildren = update(f.children);
            // If children are all deleted, remove the children property
            if (updatedChildren.length === 0) {
              const { children, ...rest } = f;
              return rest;
            }
            return { ...f, children: updatedChildren };
          }
          return f;
        })
        .filter((f): f is DataSourceField => Boolean(f));
    }

    setSchema(prev => update(prev));
  }

  const saveSchema = async () => {
    setSchemaSaving(true);
    await updateDataSourceSchema(dataSource.id!, schema);
    setSchemaSaving(false);
    setSchemaSaved(true);
    setTimeout(() => setSchemaSaved(false), 1200);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full max-w-none mx-auto ">
      {/* Left sticky card: Basic info & actions */}
      <div className="w-full md:w-80 flex-shrink-0 md:sticky md:top-6 h-fit flex flex-col">
        <Card className="p-6 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <Button type="button" variant="ghost" size="icon" onClick={() => router.push('/' + locale + '/datasource')} className="mr-2">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <span className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-bold mr-2">JSON</span>
            <span className="text-lg font-semibold text-gray-800">Data Source</span>
          </div>
          <div className="mb-2 text-sm text-gray-700 font-medium">{dataSource.name}</div>
          <JsonConfigForm
            defaultValues={defaultValues}
            onSubmit={handleFormSubmit}
            isSubmitting={formState.isSubmitting}
            isSubmitSuccessful={formState.isSubmitSuccessful}
            errors={formState.errors}
          />
        </Card>
        <SampleDataCard sample={sample} />
      </div>
      {/* Right: Schema fields */}
      <div className="flex-1 min-w-0">
        <Card className="mb-4 p-4">
          <SchemaEditor
            schema={schema}
            onFieldChange={handleSchemaFieldChangePath}
            onSave={saveSchema}
            saving={schemaSaving}
            saved={schemaSaved}
            onFetchSample={fetchSample}
            fetching={fetching}
          />
        </Card>
      </div>
    </div>
  );
}

