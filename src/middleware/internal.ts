import { NextResponse } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'
import { routing } from '@/i18n/routing'
import { internalSSOAuth } from '@/lib/internal-sso'
import {
  isPublicRoute,
  getRedirectToLocale,
  getTokenFromRequest,
  setTokenCookie,
} from '@/middleware/common'

const intlMiddleware = createIntlMiddleware(routing)

function getRedirectToLocaleWrapper(req: any) {
  return getRedirectToLocale(req, routing)
}

function getTokenFromRequestWrapper(req: any) {
  return getTokenFromRequest(req)
}

function setTokenCookieWrapper(res: any, token: string) {
  setTokenCookie(res, token)
}

const middleware = async (req: any) => {
  const { pathname } = req.nextUrl
  if (pathname === '/' || pathname === '') {
    return getRedirectToLocaleWrapper(req)
  }

  if (isPublicRoute(req, routing)) {
    return intlMiddleware(req)
  }

  const urlToken = req.nextUrl.searchParams.get('sign_in_token')
  const token = getTokenFromRequestWrapper(req) || urlToken
  const isUrlToken = !!urlToken

  if (!token) {
    const internalAuthUrl = process.env.INTERNAL_AUTH_URL
    if (!internalAuthUrl) {
      throw new Error('INTERNAL_AUTH_URL is not defined in environment variables')
    }
    const url = new URL(internalAuthUrl)

    // 如果没有 token，重定向到内部认证页面，redirect_url 为http://domain.com/sign-in/sso?redirect_url=当前请求完整URL
    const redirectUrl = new URL('/sign-in/sso', req.nextUrl.href)
    redirectUrl.searchParams.set('redirect_url', req.nextUrl.href)
    url.searchParams.set('redirect_url', redirectUrl.toString())

    // return
    return NextResponse.redirect(url, 307)
  }
  const session = await internalSSOAuth(token)
  const userId = session?.id || null
  if (userId) {
    if (isUrlToken) {
      const url = req.nextUrl.clone()
      url.searchParams.delete('sign_in_token')
      const res = NextResponse.redirect(url, 307)

      setTokenCookieWrapper(res, token)
      return res
    }
    return intlMiddleware(req)
  } else {
    const internalAuthUrl = process.env.INTERNAL_AUTH_URL
    if (!internalAuthUrl) {
      throw new Error('INTERNAL_AUTH_URL is not defined in environment variables')
    }
    const url = new URL(internalAuthUrl)
    url.searchParams.set('redirect_url', req.nextUrl.pathname)
    return NextResponse.redirect(url, 307)
  }
}

export default middleware
