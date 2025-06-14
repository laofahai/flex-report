import { z } from "zod";
import { BaseTableZod } from '@/types/common'

export const ExcelDesignerCellSchema = z.object({
  value: z.string(),
  hAlign: z.enum(["left", "center", "right"]).optional(),
  vAlign: z.enum(["top", "middle", "bottom"]).optional(),
  variable: z.string().optional(),
  expand: z.enum(["none", "col", "row"]).optional(),
});

export const ExcelDesignerRowSchema = z.object({
  type: z.enum(["normal", "loop"]),
  height: z.number().optional(),
  cells: z.array(ExcelDesignerCellSchema),
});

export const ExcelDesignerColumnSchema = z.object({
  width: z.number().optional(),
})

export const TableDesignSchema = z.object({
  dataSourceId: z.string().optional(),
  name: z.string(),
  schema: z.object({
    // 允许后面的行/列合并超过其上级
    allowRowMergeBeyondParent: z.boolean().optional(),
    allowColumnMergeBeyondParent: z.boolean().optional(),
    rows: z.array(ExcelDesignerRowSchema),
    columns: z.array(ExcelDesignerColumnSchema),
    mergeCells: z.array(
      z.object({
        row: z.number(),
        col: z.number(),
        rowspan: z.number().optional(),
        colspan: z.number().optional()
      })
    )
  }),
  ...BaseTableZod
});

export type ExcelDesignerCell = z.infer<typeof ExcelDesignerCellSchema>;
export type ExcelDesignerRow = z.infer<typeof ExcelDesignerRowSchema>;
export type TableDesign = z.infer<typeof TableDesignSchema>;

