import React, { useEffect, useState } from 'react';
import Handsontable from 'handsontable';
import { HotTable } from '@handsontable/react';
import { getTableDesignById } from '@/repository/table-design';
import { fetchJsonData } from '@/repository/datasource-data'
import { TableDesign } from '@/types/table-design'
import { toExcelTableData } from '@/lib/excel-table-data'
// 你需要实现 getDataSourceRows 以支持分页获取数据
// import { getDataSourceRows } from '@/repository/datasource';

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

  useEffect(() => {
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
    async function fetchData() {
      if (!tableDesign?.dataSourceId) return;
      setLoading(true);

      const data = await fetchJsonData({
        datasourceId: tableDesign.dataSourceId
      })

      const pureData = toExcelTableData(data, tableDesign.schema);
      console.log(pureData)
      // TODO: 你需要实现 getDataSourceRows 支持分页
      // const { rows, total } = await getDataSourceRows(tableDesign.dataSourceId, page, pageSize);
      // setData(rows);
      // setTotal(total);
      setLoading(false);
    }
    fetchData();
  }, [tableDesign, page, pageSize]);

  if (loading) return <div>加载中...</div>;
  if (!tableDesign) return <div>未找到设计</div>;

  // 生成表头
  const columns = tableDesign.schema?.columns || [];
  const rows = tableDesign.schema?.rows || [];
  const colHeaders = rows[0]?.cells?.map((cell: any, idx: number) => cell.value || `列${idx+1}`) || [];

  return (
    <div>
      <HotTable
        data={data}
        colHeaders={colHeaders}
        rowHeaders={true}
        width="100%"
        height="auto"
        licenseKey="non-commercial-and-evaluation"
        // 你可以根据 tableDesign.schema.columns 设置列宽
        columns={columns.map((col: any) => ({ width: col.width || 120 }))}
        readOnly
        stretchH="all"
      />
      {/* 分页控件 */}
      <div style={{ marginTop: 16 }}>
        <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>上一页</button>
        <span style={{ margin: '0 8px' }}>第 {page} 页</span>
        <button disabled={data.length < pageSize} onClick={() => setPage(p => p + 1)}>下一页</button>
      </div>
    </div>
  );
}

export default Preview;

