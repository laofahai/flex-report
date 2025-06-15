'use client'
import React, { useState } from 'react'
import JsonConfig from '../../app/[locale]/data-source/config/json/json-config'
import DataSourceBasicForm from '@/components/data-source/data-source-basic-form'
import SchemaEditorWrapper from '@/components/data-source/schema-editor-wrapper'
import { DataSourceSchema, DataSourceType } from '@/types/datasource-schema'
import { useTranslations } from 'next-intl'

export default function EditDsPageClient({
  ds,
  initialSchema,
}: {
  ds: DataSourceType
  initialSchema: DataSourceSchema
}) {
  const [schema, setSchema] = useState<DataSourceSchema>(initialSchema)
  const t = useTranslations('DataSource')
  const tCommon = useTranslations('Common')

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full max-w-none mx-auto ">
      <div className="w-full md:w-80 flex-shrink-0 md:sticky md:top-6 h-fit flex flex-col">
        <div className="mb-6 max-w-md">
          <DataSourceBasicForm dataSource={ds} />
        </div>
        {ds.type === 'JSON' && (
          <JsonConfig
            dataSource={ds}
            onSampleUpdated={(_sample, newSchema) => {
              console.log(newSchema, _sample)
              setSchema(newSchema)
            }}
          />
        )}
        {ds.type === 'MySQL' && <div>{t('mysqlConfigPage', { id: ds.id! })}</div>}
        {ds.type !== 'JSON' && ds.type !== 'MySQL' && (
          <div>{t('unsupportedType', { type: ds.type })}</div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <SchemaEditorWrapper schema={schema} dataSourceId={ds.id!} />
      </div>
    </div>
  )
}
