import { UserAuthority, UserInfo } from '@/types/sso'
import { useUserStore } from '@/store/userStore'

export const internalSSOAuth = async (token: string) => {
  const api = process.env.INTERNAL_AUTH_USERINFO_URL

  if (!api) {
    throw new Error('INTERNAL_AUTH_USERINFO_URL is required but not provided')
  }

  if (!token) {
    throw new Error('SSO token is missing')
  }

  try {
    const response = await fetch(api, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch user info: ${response.statusText}`)
    }

    const data: UserInfo = await response.json()

    if (!data?.id) {
      throw new Error('Invalid user info received from SSO')
    }

    return data
  } catch (error) {
    console.error('Error during internal SSO authentication:', error)
    throw error
  }
}

export const isAuthorized = (node: UserAuthority | UserAuthority[]) => {
  const { user } = useUserStore.getState()
  if (!user) return false
  // 假设 node.authority 是字符串或字符串数组，user.authorities 也是
  if (!node) return true // 没有限制则默认通过
  const required = Array.isArray(node) ? node : [node]
  const userAuths = user.authorities || []
  return required.some((auth) => userAuths.includes(auth))
}
