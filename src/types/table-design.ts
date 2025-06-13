import { z } from "zod";
import { BaseTableZod } from '@/types/common'

export const ExcelDesignerCellSchema = z.object({
  value: z.string(),
  variable: z.string().optional(),
  expand: z.enum(["none", "col", "row"]).optional(),
});

export const ExcelDesignerRowSchema = z.object({
  type: z.enum(["normal", "loop"]),
  cells: z.array(ExcelDesignerCellSchema),
});

export const TableDesignSchema = z.object({
  dataSourceId: z.string(),
  name: z.string(),
  schema: z.object({
    rows: z.array(ExcelDesignerRowSchema),
  }),
  ...BaseTableZod
});

export type ExcelDesignerCell = z.infer<typeof ExcelDesignerCellSchema>;
export type ExcelDesignerRow = z.infer<typeof ExcelDesignerRowSchema>;
export type TableDesign = z.infer<typeof TableDesignSchema>;

