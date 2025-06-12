"use client";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { updateDataSourceConfig, updateDataSourceSchema } from '@/actions/datasource';
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

const jsonConfigSchema = z.object({
  url: z.string().url({ message: 'Must be a valid URL' }),
  totalItemsField: z.string().min(1, 'Required'),
  itemsField: z.string().min(1, 'Required'),
  pageField: z.string().optional(),
  pageSizeField: z.string().optional(),
  currentPageField: z.string().optional(),
});

type JsonConfigForm = z.infer<typeof jsonConfigSchema>;

export default function JsonConfig({ dataSource }: { dataSource: { id: string; name: string; config?: string; schema?: string } }) {
  const defaultValues: JsonConfigForm = {
    url: '',
    totalItemsField: '',
    itemsField: '',
    pageField: '',
    pageSizeField: '',
    currentPageField: '',
    ...JSON.parse(dataSource.config || '{}'),
  };

  const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm<JsonConfigForm>({
    resolver: zodResolver(jsonConfigSchema),
    defaultValues,
  });

  const router = useRouter();

  const [sample, setSample] = useState<any>(null);
  const [schema, setSchema] = useState<any[]>(() => {
    try {
      return dataSource.schema ? JSON.parse(dataSource.schema) : [];
    } catch {
      return [];
    }
  });
  const [fetching, setFetching] = useState(false);
  const [schemaSaving, setSchemaSaving] = useState(false);
  const [schemaSaved, setSchemaSaved] = useState(false);

  const onSubmit = async (values: JsonConfigForm) => {
    await updateDataSourceConfig(dataSource.id, values);
  };

  const fetchSample = async () => {
    setFetching(true);
    setSample(null);
    try {
      const url = (document.querySelector('input[name="url"]') as HTMLInputElement)?.value || defaultValues.url;
      const res = await fetch(url);
      const data = await res.json();
      let items = data;
      if (defaultValues.itemsField) {
        for (const key of defaultValues.itemsField.split('.')) {
          items = items?.[key];
        }
      }
      if (Array.isArray(items) && items.length > 0) {
        setSample(items[0]);
        setSchema(Object.keys(items[0] || {}).map(k => ({ name: k, type: typeof items[0][k], value: items[0][k] })));
      } else {
        setSample(items);
        setSchema([]);
      }
    } catch (e) {
      setSample({ error: 'Failed to fetch or parse data.' });
      setSchema([]);
    }
    setFetching(false);
  };

  const handleSchemaFieldChange = (idx: number, key: string, value: string) => {
    setSchema(sch => sch.map((f, i) => i === idx ? { ...f, [key]: value } : f));
  };

  const saveSchema = async () => {
    setSchemaSaving(true);
    await updateDataSourceSchema(dataSource.id, schema);
    setSchemaSaving(false);
    setSchemaSaved(true);
    setTimeout(() => setSchemaSaved(false), 1200);
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 w-full max-w-none mx-auto mt-8">
      {/* Left sticky card: Basic info & actions */}
      <div className="w-full md:w-80 flex-shrink-0 md:sticky md:top-8 h-fit">
        <Card className="p-6 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <Button type="button" variant="ghost" size="icon" onClick={() => router.push('../../')} className="mr-2">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <span className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-bold mr-2">JSON</span>
            <span className="text-lg font-semibold text-gray-800">Data Source</span>
          </div>
          <div className="mb-2 text-sm text-gray-700 font-medium">{dataSource.name}</div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-xs font-medium mb-1 text-gray-700">JSON URL</label>
              <Input {...register('url')} placeholder="https://api.example.com/data" className="w-full" />
              {errors.url && <span className="text-red-500 text-xs">{errors.url.message}</span>}
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 text-gray-700">Total Items Field</label>
              <Input {...register('totalItemsField')} placeholder="data.totalItems" className="w-full" />
              {errors.totalItemsField && <span className="text-red-500 text-xs">{errors.totalItemsField.message}</span>}
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 text-gray-700">Items Field</label>
              <Input {...register('itemsField')} placeholder="data.list" className="w-full" />
              {errors.itemsField && <span className="text-red-500 text-xs">{errors.itemsField.message}</span>}
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 text-gray-700">Page Size Field</label>
              <Input {...register('pageSizeField')} placeholder="pageSize" className="w-full" />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 text-gray-700">Current Page Field</label>
              <Input {...register('currentPageField')} placeholder="currentPage" className="w-full" />
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Button type="submit" disabled={isSubmitting} className="px-6 py-2">
                {isSubmitting ? 'Saving...' : 'Save'}
              </Button>
              {isSubmitSuccessful && (
                <div className="flex items-center gap-1 text-green-600 text-xs bg-green-50 px-2 py-1 rounded shadow-sm animate-fade-in">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Saved</span>
                </div>
              )}
            </div>
          </form>
          <div className="flex items-center gap-2 mt-6">
            <Button type="button" variant="secondary" onClick={fetchSample} disabled={fetching} className="w-full">
              {fetching ? 'Fetching...' : 'Fetch Sample'}
            </Button>
          </div>
        </Card>
        {sample && (
          <Card className="mb-4 p-4 bg-gray-50 mt-4">
            <div className="font-semibold mb-2">Sample Data</div>
            <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto max-h-40">{JSON.stringify(sample, null, 2)}</pre>
          </Card>
        )}
      </div>
      {/* Right: Schema fields */}
      <div className="flex-1 min-w-0">
        <Card className="mb-4 p-4">
          <div className="font-semibold mb-2">Data Source Schema</div>
          {schema.length === 0 ? (
            <div className="text-gray-500 text-sm">No schema detected. Fetch a sample to infer schema.</div>
          ) : (
            <table className="w-full text-xs border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 border">Field</th>
                  <th className="p-2 border">Type</th>
                  <th className="p-2 border">Object Fields</th>
                </tr>
              </thead>
              <tbody>
                {schema.map((f, i) => (
                  <tr key={i}>
                    <td className="p-2 border">
                      <Input value={f.name} onChange={e => handleSchemaFieldChange(i, 'name', e.target.value)} className="text-xs" />
                    </td>
                    <td className="p-2 border">
                      <Input value={f.type} onChange={e => handleSchemaFieldChange(i, 'type', e.target.value)} className="text-xs" />
                    </td>
                    <td className="p-2 border">
                      {f.type === 'object' && f.value && typeof f.value === 'object' ? (
                        <pre className="bg-gray-100 p-2 rounded text-xxs max-h-24 overflow-auto">{JSON.stringify(Object.keys(f.value), null, 2)}</pre>
                      ) : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <div className="flex gap-2 mt-4">
            <Button type="button" onClick={saveSchema} disabled={schemaSaving || schema.length === 0}>
              {schemaSaving ? 'Saving...' : 'Save Schema'}
            </Button>
            {schemaSaved && <span className="text-green-600 text-sm">Schema Saved!</span>}
          </div>
        </Card>
      </div>
    </div>
  );
}

