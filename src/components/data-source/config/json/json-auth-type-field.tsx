import React from 'react'
import { useFormContext, useWatch, Controller } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { useTranslations } from 'next-intl'

export function JsonAuthTypeField() {
  const { control } = useFormContext()
  const t = useTranslations('DataSource')
  const tokenFetchType = useWatch({ control, name: 'tokenFetchType' })
  const tokenSendType = useWatch({ control, name: 'tokenSendType' })

  return (
    <>
      {/* 获取token方式 */}
      <FormField
        name="tokenFetchType"
        control={control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('tokenFetchType')}</FormLabel>
            <FormControl>
              <select {...field} className="w-full border rounded px-2 py-1">
                <option value="none">{t('tokenFetchNone')}</option>
                <option value="embedToken">{t('tokenFetchEmbedToken')}</option>
                <option value="embedCode">{t('tokenFetchEmbedCode')}</option>
                <option value="apiKeySecret">{t('tokenFetchApiKeySecret')}</option>
                <option value="customToken">{t('tokenFetchCustomToken')}</option>
              </select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {tokenFetchType === 'embedToken' && (
        <FormField
          name="embedTokenParam"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('embedTokenParam')}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value ?? ''}
                  placeholder={t('embedTokenParamPlaceholder')}
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      {tokenFetchType === 'embedCode' && (
        <>
          <FormField
            name="embedCodeParam"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('embedCodeParam')}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value ?? ''}
                    placeholder={t('embedCodeParamPlaceholder')}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="code2TokenApi"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('code2TokenApi')}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value ?? ''}
                    placeholder={t('code2TokenApiPlaceholder')}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="embedCodeApiKey"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('embedCodeApiKey')}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value ?? ''}
                    placeholder={t('embedCodeApiKeyPlaceholder')}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="embedCodeApiSecret"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('embedCodeApiSecret')}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value ?? ''}
                    placeholder={t('embedCodeApiSecretPlaceholder')}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      )}
      {tokenFetchType === 'apiKeySecret' && (
        <>
          <FormField
            name="apiKey"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('apiKey')}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value ?? ''}
                    placeholder={t('apiKeyPlaceholder')}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="apiSecret"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('apiSecret')}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value ?? ''}
                    placeholder={t('apiSecretPlaceholder')}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="apiKey2TokenApi"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('apiKey2TokenApi')}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value ?? ''}
                    placeholder={t('apiKey2TokenApiPlaceholder')}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      )}
      {tokenFetchType === 'customToken' && (
        <FormField
          name="customToken"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('customToken')}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value ?? ''}
                  placeholder={t('customTokenPlaceholder')}
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      {/* token发送方式 */}
      <FormField
        name="tokenSendType"
        control={control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('tokenSendType')}</FormLabel>
            <FormControl>
              <select {...field} className="w-full border rounded px-2 py-1">
                <option value="none">{t('tokenSendNone')}</option>
                <option value="header">{t('tokenSendHeader')}</option>
                <option value="urlParam">{t('tokenSendUrlParam')}</option>
              </select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {tokenSendType === 'header' && (
        <FormField
          name="sendHeaderName"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('sendHeaderName')}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value ?? ''}
                  placeholder={t('sendHeaderNamePlaceholder')}
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      {tokenSendType === 'urlParam' && (
        <FormField
          name="sendUrlParamName"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('sendUrlParamName')}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value ?? ''}
                  placeholder={t('sendUrlParamNamePlaceholder')}
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </>
  )
}
