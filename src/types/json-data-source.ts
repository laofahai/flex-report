// 表单组件
import { z } from 'zod'

export const JsonConfigSchema = z.object({
  url: z.string().url({ message: 'Must be a valid URL' }),
  totalItemsField: z.string().min(1, 'Required'),
  itemsField: z.string().min(1, 'Required'),
  pageSizeField: z.string().optional(),
  currentPageField: z.string().optional(),
  // 获取token方式
  tokenFetchType: z.enum(['none', 'embedToken', 'embedCode', 'apiKeySecret', 'customToken']),
  // 嵌入源token
  embedTokenParam: z.string().optional(),
  // 嵌入源code
  embedCodeParam: z.string().optional(),
  code2TokenApi: z.string().optional(),
  embedCodeApiKey: z.string().optional(),
  embedCodeApiSecret: z.string().optional(),
  // apikey+secret
  apiKey: z.string().optional(),
  apiSecret: z.string().optional(),
  apiKey2TokenApi: z.string().optional(),
  // 自定义token
  customToken: z.string().optional(),
  // token发送方式
  tokenSendType: z.enum(['none', 'header', 'urlParam']),
  sendHeaderName: z.string().optional(),
  sendUrlParamName: z.string().optional(),
})

export type JsonConfigForm = z.infer<typeof JsonConfigSchema>
