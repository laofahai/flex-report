import { z } from 'zod';
import { BaseTableZod, DataTypeEnum } from '@/types/common'
import { InputJsonValue } from '@/generated/prisma/runtime/library'

export interface DataSourceConfig {}

export const DataDictItemSchema = z.object({
  value: z.string(),
  label: z.string(),
});
export type DataDictItem = z.infer<typeof DataDictItemSchema>;

export const DataSourceFieldSchemaBase = z.object({
  id: z.string(),
  name: z.string(),
  label: z.string().optional(),
  type: DataTypeEnum,
  filterable: z.boolean().optional(),
  filterType: z.enum(['none', 'equals', 'like', 'in', 'range']).optional(),
  targetField: z.string().optional(),
  dictId: z.string().optional(),
  dataDict: z.array(DataDictItemSchema).optional(),
});

export const DataSourceFieldSchema: z.ZodType<any> = DataSourceFieldSchemaBase.extend({
  children: z.lazy(() => DataSourceFieldSchema.array()).optional(),
});

export const DataSourceSchemaSchema = z.object({
  fields: DataSourceFieldSchema.array(),
});

export type DataSourceField = z.infer<typeof DataSourceFieldSchema>;
export type DataSourceSchema = z.infer<typeof DataSourceSchemaSchema>;

export const DataSourceSchema = z.object({
  name: z.string(),
  type: z.string(),
  config: z.any(),
  schema: DataSourceSchemaSchema.optional(),
  ...BaseTableZod
});

// 移除本文件的 DataSource 类型导出，避免与 controller/datasource.ts 的 DataSource 类型冲突
export type DataSourceType = z.infer<typeof DataSourceSchema>;
