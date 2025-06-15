export type SupportedLocale = 'zh' | 'en'

export const localesMap: Record<SupportedLocale, string> = {
  zh: '简体中文',
  en: 'English',
}

export default {
  locales: Object.keys(localesMap),
  defaultLocale: 'zh',
}
