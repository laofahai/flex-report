"use client";

import React, { useEffect, useState } from "react";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { getDataSources } from '@/controller/datasource';
import { getTableDesignById, createTableDesign, updateTableDesign } from '@/controller/tableDesign';
import { useParams, useSearchParams } from 'next/navigation'
import { TableDesignSchema, ExcelDesignerCell, ExcelDesignerRow, TableDesign } from '@/types/table-design'
import { ExcelTable } from './excel-table';
import { toast } from 'sonner'

export function ExcelDesigner() {
  const searchParams = useSearchParams();
  const designId = searchParams.get("id") as string | undefined;

  const [dataSources, setDataSources] = useState<{ id: string; name: string }[]>([]);

  const initialColumnsLength = 8;
  const initialColumnWidth = 120;
  const [tableDesign, setTableDesign] = useState<TableDesign>({
    name: 'ExcelDesigner',
    schema: {
      rows: [
        { type: 'normal', cells: Array.from({length: initialColumnsLength}, () => ({value: ''})) as ExcelDesignerCell[] },
        { type: 'loop', cells: Array.from({length: initialColumnsLength}, () => ({value: ''})) as ExcelDesignerCell[] },
        { type: 'normal', cells: Array.from({length: initialColumnsLength}, () => ({value: ''})) as ExcelDesignerCell[] },
      ],
      columns: Array.from({ length: initialColumnsLength }, (_, idx) => ({ width: initialColumnWidth })),
    }
  });
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      // 获取数据源
      const ds = await getDataSources();
      setDataSources(ds.map((d: any) => ({ id: d.id, name: d.name })));
      // 如果有 designId，获取设计表
      if (designId) {
        const design = await getTableDesignById(designId);
        if (design) {
          setTableDesign(design);
        }
      }
      setLoading(false);
    }
    fetchData();
  }, [designId]);

  // 列名 A B C D ...
  function getColName(idx: number) {
    let name = '';
    do {
      name = String.fromCharCode(65 + (idx % 26)) + name;
      idx = Math.floor(idx / 26) - 1;
    } while (idx >= 0);
    return name;
  }

  function handleRowTypeChange(rowIdx: number, type: ExcelDesignerRow["type"]) {
    tableDesign.schema.rows[rowIdx].type = type;
  }

  // 保存逻辑
  async function handleSave() {
    // 构造 schema
    const schema = { rows: tableDesign.schema.rows.map((row) => ({
      type: row.type || 'normal',
      cells: row.cells || [],
    })) };
    try {
      if (!tableDesign.dataSourceId) {
        toast.error("请选择数据源");
        return;
      }
      if (designId) {
        await updateTableDesign(tableDesign);
      } else {
        await createTableDesign(tableDesign);
      }
      toast.success("设计已保存");
    } catch (e: any) {
      toast.error("保存失败: " + (e?.message || e));
    }
  }

  if (loading) return <div>加载中...</div>;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4 w-full">
        <h1 className="text-2xl font-bold flex-shrink-0 flex-1/2">
          <Input
            className="inline-block text-2xl font-bold border-none bg-transparent w-auto focus:ring-0 focus-visible:ring-0 focus:border-none focus:outline-none"
            value={tableDesign.name}
            onChange={e => setTableDesign(prev => ({
              ...prev,
              name: e.target.value
            }))}
            minLength={2}
            maxLength={64}
            placeholder="请输入表格名称"
          />
        </h1>
        <div className="flex items-center gap-2">
          <Select
            value={tableDesign.dataSourceId}
            onValueChange={e => setTableDesign(prev => ({
              ...prev,
              dataSourceId: e === '__none__' ? undefined : e
            }))}
            disabled={dataSources.length === 0}
          >
            <SelectTrigger className="h-8 text-xs min-w-32">
              <SelectValue placeholder={dataSources.length === 0 ? '无可用数据源' : '请选择数据源'} />
            </SelectTrigger>
            <SelectContent>
              {dataSources.length === 0 ? (
                <SelectItem value="__none__" disabled>无可用数据源</SelectItem>
              ) : (
                dataSources.map(ds => (
                  <SelectItem key={ds.id} value={ds.id}>{ds.name}</SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
          <Button className="ml-2" onClick={handleSave}>保存设计</Button>
        </div>
      </div>
      <div className="w-full gap-4">
        <div className="flex-1 min-w-0 w-full">
          <ExcelTable
            tableDesign={tableDesign}
            onDataChange={(newData: ExcelDesignerRow[]) => {
              setTableDesign(prev => ({
                ...prev,
                schema: {
                  ...prev.schema,
                  rows: newData,
                  columns: prev.schema.columns?.length ? prev.schema.columns : Array.from({ length: newData[0].cells.length }, (_, idx) => ({ width: initialColumnWidth }))
                }
              }));
            }}
            onRowTypeChange={(rowIdx, type) => {
              handleRowTypeChange(rowIdx, type);
              setTableDesign(prev => {
                const newRows = [...prev.schema.rows];
                newRows[rowIdx] = { ...newRows[rowIdx], type };
                return {
                  ...prev,
                  schema: {
                    ...prev.schema,
                    rows: newRows
                  }
                };
              });
            }}
            onRowHeightChange={(rowIdx, height) => {
              setTableDesign(prev => {
                const newRows = [...prev.schema.rows];
                newRows[rowIdx] = { ...newRows[rowIdx], height };
                return {
                  ...prev,
                  schema: {
                    ...prev.schema,
                    rows: newRows
                  }
                };
              });
            }}
            onColumnWidthChange={(colIdx, width) => {
              setTableDesign(prev => {
                if (!prev.schema.columns?.length) {
                  prev.schema.columns = Array.from({ length: prev.schema.rows[0].cells.length }, () => ({ width: initialColumnWidth }));
                }
                const newColumns = [...prev.schema.columns];
                newColumns[colIdx] = { ...newColumns[colIdx], width };
                return {
                  ...prev,
                  schema: {
                    ...prev.schema,
                    columns: newColumns
                  }
                };
              });
            }}
            onBeforeAlignChange={(range, align, type) => {
              range.forEach((rowIdx, idx) => {
                setTableDesign(prev => {
                  const newRows = [...prev.schema.rows];
                  if (type === 'horizontal') {
                    // between from - to
                    for (let row = rowIdx.from.row; row <= rowIdx.to.row; row++) {
                      row = row < 0 ? 0 : row; // 确保行索引不小于0
                      for (let col = rowIdx.from.col; col <= rowIdx.to.col; col++) {
                        col = col < 0 ? 0 : col;
                        newRows[row].cells[col].hAlign = align as any;
                      }
                    }
                  } else if (type === 'vertical') {
                    for (let row = rowIdx.from.row; row <= rowIdx.to.row; row++) {
                      row = row < 0 ? 0 : row; // 确保行索引不小于0
                      for (let col = rowIdx.from.col; col <= rowIdx.to.col; col++) {
                        col = col < 0 ? 0 : col;
                        newRows[row].cells[col].vAlign = align as any;
                      }
                    }
                  }
                  return {
                    ...prev,
                    schema: {
                      ...prev.schema,
                      rows: newRows
                    }
                  };
                });
              })
            }}
          />
        </div>
      </div>
    </div>
  );
}

