import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

const intlMiddleware = createIntlMiddleware(routing)

// 定义公共路由（不需要认证）
const publicRoutes = [
  '/', // 根路径
  '/favicon.ico',
  ...routing.locales.map((locale) => `/${locale}/sign-in(.*)?`), // 登录页
  ...routing.locales.map((locale) => `/${locale}/sign-up`),
  ...routing.locales.map((locale) => `/${locale}/error`),
  ...routing.locales.map((locale) => `/${locale}/sso-callback`), // 添加 Clerk 回调
  // '/api(.*)', // API路由
  '/trpc(.*)', // tRPC路由
]

const isPublicRoute = createRouteMatcher(publicRoutes)

export default clerkMiddleware(async (auth, req) => {
  const { pathname } = req.nextUrl
  const isPublic = isPublicRoute(req)

  // 1. 根路径重定向
  if (pathname === '/') {
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

  // 2. 处理公共路由
  if (isPublic) {
    return intlMiddleware(req)
  }

  // 3. 获取用户认证状态 - 修正类型问题
  const session = await auth()
  const userId = session?.userId || null

  // 4. 处理受保护路由 - 用户已登录
  if (userId) {
    return intlMiddleware(req)
  }

  // 5. 用户未登录时重定向到登录页
  const localeMatch = pathname.match(/^\/(\w{2})(\/|$)/)
  const locale = localeMatch ? localeMatch[1] : routing.defaultLocale

  // 创建登录URL
  const signInUrl = new URL(`/${locale}/sign-in`, req.url)
  signInUrl.searchParams.set('redirect_url', req.nextUrl.pathname)

  return NextResponse.redirect(signInUrl, 307)
})

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|images|assets|fonts|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
}
