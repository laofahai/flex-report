import { NextResponse } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'
import { routing } from '@/i18n/routing'
import { clerkMiddleware } from '@clerk/nextjs/server'
import { isPublicRoute, getRedirectToLocale } from '@/middleware/common'

const intlMiddleware = createIntlMiddleware(routing)

const middleware = (req: any, event?: any) =>
  clerkMiddleware(async (auth, req) => {
    const { pathname } = req.nextUrl
    if (pathname === '/' || pathname === '') {
      return getRedirectToLocale(req, routing)
    }
    if (isPublicRoute(req, routing)) {
      return intlMiddleware(req)
    }
    const session = await auth()
    const userId = session?.userId || null
    if (userId) {
      return intlMiddleware(req)
    }
    const localeMatch = pathname.match(/^\/(\w{2})(\/|$)/)
    const locale = localeMatch ? localeMatch[1] : routing.defaultLocale
    const signInUrl = new URL(`/${locale}/sign-in`, req.url)
    signInUrl.searchParams.set('redirect_url', req.nextUrl.pathname)
    return NextResponse.redirect(signInUrl, 307)
  })(req, event)

export default middleware
