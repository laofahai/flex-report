'use client'

import { useEffect } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useClerk } from '@clerk/nextjs'

export default function SSOSignInPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const params = useParams()

  const { client } = useClerk()
  const token = searchParams.get('sign_in_token')
  const redirectUrl = searchParams.get('redirect_url') || `/${params.locale}`

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href)
      // 支持所有常见参数名，和 get-json-token.ts 的 key 规则一致
      const signInToken = url.searchParams.get('sign_in_token')
      if (signInToken) {
        sessionStorage.setItem('json_embed_token_sign_in_token', signInToken)
      }
      const code = url.searchParams.get('code')
      if (code) {
        sessionStorage.setItem('json_embed_code_token_code', code)
      }
      // 如果没开启 Clerk，直接跳转
      if (!client) {
        router.replace(redirectUrl)
        return
      }
    }
    if (!token || !client) {
      console.error('SSO token or Clerk client is missing')
      return
    }

    const handleSignIn = async () => {
      try {
        // 使用 Clerk 的 ticket 策略进行 SSO 登录
        const signInAttempt = await client.signIn.create({
          strategy: 'ticket',
          ticket: token as string,
        })

        console.log(signInAttempt)
        if (signInAttempt.status === 'complete') {
          router.replace(redirectUrl)
        } else {
          throw new Error('SSO login failed')
        }
      } catch (error) {
        console.error('SSO 登录失败:', error)
        router.replace('/sign-in?error=sso_failed')
      }
    }
    handleSignIn()
  }, [token, client, router])

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">正在登录中...</h1>
        <p>请稍候，正在验证您的登录信息</p>
      </div>
    </div>
  )
}

