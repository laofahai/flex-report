import React, { useEffect, useState } from 'react'
import { HotTable } from '@handsontable/react'
import { getTableDesignById } from '@/repository/table-design'
import { fetchJsonData } from '@/repository/datasource-data'
import { TableDesign } from '@/types/table-design'
import { toExcelTableData } from '@/lib/excel-table-data'
import { HyperFormula } from 'hyperformula'
import 'handsontable/dist/handsontable.full.min.css'
import Handsontable from 'handsontable'
import { AutoColumnSize, AutoRowSize } from 'handsontable/plugins'
import { ExcelDefaultColumnWidth, ExcelDefaultRowHeight } from '@/lib/defaults'
import { DataSourceType } from '@/types/datasource-schema'
import { getDataSourceById } from '@/repository/datasource'
import { Button } from '@/components/ui/button'

// @ts-ignore
Handsontable.plugins.registerPlugin('AutoColumnSize', AutoColumnSize)
// @ts-ignore
Handsontable.plugins.registerPlugin('AutoRowSize', AutoRowSize)

interface PreviewProps {
  tableDesignId: string
}

export function Preview({ tableDesignId }: PreviewProps) {
  const [tableDesign, setTableDesign] = useState<TableDesign>()
  const [dataSource, setDataSource] = useState<DataSourceType>()
  const [data, setData] = useState<any[]>([])
  const [page, setPage] = useState(1)
  const [pageSize] = useState(20)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [expandedTableSchema, setExpandedTableSchema] = useState<TableDesign['schema']>({
    rows: [],
    columns: [],
    mergeCells: [],
  })

  const hyperformulaInstance = HyperFormula.buildEmpty({
    licenseKey: 'internal-use-in-handsontable',
  })

  useEffect(() => {
    async function fetchDesign() {
      setLoading(true)
      const design = await getTableDesignById(tableDesignId)
      if (!design) {
        setLoading(false)
        return
      }
      setTableDesign(design)

      const ds = design.dataSourceId ? await getDataSourceById(design.dataSourceId) : null
      if (ds != null) {
        setDataSource(ds)
      }

      setLoading(false)
    }
    fetchDesign()
  }, [tableDesignId])

  useEffect(() => {
    async function fetchData() {
      if (!tableDesign?.dataSourceId || !dataSource) return
      setLoading(true)

      const data = await fetchJsonData({
        datasourceId: tableDesign.dataSourceId,
      })

      const { expandedData, expandedTableSchema: schema } = await toExcelTableData(
        data,
        tableDesign.schema,
        dataSource!
      )

      setData(expandedData)
      setExpandedTableSchema(schema)
      setLoading(false)
    }
    fetchData()
  }, [dataSource, page, pageSize])

  if (loading) return <div>加载中...</div>
  if (!tableDesign) return <div>未找到设计</div>

  // 生成表头
  const columns = tableDesign.schema?.columns || []
  const rows = tableDesign.schema?.rows || []
  const colHeaders =
    rows[0]?.cells?.map((cell: any, idx: number) => cell.value || `列${idx + 1}`) || []

  return (
    <div className={'relative'}>
      <div className="mb-2 flex justify-end">
        <Button
          size="sm"
          onClick={async () => {
            if (!tableDesignId) return
            const res = await fetch(`/api/excel-export?tableDesignId=${tableDesignId}`)
            if (!res.ok) {
              alert('导出失败')
              return
            }
            const blob = await res.blob()
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = `${tableDesign?.name || '导出表格'}.xlsx`
            document.body.appendChild(a)
            a.click()
            a.remove()
            window.URL.revokeObjectURL(url)
          }}
        >
          下载Excel
        </Button>
      </div>
      {data?.length && (
        <HotTable
          data={data?.length > 0 ? data : []} // 默认数据传空时给 [[""]]
          colHeaders={true}
          rowHeaders={true}
          height={`calc(100vh - 220px)`} // 根据需要调整高度
          colWidths={ExcelDefaultColumnWidth} // ✅ 建议给默认列宽
          rowHeights={expandedTableSchema?.rows.map((row) => row.height || ExcelDefaultRowHeight)} // 行高支持
          manualRowMove={true}
          manualColumnMove={true}
          manualColumnResize={true}
          manualRowResize={true}
          manualColumnFreeze={true}
          autoWrapRow={true}
          autoWrapCol={true}
          licenseKey="non-commercial-and-evaluation"
          mergeCells={(expandedTableSchema?.mergeCells as any[]) || []}
          cells={function (row, col, prop): any {
            const cellProperties: any = {}
            if (expandedTableSchema?.rows[row]?.cells?.[col].vAlign) {
              const vAlign = expandedTableSchema?.rows[row].cells[col].vAlign
              cellProperties.className =
                (cellProperties.className || '') +
                ` ht${vAlign.charAt(0).toUpperCase() + vAlign.slice(1)}`
            }
            if (expandedTableSchema?.rows[row]?.cells?.[col].hAlign) {
              const hAlign = expandedTableSchema?.rows[row].cells[col].hAlign
              cellProperties.className =
                (cellProperties.className || '') +
                ` ht${hAlign.charAt(0).toUpperCase() + hAlign.slice(1)}`
            }

            cellProperties.width =
              expandedTableSchema?.columns?.[col]?.width || ExcelDefaultColumnWidth // 列宽支持
            return cellProperties
          }}
          formulas={{
            engine: hyperformulaInstance,
            sheetName: 'Sheet1',
          }}
          stretchH="all"
        />
      )}
    </div>
  )
}

export default Preview
