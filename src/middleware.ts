import { NextResponse } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'
import { createRouteMatcher } from '@clerk/nextjs/server'

// 动态引入 Clerk 相关
const hasClerk = process.env.AUTH_TYPE === 'clerk'

const intlMiddleware = createIntlMiddleware(routing)

// 定义公共路由（不需要认证）
const publicRoutes = [
  '/', // 根路径
  '/favicon.ico',
  ...routing.locales.map((locale) => `/${locale}/sign-in(.*)?`), // 登录页
  ...routing.locales.map((locale) => `/${locale}/error`),
  ...routing.locales.map((locale) => `/${locale}/sso-callback`), // 添加 Clerk 回调
]

let isPublicRoute: (req: any) => boolean
const authType = process.env.AUTH_TYPE

switch (authType) {
  case 'clerk':
    isPublicRoute = createRouteMatcher(publicRoutes)
    break
  case 'internal':
    isPublicRoute = (req: any) => {
      const pathname = req.nextUrl.pathname
      return publicRoutes.some((route) => {
        if (route.endsWith('(.*)')) {
          const baseRoute = route.slice(0, -4)
          return pathname.startsWith(baseRoute)
        }
        return pathname === route
      })
    }
    break
  case 'none':
    isPublicRoute = () => true
    isPublicRoute = (req: any) => true
}

import clerkMiddlewareImpl from './middleware/clerk'
import internalMiddlewareImpl from './middleware/internal'
import { getRedirectToLocale } from './middleware/common'

const middlewareImpl = (req: any, event?: any) => {
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

export default middlewareImpl

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|images|assets|fonts|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
}
