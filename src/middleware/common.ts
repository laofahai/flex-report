import { NextResponse } from 'next/server'
import { routing } from '@/i18n/routing'

export const publicRoutes = [
  '/',
  '/favicon.ico',
  // 登录页、错误页、sso-callback
  ...routing.locales.map((locale: string) => `/${locale}/sign-in(.*)?`),
  ...routing.locales.map((locale: string) => `/${locale}/error`),
  ...routing.locales.map((locale: string) => `/${locale}/sso-callback`),
]

export function isPublicRoute(req: any, routing: any) {
  const pathname = req.nextUrl.pathname
  return publicRoutes.some((route) => {
    if (route.endsWith('(.*)')) {
      const baseRoute = route.slice(0, -4)
      return pathname.startsWith(baseRoute)
    }
    return pathname === route
  })
}

export function getRedirectToLocale(req: any, routing: any) {
  const acceptLang = req.headers.get('accept-language') || ''
  const supported = routing.locales
  let matched = routing.defaultLocale
  for (const lang of acceptLang.split(',')) {
    const code = lang.split(';')[0].trim().split('-')[0]
    if (supported.includes(code as any)) {
      matched = code as any
      break
    }
  }
  const url = req.nextUrl.clone()
  url.pathname = `/${matched}`

  return NextResponse.redirect(url, 307)
}

export function getTokenFromRequest(req: any) {
  const urlToken = req.nextUrl.searchParams.get('sign_in_token')
  if (urlToken) return urlToken
  return req.cookies.get('session_token')?.value || null
}

export function setTokenCookie(res: any, token: string) {
  res.cookies.set('session_token', token, {
    path: '/',
    sameSite: 'lax',
  })
}
