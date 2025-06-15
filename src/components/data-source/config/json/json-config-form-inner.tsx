import React from 'react'
import { useForm, FormProvider, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { JsonConfigForm, JsonConfigSchema } from '@/types/json-data-source'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { JsonAuthTypeField } from './json-auth-type-field'

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
  const methods = useForm<JsonConfigForm>({
    resolver: zodResolver(JsonConfigSchema),
    defaultValues,
  })
  return (
    <FormProvider {...methods}>
      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            name="url"
            control={methods.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('jsonUrl')}</FormLabel>
                <FormControl>
                  <Input {...field} placeholder={t('jsonUrlPlaceholder')} className="w-full" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="totalItemsField"
            control={methods.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('totalItemsField')}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={t('totalItemsFieldPlaceholder')}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="itemsField"
            control={methods.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('itemsField')}</FormLabel>
                <FormControl>
                  <Input {...field} placeholder={t('itemsFieldPlaceholder')} className="w-full" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="pageSizeField"
            control={methods.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('pageSizeField')}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={t('pageSizeFieldPlaceholder')}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="currentPageField"
            control={methods.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('currentPageField')}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={t('currentPageFieldPlaceholder')}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <JsonAuthTypeField />
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
              {t('fetchSample')}
            </Button>
          </div>
        </form>
      </Form>
    </FormProvider>
  )
}
