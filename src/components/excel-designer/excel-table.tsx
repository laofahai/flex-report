import React, { useRef } from 'react'
import { HotTable, HotTableClass } from '@handsontable/react'
import 'handsontable/dist/handsontable.full.min.css'
import Handsontable, { CellRange } from 'handsontable'
import {
  AutoColumnSize,
  ManualColumnResize,
  ManualRowResize,
  ContextMenu,
} from 'handsontable/plugins'
import { ExcelDesignerRow, TableDesign } from '@/types/table-design'
import { TableToolbar } from '@/components/excel-designer/excel-toolbar'
import { CellConfigPanel } from './cell-config-panel'
import { HyperFormula } from 'hyperformula'
import { toast } from 'sonner'
import { ExcelDefaultColumnWidth, ExcelDefaultRowHeight } from '@/lib/defaults'
import { cloneDeep } from 'lodash-es'

// @ts-ignore
Handsontable.plugins.registerPlugin('ManualColumnResize', ManualColumnResize)
// @ts-ignore
Handsontable.plugins.registerPlugin('ManualRowResize', ManualRowResize)
// @ts-ignore
Handsontable.plugins.registerPlugin('AutoColumnSize', AutoColumnSize)
// @ts-ignore
Handsontable.plugins.registerPlugin('ContextMenu', ContextMenu)

export interface ExcelTableProps {
  tableDesign: TableDesign
  onDataChange: (data: ExcelDesignerRow[]) => void
  onRowTypeChange: (rowIdx: number, type: ExcelDesignerRow['type']) => void
  onRowHeightChange: (rowIdx: number, height: number) => void
  onColumnWidthChange?: (colIdx: number, width: number) => void
  onBeforeAlignChange?: (range: CellRange[], align: string, type: 'horizontal' | 'vertical') => void
  onUpdateMergeCells?: (mergeCells: any[]) => void
}

export const ExcelTable: React.FC<ExcelTableProps> = ({
  tableDesign,
  onDataChange,
  onRowTypeChange,
  onRowHeightChange,
  onColumnWidthChange,
  onBeforeAlignChange,
  onUpdateMergeCells,
}) => {
  const hotRef = useRef<HotTableClass>(null)
  const [selectionRange, setSelectionRange] = React.useState<Handsontable.CellRange[] | null>(null)
  const [excelData, setExcelData] = React.useState<any[][]>([])

  // excelData 只由 tableDesign.schema.rows 驱动
  React.useEffect(() => {
    setExcelData(tableDesign.schema.rows.map((row) => row.cells?.map((cell) => cell.value || '')))
  }, [tableDesign.schema.rows])

  const [cellConfigPanel, setCellConfigPanel] = React.useState<{
    row: number
    col: number
    visible: boolean
    anchorPosition?: { x: number; y: number }
  }>({ row: -1, col: -1, visible: false })

  // handleSetExcelData 只负责格式化并通知父组件，不再 setExcelData
  const handleSetExcelData = (newData: any[][]) => {
    const formattedData: ExcelDesignerRow[] = newData.map((row, rowIndex) => {
      return {
        type: tableDesign.schema.rows[rowIndex]?.type || 'normal',
        cells: row.map((value, colIndex) => ({
          ...tableDesign.schema.rows[rowIndex]?.cells?.[colIndex],
          value,
        })),
      }
    })
    onDataChange(formattedData)
  }

  const closeCellConfigPanel = () => {
    setCellConfigPanel({ row: -1, col: -1, visible: false })
  }

  // 渲染 cell 配置 panel，使用独立组件
  const renderCellConfigPanel = () => {
    if (!cellConfigPanel.visible) return null
    // 获取当前 cell 的配置
    const cell = tableDesign.schema.rows[cellConfigPanel.row]?.cells?.[cellConfigPanel.col] || {
      value: '',
    }
    return (
      <CellConfigPanel
        tableDesign={tableDesign}
        open={cellConfigPanel.visible}
        anchorPosition={cellConfigPanel.anchorPosition}
        row={cellConfigPanel.row}
        col={cellConfigPanel.col}
        cell={cell}
        currentRow={tableDesign.schema.rows[cellConfigPanel.row]}
        datasourceId={undefined} // 可根据需要传递
        onClose={closeCellConfigPanel}
        onChange={(updatedCell) => {
          const newData = cloneDeep(tableDesign.schema.rows)
          // 更新 cell 配置
          newData[cellConfigPanel.row].cells[cellConfigPanel.col] = {
            ...newData[cellConfigPanel.row].cells[cellConfigPanel.col],
            ...updatedCell,
          }

          onDataChange(newData)
          // 同步 excelData 内容
          setExcelData(newData.map((row) => row.cells.map((cell) => cell.value || '')))

          // 这里如果是公式 需要触发 formulas 更新 // @todo this will trigger data updated twice
          // const hot = hotRef.current?.hotInstance;
          // if (hot) {
          //   const cellCoords = hot.getCell(cellConfigPanel.row, cellConfigPanel.col);
          //   if (cellCoords) {
          //     hot.setDataAtCell(cellConfigPanel.row, cellConfigPanel.col, updatedCell.value || '');
          //   }
          // }
        }}
      />
    )
  }

  const hyperformulaInstance = HyperFormula.buildEmpty({
    licenseKey: 'internal-use-in-handsontable',
  })

  return (
    <div className="relative overflow-x-auto w-full" style={{ position: 'relative' }}>
      <div className={'py-2'}>
        <TableToolbar
          hotRef={hotRef}
          selectionRange={selectionRange}
          onSetSelectionRange={setSelectionRange}
          tableDesignId={tableDesign.id!}
        />
      </div>
      <HotTable
        ref={hotRef}
        data={excelData?.length > 0 ? excelData : []} // 默认数据传空时给 [[""]]
        colHeaders={true}
        rowHeaders={true}
        height={`calc(100vh - 220px)`} // 根据需要调整高度
        colWidths={ExcelDefaultColumnWidth} // ✅ 建议给默认列宽
        rowHeights={tableDesign.schema.rows.map((row) => row.height || ExcelDefaultRowHeight)} // 行高支持
        manualRowMove={true}
        manualColumnMove={true}
        manualColumnResize={true}
        manualRowResize={true}
        manualColumnFreeze={true}
        autoWrapRow={true}
        autoWrapCol={true}
        licenseKey="non-commercial-and-evaluation"
        mergeCells={(tableDesign.schema.mergeCells as any[]) || []}
        formulas={{
          engine: hyperformulaInstance,
          sheetName: 'Sheet1',
        }}
        contextMenu={{
          items: {
            ...ContextMenu.DEFAULT_ITEMS,
            sep0: ContextMenu.SEPARATOR,
            mergeCells: {
              key: 'mergeCells',
              name: '合并单元格',
              callback: () => {
                const hot = hotRef.current?.hotInstance
                if (!hot || !onUpdateMergeCells) return
                const selected = hot.getSelectedRange()
                if (!selected) return
                for (let i = 0; i < selected.length; i++) {
                  for (let row = selected[i].from.row; row <= selected[i].to.row; row++) {
                    if (tableDesign.schema.rows[row]?.type === 'loop') {
                      toast.error('循环行不允许合并单元格')
                      return // 循环行不允许合并
                    }
                  }
                }
                onUpdateMergeCells([
                  ...(tableDesign.schema.mergeCells || []),
                  ...(selected || []).map((item) => {
                    return {
                      row: item.from.row,
                      col: item.from.col,
                      rowspan: item.to.row - item.from.row + 1,
                      colspan: item.to.col - item.from.col + 1,
                    }
                  }),
                ])
              },
            },
            unmergeCells: {
              key: 'unmergeCells',
              name: '拆分单元格',
              callback: () => {
                const hot = hotRef.current?.hotInstance
                if (!hot || !onUpdateMergeCells) return
                const selected = hot.getSelectedRange()
                if (selected && selected.length > 0) {
                  const mergeCells = tableDesign.schema.mergeCells || []
                  const newMergeCells = mergeCells.filter((item) => {
                    return !(
                      item.row >= selected[0].from.row &&
                      item.col >= selected[0].from.col &&
                      item.row + (item.rowspan || 1) - 1 <= selected[0].to.row &&
                      item.col + (item.colspan || 1) - 1 <= selected[0].to.col
                    )
                  })
                  onUpdateMergeCells(newMergeCells)
                }
              },
            },
            sep1: ContextMenu.SEPARATOR,
            switchToLoopRow: {
              key: 'switchToLoopRow',
              disabled: function () {
                const sel = this.getSelected?.()
                if (!sel || sel.length === 0) return true
                const row = sel[0][0] // [row, col, row2, col2]
                return tableDesign.schema.rows[row]?.type === 'loop'
              },
              name: '切换为循环行',
              callback: (key, selection) => {
                if (selection && selection.length > 0) {
                  const rowIndex = selection[0].start.row
                  onRowTypeChange(rowIndex, 'loop')
                }
              },
            },
            switchToNormalRow: {
              key: 'switchToNormalRow',
              disabled: function () {
                const sel = this.getSelected?.()
                if (!sel || sel.length === 0) return true
                const row = sel[0][0] // [row, col, row2, col2]
                return tableDesign.schema.rows[row]?.type === 'normal'
              },
              name: '切换为普通行',
              callback: (key, selection) => {
                if (selection && selection.length > 0) {
                  const rowIndex = selection[0].start.row
                  onRowTypeChange(rowIndex, 'normal')
                }
              },
            },
          },
        }}
        cells={function (row, col, prop): any {
          const cellProperties: any = {}
          const rowData = tableDesign.schema.rows[row]
          const cell = rowData?.cells?.[col]
          if (rowData?.type === 'loop') {
            cellProperties.className = (cellProperties.className || '') + ' !bg-yellow-50'
          }
          if (cell?.vAlign) {
            const vAlign = cell.vAlign
            cellProperties.className =
              (cellProperties.className || '') +
              ` ht${vAlign.charAt(0).toUpperCase() + vAlign.slice(1)}`
          }
          if (cell?.hAlign) {
            const hAlign = cell.hAlign
            cellProperties.className =
              (cellProperties.className || '') +
              ` ht${hAlign.charAt(0).toUpperCase() + hAlign.slice(1)}`
          }

          cellProperties.width = tableDesign.schema.columns?.[col]?.width || ExcelDefaultColumnWidth // 列宽支持
          return cellProperties
        }}
        afterSelectionEnd={(row: number, column: number, row2: number, column2: number) => {
          const hot = hotRef.current?.hotInstance
          const selectedRanges = hot?.getSelectedRange() // 支持多块区域
          setSelectionRange(selectedRanges || [])
          if (
            selectedRanges &&
            selectedRanges.length === 1 &&
            selectedRanges[0].from.row === selectedRanges[0].to.row &&
            selectedRanges[0].from.col === selectedRanges[0].to.col
          ) {
            const cellCoords = hot?.getCell(selectedRanges[0].from.row, selectedRanges[0].from.col)
            let anchorPosition = undefined
            if (cellCoords) {
              const rect = cellCoords.getBoundingClientRect()
              anchorPosition = { x: rect.right + 4, y: rect.bottom + 4 }
            }
            setCellConfigPanel({
              row: selectedRanges[0].from.row,
              col: selectedRanges[0].from.col,
              visible: true,
              anchorPosition,
            })
          } else {
            setCellConfigPanel({ row: -1, col: -1, visible: false })
          }
        }}
        afterChange={(changes, source) => {
          if (source === 'edit' && changes) {
            const newData = [...excelData]
            changes.forEach(([row, col, oldVal, newVal]) => {
              if (newData[row]) {
                newData[row][col as number] = newVal || ''
              }
            })

            handleSetExcelData(newData)
          }
        }}
        afterRowResize={(newSize, row, isDoubleClick) => {
          if (typeof onRowHeightChange === 'function') {
            onRowHeightChange(row, newSize)
          }
        }}
        afterColumnResize={(newSize, col, isDoubleClick) => {
          if (typeof onColumnWidthChange === 'function') {
            onColumnWidthChange(col, newSize)
          }
        }}
        beforeCellAlignment={(changes, range: CellRange[], type, cls) => {
          const align = cls.replace('ht', '').toLowerCase()
          if (onBeforeAlignChange && type) {
            onBeforeAlignChange(range, align, type)
          }
        }}
      />
      {renderCellConfigPanel()}
    </div>
  )
}
