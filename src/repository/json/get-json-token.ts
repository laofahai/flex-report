import { JsonConfigForm } from '@/types/json-data-source'

export interface JsonTokenFetcher {
  match(config: JsonConfigForm): boolean
  getToken(config: JsonConfigForm): Promise<string | undefined>
}

class NoneTokenFetcher implements JsonTokenFetcher {
  match(config: JsonConfigForm) {
    return config.tokenFetchType === 'none'
  }
  async getToken() {
    return undefined
  }
}

// 工具：sessionStorage 缓存 token/code
function getSessionCache(key: string, fallbackKeys: string[] = []): string | undefined {
  if (typeof window === 'undefined') return undefined
  let val = sessionStorage.getItem(key)
  if (val) return val
  for (const k of fallbackKeys) {
    val = sessionStorage.getItem(k)
    if (val) return val
  }
  return undefined
}

function setSessionCache(key: string, value: string) {
  if (typeof window === 'undefined') return
  sessionStorage.setItem(key, value)
}

class EmbedTokenFetcher implements JsonTokenFetcher {
  match(config: JsonConfigForm) {
    return config.tokenFetchType === 'embedToken'
  }
  async getToken(config: JsonConfigForm) {
    if (!config.embedTokenParam) return undefined
    if (typeof window !== 'undefined') {
      // 优先从 sessionStorage 取，兼容 sign_in_token
      const cacheKey = `json_embed_token_${config.embedTokenParam}`
      const fallbackKeys = ['json_embed_token_sign_in_token']
      let token = getSessionCache(cacheKey, fallbackKeys)
      if (token) return token
      const url = new URL(window.location.href)
      token = url.searchParams.get(config.embedTokenParam) || undefined
      if (token) sessionStorage.setItem(cacheKey, token)
      return token
    }
    return undefined
  }
}

class EmbedCodeFetcher implements JsonTokenFetcher {
  match(config: JsonConfigForm) {
    return config.tokenFetchType === 'embedCode'
  }
  async getToken(config: JsonConfigForm) {
    if (!config.embedCodeParam || !config.code2TokenApi) return undefined
    if (typeof window !== 'undefined') {
      // 优先从 sessionStorage 取，兼容 code
      const cacheKey = `json_embed_code_token_${config.embedCodeParam}`
      const fallbackKeys = ['json_embed_code_token_code']
      let token = getSessionCache(cacheKey, fallbackKeys)
      if (token) return token
      const url = new URL(window.location.href)
      const code = url.searchParams.get(config.embedCodeParam)
      if (!code) return undefined
      const body: Record<string, string> = { code }
      if (config.embedCodeApiKey) body.client_id = config.embedCodeApiKey
      if (config.embedCodeApiSecret) body.client_secret = config.embedCodeApiSecret
      const resp = await fetch(config.code2TokenApi, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (!resp.ok) return undefined
      const data = await resp.json()
      token = data.access_token || data.token || undefined
      if (token) sessionStorage.setItem(cacheKey, token)
      return token
    }
    return undefined
  }
}

class ApiKeySecretFetcher implements JsonTokenFetcher {
  match(config: JsonConfigForm) {
    return config.tokenFetchType === 'apiKeySecret'
  }
  async getToken(config: JsonConfigForm) {
    if (!config.apiKey || !config.apiSecret || !config.apiKey2TokenApi) return undefined
    const resp = await fetch(config.apiKey2TokenApi, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ apiKey: config.apiKey, apiSecret: config.apiSecret }),
    })
    if (!resp.ok) return undefined
    const data = await resp.json()
    return data.access_token || data.token || undefined
  }
}

class CustomTokenFetcher implements JsonTokenFetcher {
  match(config: JsonConfigForm) {
    return config.tokenFetchType === 'customToken'
  }
  async getToken(config: JsonConfigForm) {
    return config.customToken || undefined
  }
}

const fetchers: JsonTokenFetcher[] = [
  new NoneTokenFetcher(),
  new EmbedTokenFetcher(),
  new EmbedCodeFetcher(),
  new ApiKeySecretFetcher(),
  new CustomTokenFetcher(),
]

export async function getJsonToken(config: JsonConfigForm): Promise<string | undefined> {
  const fetcher = fetchers.find((f) => f.match(config))
  if (!fetcher) return undefined
  return fetcher.getToken(config)
}
