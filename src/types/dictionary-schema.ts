import { z } from 'zod'

export const DictionaryItemSchema = z.object({
  label: z.string(),
  value: z.union([z.string(), z.number()]),
  description: z.string().optional(),
})

export const DataDictSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  items: z.array(DictionaryItemSchema).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type DictionaryItem = z.infer<typeof DictionaryItemSchema>
export type DataDict = z.infer<typeof DataDictSchema>
