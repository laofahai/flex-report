// 用于根据 Clerk 配置动态渲染 Clerk 相关组件
import React from 'react'

const hasClerk = process.env.AUTH_TYPE === 'clerk'

interface Props {
  children: React.ReactNode
  alternative?: React.ReactNode
}

export function ClerkFeatureFlag({ children, alternative }: Props) {
  if (!hasClerk) {
    return <>{alternative || null}</>
  }
  return <>{children}</>
}
