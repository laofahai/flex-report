import { defineRouting } from 'next-intl/routing'
import { localesMap } from '../../next-intl.config'

export const routing = defineRouting({
  // A list of all messages that are supported
  locales: Object.keys(localesMap),

  // Used when no locale matches
  defaultLocale: 'zh',
})
