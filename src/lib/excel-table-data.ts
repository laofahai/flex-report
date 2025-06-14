import { DatasourceData } from '@/types/datasource-data'
import { TableDesign } from '@/types/table-design'
import { get } from 'lodash-es'
import { DataDictItem, DataSourceField, DataSourceType } from '@/types/datasource-schema'
import { getDictionaries, getDictionaryByIdIn } from '@/repository/dictionary'
import { DataDict, DictionaryItem } from '@/types/dictionary-schema'

interface HandleDataExpandResult {
  merges: TableDesign['schema']['mergeCells']
  data: any[][]
}

export const handleDataExpand = (
  tableSchema: TableDesign['schema'],
  plainData: any[][]
): HandleDataExpandResult => {
  const merges: TableDesign['schema']['mergeCells'] = []
  const data = plainData.map((row) => [...row])
  const rowCount = tableSchema.rows.length
  const colCount = tableSchema.columns.length
  const mergedMap: boolean[][] = Array.from({ length: data.length }, () =>
    Array(colCount).fill(false)
  )

  // 自动检测主分组列（第一个有 expand=row 的列）
  let groupColIdx = -1
  for (let colIdx = 0; colIdx < colCount; colIdx++) {
    for (let rowIdx = 0; rowIdx < rowCount; rowIdx++) {
      const cell = tableSchema.rows[rowIdx]?.cells?.[colIdx]
      if (cell && cell.expand === 'row') {
        groupColIdx = colIdx
        break
      }
    }
    if (groupColIdx !== -1) break
  }

  // 自动检测主分组行（第一个有 expand=col 的行）
  let groupRowIdx = -1
  for (let rowIdx = 0; rowIdx < rowCount; rowIdx++) {
    for (let colIdx = 0; colIdx < colCount; colIdx++) {
      const cell = tableSchema.rows[rowIdx]?.cells?.[colIdx]
      if (cell && cell.expand === 'col') {
        groupRowIdx = rowIdx
        break
      }
    }
    if (groupRowIdx !== -1) break
  }

  // 1. 计算主分组列的所有合并区间
  const groupRanges: Array<{ start: number; end: number }> = []
  if (groupColIdx !== -1) {
    let groupStart = 0
    while (groupStart < data.length) {
      const groupValue = data[groupStart][groupColIdx]
      let groupEnd = groupStart
      for (let r = groupStart + 1; r < data.length; r++) {
        if (data[r][groupColIdx] === groupValue) {
          groupEnd = r
        } else {
          break
        }
      }
      if (groupEnd > groupStart) {
        merges.push({
          row: groupStart,
          col: groupColIdx,
          rowspan: groupEnd - groupStart + 1,
          colspan: 1,
        })
        for (let r = groupStart; r <= groupEnd; r++) mergedMap[r][groupColIdx] = true
      }
      groupRanges.push({ start: groupStart, end: groupEnd })
      groupStart = groupEnd + 1
    }
  }

  // 2. 其他列合并时，是否受主分组区间限制由 schema 决定
  const allowRowMergeBeyondParent = !!tableSchema.allowRowMergeBeyondParent
  const allowColumnMergeBeyondParent = !!tableSchema.allowColumnMergeBeyondParent

  for (let rowIdx = 0; rowIdx < data.length; rowIdx++) {
    const rowDef = tableSchema.rows[rowIdx] || {}
    if (rowDef.type !== 'loop') continue
    // 找到当前行所在的主分组区间
    let group = { start: rowIdx, end: rowIdx }
    if (groupColIdx !== -1) {
      group = groupRanges.find((g) => rowIdx >= g.start && rowIdx <= g.end) || {
        start: rowIdx,
        end: rowIdx,
      }
    }
    for (let colIdx = 0; colIdx < colCount; colIdx++) {
      if (colIdx === groupColIdx) continue // 主分组列已处理
      if (mergedMap[rowIdx][colIdx]) continue
      const cell = rowDef.cells?.[colIdx] || {}
      const cellValue = data[rowIdx][colIdx]
      // 纵向合并
      if (cell.expand === 'row') {
        let maxRow = rowIdx
        for (let r = rowIdx + 1; r < data.length; r++) {
          if (!allowRowMergeBeyondParent && groupColIdx !== -1 && r > group.end) break
          const nextRowDef = tableSchema.rows[r] || {}
          if (nextRowDef.type !== 'loop') break
          const nextCell = nextRowDef.cells?.[colIdx] || {}
          if (nextCell.expand === 'row' && !mergedMap[r][colIdx] && data[r][colIdx] === cellValue) {
            maxRow = r
          } else {
            break
          }
        }
        const rowspan = maxRow - rowIdx + 1
        if (rowspan > 1) {
          merges.push({ row: rowIdx, col: colIdx, rowspan, colspan: 1 })
          for (let r = rowIdx; r <= maxRow; r++) mergedMap[r][colIdx] = true
        }
      }
      // 横向合并
      if (cell.expand === 'col') {
        let maxCol = colIdx
        for (let c = colIdx + 1; c < colCount; c++) {
          if (!allowColumnMergeBeyondParent && groupRowIdx !== -1 && c > groupRowIdx) break
          if (mergedMap[rowIdx][c]) break
          const nextCell = rowDef.cells?.[c] || {}
          if (nextCell.expand === 'col' && data[rowIdx][c] === cellValue) {
            maxCol = c
          } else {
            break
          }
        }
        const colspan = maxCol - colIdx + 1
        if (colspan > 1) {
          merges.push({ row: rowIdx, col: colIdx, rowspan: 1, colspan })
          for (let c = colIdx; c <= maxCol; c++) mergedMap[rowIdx][c] = true
        }
      }
    }
  }
  return { merges, data }
}

export const parseVariable = (
  cellExpression: string,
  record: Record<string, any>,
  dsMap: Record<string, DataSourceField>
) => {
  if (!cellExpression) return ''

  // 使用正则表达式提取变量 =concat("${foo.bar}", "${foo.woo}")，需要可以替换多个
  const variableMatch = cellExpression.matchAll(/\$\{([^}]+)\}/g)
  let result = cellExpression

  for (const match of variableMatch) {
    if (match[1]) {
      const variable = match[1].trim()
      const value = get(record, variable, '')

      // enum 字典
      if (dsMap[variable]?.type === 'enum') {
        const dictItem = dsMap[variable].dataDict?.find(
          (item: DataDictItem) => item.value === value
        )
        if (dictItem) {
          result = result.replace(match[0], dictItem.label)
          continue
        }
      }

      result = result.replace(match[0], value)
    }
  }

  return result
}

export const toExcelTableData = async (
  raw: DatasourceData,
  tableSchema: TableDesign['schema'],
  datasource: DataSourceType
) => {
  const { items } = raw

  const result: any[][] = []

  const dsMap: Record<string, DataSourceField> = datasource.schema?.fields?.reduce((acc, field) => {
    acc[field.id] = field
    return acc
  })

  // 获取所有涉及的字典
  const dictIds: string[] = [
    ...new Set(
      datasource.schema?.fields
        ?.filter((field) => {
          return field.type === 'enum' && field.dictId
        })
        .map((item) => item.dictId) || []
    ),
  ] as string[]

  if (dictIds.length) {
    const dictList: DataDict[] = (await getDictionaryByIdIn(dictIds)) || []
    const dictMap: Record<string, DictionaryItem[]> = dictList.reduce(
      (acc, dict) => {
        acc[dict.id] = dict.items ?? []
        return acc
      },
      {} as Record<string, DictionaryItem[]>
    )

    Object.keys(dsMap).forEach((key) => {
      const field = dsMap[key]
      if (field.type === 'enum' && field.dictId) {
        field.dataDict = dictMap[field.dictId.toString()] || []
      }
    })
  }

  tableSchema.rows.forEach((row) => {
    if (row.type === 'loop') {
      items.forEach((record) => {
        const rowData: any[] = []
        row.cells.forEach((cell) => {
          const cellValue = parseVariable(cell.value, record, dsMap)
          rowData.push(cellValue === undefined ? '' : cellValue)
        })

        result.push(rowData)
      })
    } else {
      const rowData: any[] = []
      row.cells.forEach((cell) => {
        rowData.push(cell.value || '')
      })
      result.push(rowData)
    }
  })

  // test();
  const expandedTableSchema = {
    ...tableSchema,
  }

  const rows: TableDesign['schema']['rows'] = []
  tableSchema.rows.forEach((row) => {
    if (row.type === 'loop') {
      raw.items.forEach((item) => {
        rows.push(row)
      })
    } else {
      rows.push(row)
    }
  })

  expandedTableSchema.rows = rows

  const res = handleDataExpand(expandedTableSchema, result)

  expandedTableSchema.mergeCells = [...(expandedTableSchema.mergeCells || []), ...res.merges]

  return {
    expandedTableSchema,
    expandedData: res.data,
  }
}
