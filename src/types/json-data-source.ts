// 表单组件
import { z } from 'zod'

export const JsonConfigSchema = z.object({
  url: z.string().url({ message: 'Must be a valid URL' }),
  totalItemsField: z.string().min(1, 'Required'),
  itemsField: z.string().min(1, 'Required'),
  pageSizeField: z.string().optional(),
  currentPageField: z.string().optional(),
})

export type JsonConfigForm = z.infer<typeof JsonConfigSchema>
