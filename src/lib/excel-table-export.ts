import { getTableDesignById } from '@/repository/table-design'
import { getDataSourceById } from '@/repository/datasource'
import { fetchJsonData } from '@/repository/datasource-data-json'
import { toExcelTableData } from '@/lib/excel-table-data'
import ExcelJS from 'exceljs'
import { ExcelDefaultColumnWidth, ExcelDefaultRowHeight } from '@/lib/defaults'

/**
 * 导出 Excel 表格，保留样式和公式
 * @param tableDesignId 表设计ID
 * @returns Buffer (xlsx 文件内容)
 */
export async function exportExcelTable(tableDesignId: string): Promise<Buffer> {
  // 获取表设计
  const tableDesign = await getTableDesignById(tableDesignId)
  if (!tableDesign) throw new Error('未找到表设计')
  // 获取数据源
  const dataSource = tableDesign.dataSourceId
    ? await getDataSourceById(tableDesign.dataSourceId)
    : null
  if (!dataSource) throw new Error('未找到数据源')
  // 获取数据
  const data = await fetchJsonData({ datasourceId: tableDesign.dataSourceId })
  // 处理为表格数据和 schema
  const { expandedData, expandedTableSchema } = await toExcelTableData(
    data,
    tableDesign.schema,
    dataSource
  )

  // 创建 workbook
  const workbook = new ExcelJS.Workbook()
  const worksheet = workbook.addWorksheet('Sheet1')

  // 设置列宽
  worksheet.columns = (expandedTableSchema.columns || []).map((col: any) => ({
    // Handsontable/HTML px 宽度转为 exceljs 字符宽度，保留两位小数
    width: col.width ? Number((col.width / 7).toFixed(2)) : ExcelDefaultColumnWidth,
  }))

  // 写入数据和样式
  expandedData.forEach((row, rowIndex) => {
    const excelRow = worksheet.addRow(row)
    // 设置行高（px 转为 point，1px ≈ 0.75pt）
    excelRow.height = (expandedTableSchema.rows?.[rowIndex]?.height || ExcelDefaultRowHeight) * 0.75
    // 设置单元格样式
    row.forEach((cell, colIndex) => {
      const cellDef = expandedTableSchema.rows?.[rowIndex]?.cells?.[colIndex]
      const excelCell = excelRow.getCell(colIndex + 1)
      // 公式
      if (typeof cell === 'string' && cell.startsWith('=')) {
        excelCell.value = { formula: cell.slice(1) }
      }
      // 对齐
      if (cellDef?.hAlign || cellDef?.vAlign) {
        excelCell.alignment = {
          horizontal: cellDef?.hAlign,
          vertical: cellDef?.vAlign,
        }
      }
    })
  })

  // 合并单元格
  if (Array.isArray(expandedTableSchema.mergeCells)) {
    expandedTableSchema.mergeCells.forEach((merge: any) => {
      const { row, col, rowspan, colspan } = merge
      if (rowspan > 1 || colspan > 1) {
        worksheet.mergeCells(row + 1, col + 1, row + rowspan, col + colspan)
      }
    })
  }

  // 返回 Node.js Buffer
  const arrayBuffer = await workbook.xlsx.writeBuffer()
  // @ts-ignore
  return Buffer.from(arrayBuffer)
}
