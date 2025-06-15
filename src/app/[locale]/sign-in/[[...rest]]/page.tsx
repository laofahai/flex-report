'use client'
import { SignIn } from '@clerk/nextjs'
import { useParams, useSearchParams } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function SignInPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const locale = params?.locale || 'en'
  const redirectUrl = searchParams.get('redirect_url') || `/${locale}`
  const { isSignedIn, isLoaded } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.replace(redirectUrl)
    }
  }, [isLoaded, isSignedIn, redirectUrl, router])

  if (!isLoaded) return null
  if (isSignedIn) return null

  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignIn
        routing="path"
        path={`/${locale}/sign-in`}
        fallbackRedirectUrl={redirectUrl}
        signUpUrl=""
        appearance={{
          elements: {
            footerAction__signUp: { display: 'none' },
            footerAction__signIn: { display: 'none' },
          },
        }}
      />
    </div>
  )
}
