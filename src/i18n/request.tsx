import { getRequestConfig } from 'next-intl/server'

const defaultLocale = 'zh'
const locales = ['zh', 'en']

export default getRequestConfig(async ({ locale }) => {
  const safeLocale = locale && locales.includes(locale) ? locale : defaultLocale
  return {
    locale: safeLocale,
    messages: (await import(`@/locales/${safeLocale}.json`)).default,
  }
})
