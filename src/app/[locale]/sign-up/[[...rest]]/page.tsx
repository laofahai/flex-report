'use client'

import { SignUp } from '@clerk/nextjs'
import { useParams, useSearchParams } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function SignUpPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const locale = params?.locale || 'en'
  const redirectUrl = searchParams.get('redirect_url') || `/${locale}`
  const { isSignedIn } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (isSignedIn) {
      router.replace(redirectUrl)
    }
  }, [isSignedIn, redirectUrl, router])

  if (isSignedIn) return null

  return (
    <div className="flex min-h-screen items-center justify-center">
      {/*<SignUp routing="path" path={`/${locale}/sign-up`} fallbackRedirectUrl={redirectUrl} />*/}
    </div>
  )
}
