'use client'
import React, { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Card } from '@/components/ui/card'
import SampleDataCard from './sample-data-card'
import { updateDataSourceConfig } from '@/repository/datasource'
import { DataSourceSchema, DataSourceType } from '@/types/datasource-schema'
import { toast } from 'sonner'
import { JsonConfigForm, JsonConfigSchema } from '@/types/json-data-source'
import JsonConfigFormInner from './json-config-form-inner'
import { fetchJsonData } from '@/repository/datasource-data-json'

// 对象 key 排序，返回新对象
function sortObjectKeys<T extends object>(obj: T): T {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return obj
  return Object.keys(obj)
    .sort()
    .reduce((acc, key) => {
      // @ts-ignore
      acc[key] = obj[key]
      return acc
    }, {} as T)
}

// 为对象字段加上 id 字段（用于 schema）
function addFieldIds(obj: any): any[] {
  if (!obj || typeof obj !== 'object') return []
  return Object.keys(obj).map((key, idx) => ({
    id: key,
    name: key,
    type: typeof obj[key],
  }))
}

// 主组件
export default function JsonConfig({
  dataSource,
  onSampleUpdated,
}: {
  dataSource: DataSourceType
  onSampleUpdated?: (sample: any, schema: DataSourceSchema) => void
}) {
  const [defaultValues, setDefaultValues] = useState<JsonConfigForm>({
    url: '',
    totalItemsField: '',
    itemsField: '',
    pageField: '',
    pageSizeField: '',
    currentPageField: '',
    ...dataSource.config,
  })
  React.useEffect(() => {
    setDefaultValues({
      url: '',
      totalItemsField: '',
      itemsField: '',
      pageField: '',
      pageSizeField: '',
      currentPageField: '',
      ...dataSource.config,
    })
  }, [dataSource.config])

  const [sample, setSample] = useState<any>(null)
  const [fetching, setFetching] = useState(false)
  const [formState, setFormState] = useState({
    isSubmitting: false,
    errors: {},
  })
  const [lastSchema, setLastSchema] = useState<DataSourceSchema | null>(null)

  const t = useTranslations('DataSource')
  const tCommon = useTranslations('Common')

  // 提交表单
  const handleFormSubmit = async (values: JsonConfigForm) => {
    setFormState((s) => ({ ...s, isSubmitting: true }))
    await updateDataSourceConfig(dataSource.id!, values)
    setFormState((s) => ({ ...s, isSubmitting: false }))
    toast.success(tCommon('saveSuccess'))
    setDefaultValues({ ...values })
  }

  // 获取样例并推断 schema
  const fetchSample = async () => {
    setFetching(true)
    setSample(null)
    try {
      const data = await fetchJsonData({
        datasourceId: dataSource.id,
        pageSize: 1,
      })

      const { items } = data

      let sampleData,
        schemaData: DataSourceSchema = { fields: [] }
      if (Array.isArray(items) && items?.length > 0) {
        const mergedRow: any = {}
        for (const row of items) {
          if (typeof row === 'object' && row !== null) {
            Object.assign(mergedRow, row)
          }
        }
        sampleData = sortObjectKeys(items[0])
        schemaData = {
          fields: addFieldIds(sortObjectKeys(mergedRow)),
        }
      } else if (items && typeof items === 'object') {
        sampleData = sortObjectKeys(items)
        schemaData = {
          fields: addFieldIds(sortObjectKeys(items)),
        }
      } else {
        sampleData = items
        schemaData = {
          fields: [],
        }
      }

      console.log(items, sampleData)
      setSample(sampleData)
      setLastSchema(schemaData)
    } catch (e) {
      setSample({ error: 'Failed to fetch or parse data.' })
      setLastSchema({ fields: [] })
    }
    setFetching(false)
  }

  return (
    <div className="flex flex-col gap-4 w-full max-w-none mx-auto ">
      <Card className="p-4">
        <JsonConfigFormInner
          defaultValues={defaultValues}
          onSubmit={handleFormSubmit}
          isSubmitting={formState.isSubmitting}
          errors={formState.errors}
          onFetchSample={fetchSample}
          fetching={fetching}
        />
      </Card>
      <SampleDataCard
        sample={sample}
        onUpdateSchema={
          !sample || !lastSchema
            ? undefined
            : () => {
                if (onSampleUpdated && sample && lastSchema) {
                  onSampleUpdated(sample, lastSchema)
                }
              }
        }
      />
    </div>
  )
}
