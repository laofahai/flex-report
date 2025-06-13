import { z } from 'zod'

export type Pagination<T> = {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export const BaseTableZod = {
  id: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
}

export const DataTypeEnum = z.enum(['string', 'number', 'boolean', 'object', 'array', 'date', 'enum'])