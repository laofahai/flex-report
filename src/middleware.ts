import createIntlMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'
import { getRedirectToLocale } from '@/middleware/common'

// 动态引入 Clerk 相关
const hasClerk = process.env.AUTH_TYPE === 'clerk'

const intlMiddleware = createIntlMiddleware(routing)

import clerkMiddlewareImpl from './middleware/clerk'
import internalMiddlewareImpl from './middleware/internal'

const authType = process.env.AUTH_TYPE

const middleware = (req: any, event?: any) => {
  if (authType === 'clerk') {
    return clerkMiddlewareImpl(req, event)
  } else if (authType === 'internal') {
    return internalMiddlewareImpl(req)
  } else {
    const { pathname } = req.nextUrl
    if (pathname === '/' || pathname === '') {
      return getRedirectToLocale(req, routing)
    }
    return intlMiddleware(req)
  }
}

export default middleware

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|images|assets|fonts|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
}
