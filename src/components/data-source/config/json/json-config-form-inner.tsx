import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { JsonConfigForm, JsonConfigSchema } from '@/types/json-data-source'

export default function JsonConfigFormInner({
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
    resolver: zodResolver(JsonConfigSchema),
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
