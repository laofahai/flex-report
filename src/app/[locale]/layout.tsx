import type { Metadata } from 'next'
import '../globals.css'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { routing } from '@/i18n/routing'
import { notFound } from 'next/navigation'
import React from 'react'
import { ClerkProvider } from '@clerk/nextjs'
import * as clerkLocals from '@clerk/localizations'

export const metadata: Metadata = {
  title: 'FlexReport',
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  const hasClerk = process.env.AUTH_TYPE === 'clerk'

  const clerkLocalization = locale === 'zh' ? clerkLocals.zhCN : clerkLocals.enUS
  const content = (
    <html lang={locale}>
      <body className={`antialiased`}>
        <NextIntlClientProvider locale={locale}>{children}</NextIntlClientProvider>
      </body>
    </html>
  )
  if (hasClerk) {
    return (
      <ClerkProvider localization={clerkLocalization} afterSignOutUrl={`/${locale}/sign-in`}>
        {content}
      </ClerkProvider>
    )
  }
  return content
}
