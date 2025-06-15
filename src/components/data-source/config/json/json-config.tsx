'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useTranslations } from 'next-intl'
import { isArray, isPlainObject, keys, sortBy } from 'lodash-es'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import SampleDataCard from './sample-data-card'
import { updateDataSourceConfig } from '@/repository/datasource'
import { DataSourceSchema, DataSourceType } from '@/types/datasource-schema'
import { toast } from 'sonner'

// 工具函数区
function sortObjectKeys(obj: any): any {
  if (isArray(obj)) return obj.map(sortObjectKeys)
  if (isPlainObject(obj)) {
    return sortBy(keys(obj)).reduce((acc: any, key: string) => {
      acc[key] = sortObjectKeys(obj[key])
      return acc
    }, {})
  }
  return obj
}

function addFieldIds(fields: any, parentKey = ''): any[] {
  return Object.keys(fields).map((key) => {
    const value = fields[key]
    const id = `${parentKey}${key}_${Math.random().toString(36).slice(2, 8)}`
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      return {
        id,
        name: key,
        type: 'object',
        children: addFieldIds(value, `${key}.`),
      }
    } else {
      return {
        id,
        name: key,
        type: typeof value,
      }
    }
  })
}

// 表单组件
const jsonConfigSchema = z.object({
  url: z.string().url({ message: 'Must be a valid URL' }),
  totalItemsField: z.string().min(1, 'Required'),
  itemsField: z.string().min(1, 'Required'),
  pageSizeField: z.string().optional(),
  currentPageField: z.string().optional(),
})
type JsonConfigForm = z.infer<typeof jsonConfigSchema>

function JsonConfigFormInner({
  defaultValues,
  onSubmit,
  isSubmitting,
  errors,
  onFetchSample,
  fetching,
}: {
  defaultValues: JsonConfigForm
  onSubmit: (values: JsonConfigForm) => void
  isSubmitting: boolean
  errors: any
  onFetchSample: () => void
  fetching: boolean
}) {
  const t = useTranslations('DataSource')
  const tCommon = useTranslations('Common')
  const { register, handleSubmit } = useForm<JsonConfigForm>({
    resolver: zodResolver(jsonConfigSchema),
    defaultValues,
  })
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-xs font-medium mb-1 text-gray-700">{t('jsonUrl')}</label>
        <Input {...register('url')} placeholder={t('jsonUrlPlaceholder')} className="w-full" />
        {errors.url && <span className="text-red-500 text-xs">{errors.url.message}</span>}
      </div>
      <div>
        <label className="block text-xs font-medium mb-1 text-gray-700">
          {t('totalItemsField')}
        </label>
        <Input
          {...register('totalItemsField')}
          placeholder={t('totalItemsFieldPlaceholder')}
          className="w-full"
        />
        {errors.totalItemsField && (
          <span className="text-red-500 text-xs">{errors.totalItemsField.message}</span>
        )}
      </div>
      <div>
        <label className="block text-xs font-medium mb-1 text-gray-700">{t('itemsField')}</label>
        <Input
          {...register('itemsField')}
          placeholder={t('itemsFieldPlaceholder')}
          className="w-full"
        />
        {errors.itemsField && (
          <span className="text-red-500 text-xs">{errors.itemsField.message}</span>
        )}
      </div>
      <div>
        <label className="block text-xs font-medium mb-1 text-gray-700">{t('pageSizeField')}</label>
        <Input
          {...register('pageSizeField')}
          placeholder={t('pageSizeFieldPlaceholder')}
          className="w-full"
        />
      </div>
      <div>
        <label className="block text-xs font-medium mb-1 text-gray-700">
          {t('currentPageField')}
        </label>
        <Input
          {...register('currentPageField')}
          placeholder={t('currentPageFieldPlaceholder')}
          className="w-full"
        />
      </div>
      <div className="flex items-center gap-2 mt-2 justify-between">
        <Button type="submit" disabled={isSubmitting} className="px-6 py-2">
          {isSubmitting ? tCommon('saving') : tCommon('save')}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={onFetchSample}
          disabled={fetching}
          className="px-6 py-2"
        >
          {fetching ? t('fetching') : t('fetchSample')}
        </Button>
      </div>
    </form>
  )
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
      const url = defaultValues.url
      const itemsField = defaultValues.itemsField
      const totalItemsField = defaultValues.totalItemsField
      const pageSizeField = defaultValues.pageSizeField
      const currentPageField = defaultValues.currentPageField
      let fetchUrl = url
      const urlObj = new URL(url, window.location.origin)
      if (pageSizeField) urlObj.searchParams.set(pageSizeField, '10')
      if (currentPageField) urlObj.searchParams.set(currentPageField, '1')
      fetchUrl = urlObj.toString()
      const res = await fetch(fetchUrl)
      let items = await res.json()
      if (itemsField) {
        const keys = itemsField.split('.')
        for (const key of keys) {
          if (items && typeof items === 'object' && key in items) {
            items = items[key]
          } else {
            items = undefined
            break
          }
        }
      }
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
