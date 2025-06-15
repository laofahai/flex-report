import { NextResponse } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

// 动态引入 Clerk 相关
const hasClerk = Boolean(
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY
)
let clerkMiddleware: any, createRouteMatcher: any
if (hasClerk) {
  // 只有在需要时才 require，避免构建报错
  ;({ clerkMiddleware, createRouteMatcher } = require('@clerk/nextjs/server'))
}

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

const isPublicRoute = hasClerk ? createRouteMatcher(publicRoutes) : (req: any) => true

const customMiddleware = async (req: any) => {
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

  // 只用 next-intl
  return intlMiddleware(req)
}

export default hasClerk
  ? clerkMiddleware(async (auth: any, req: any) => customMiddleware(req))
  : customMiddleware

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|images|assets|fonts|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
}
