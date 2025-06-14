import React, { useEffect, useState } from 'react';
import { HotTable } from '@handsontable/react';
import { getTableDesignById } from '@/repository/table-design';
import { fetchJsonData } from '@/repository/datasource-data'
import { TableDesign } from '@/types/table-design'
import { toExcelTableData } from '@/lib/excel-table-data'
import { HyperFormula } from 'hyperformula'
import 'handsontable/dist/handsontable.full.min.css';
import Handsontable from 'handsontable'
import { AutoColumnSize, AutoRowSize, ContextMenu, ManualColumnResize, ManualRowResize } from 'handsontable/plugins'

// @ts-ignore
Handsontable.plugins.registerPlugin('AutoColumnSize', AutoColumnSize)
// @ts-ignore
Handsontable.plugins.registerPlugin('AutoRowSize', AutoRowSize)

interface PreviewProps {
  tableDesignId: string;
}

export function Preview({ tableDesignId }: PreviewProps) {
  const [tableDesign, setTableDesign] = useState<TableDesign>();
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const hyperformulaInstance = HyperFormula.buildEmpty({
    licenseKey: 'internal-use-in-handsontable',
  });

  useEffect(() => {
    console.log(1)
    async function fetchDesign() {
      setLoading(true);
      const design = await getTableDesignById(tableDesignId);
      if (!design) {
        setLoading(false);
        return;
      }
      setTableDesign(design);
      setLoading(false);
    }
    fetchDesign();
  }, [tableDesignId]);

  useEffect(() => {
    console.log(222)
    async function fetchData() {
      if (!tableDesign?.dataSourceId) return;
      setLoading(true);

      const data = await fetchJsonData({
        datasourceId: tableDesign.dataSourceId
      })

      const pureData = toExcelTableData(data, tableDesign.schema);

      setTableDesign({
        ...tableDesign,
        schema: {
          ...tableDesign.schema,
          mergeCells: [
            ...(tableDesign.schema.mergeCells || []),
            ...pureData.merges
          ]
        }
      })

      setData(pureData.data)

      setLoading(false);

      console.log(tableDesign, 2)
    }
    fetchData();
  }, [tableDesign?.dataSourceId, page, pageSize]);

  if (loading) return <div>加载中...</div>;
  if (!tableDesign) return <div>未找到设计</div>;

  // 生成表头
  const columns = tableDesign.schema?.columns || [];
  const rows = tableDesign.schema?.rows || [];
  const colHeaders = rows[0]?.cells?.map((cell: any, idx: number) => cell.value || `列${idx+1}`) || [];

  return (
    <div className={"relative"}>
      {JSON.stringify(tableDesign.schema.mergeCells)}
      <HotTable
        data={data?.length > 0 ? data : []} // 默认数据传空时给 [[""]]
        colHeaders={true}
        rowHeaders={true}
        height={`calc(100vh - 200px)`} // 根据需要调整高度
        colWidths={120} // ✅ 建议给默认列宽
        rowHeights={tableDesign.schema.rows.map(row => row.height || 30)} // 行高支持
        manualRowMove={true}
        manualColumnMove={true}
        manualColumnResize={true}
        manualRowResize={true}
        manualColumnFreeze={true}
        autoWrapRow={true}
        autoWrapCol={true}
        licenseKey="non-commercial-and-evaluation"
        mergeCells={tableDesign.schema.mergeCells as any[] || []}
        formulas={
          {
            engine: hyperformulaInstance,
            sheetName: 'Sheet1',
          }
        }
        stretchH="all"
      />
    </div>
  );
}

export default Preview;


