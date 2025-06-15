import { JsonConfigForm } from '@/types/json-data-source'

/**
 * 根据配置将 token 添加到请求 header 或 url param
 * @param url 原始 url
 * @param headers 原始 headers
 * @param token token 字符串
 * @param config JsonConfigForm
 * @returns { url, headers } 新的 url 和 headers
 */
export function sendJsonToken({
  url,
  headers = {},
  token,
  config,
}: {
  url: URL
  headers?: Record<string, string>
  token?: string
  config: JsonConfigForm
}): { url: URL; headers: Record<string, string> } {
  if (!token || config.tokenSendType === 'none') {
    return { url, headers }
  }
  if (config.tokenSendType === 'header') {
    const headerName = config.sendHeaderName || 'Authorization'
    return {
      url,
      headers: { ...headers, [headerName]: token },
    }
  }
  if (config.tokenSendType === 'urlParam') {
    const paramName = config.sendUrlParamName || 'access_token'
    url.searchParams.set(paramName, token)
    return { url, headers }
  }
  return { url, headers }
}
