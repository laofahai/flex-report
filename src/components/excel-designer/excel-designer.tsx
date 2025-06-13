"use client";

import React, { useEffect, useState } from "react";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { getDataSources } from '@/controller/datasource';
import { getTableDesignById, createTableDesign, updateTableDesign } from '@/controller/tableDesign';
import { useParams, useSearchParams } from 'next/navigation'
import { TableDesignSchema, ExcelDesignerCell, ExcelDesignerRow } from '@/types/table-design';
import { ExcelTable } from './excel-table';
import { toast } from 'sonner'

export function ExcelDesigner() {
  const searchParams = useSearchParams();
  const designId = searchParams.get("id") as string | undefined;

  const [dataSources, setDataSources] = useState<{ id: string; name: string }[]>([]);
  const [selectedDataSourceId, setSelectedDataSourceId] = useState<string | undefined>(undefined);
  const [tableName, setTableName] = useState<string>('表格设计器');
  const [excelData, setExcelData] = useState<ExcelDesignerRow[]>([]);
  const [loading, setLoading] = useState(true);

  const setEmptyData = () => {
    setExcelData([
      { type: 'normal', cells: Array.from({length: 8}, () => ({value: ''})) as ExcelDesignerCell[] },
      { type: 'loop', cells: Array.from({length: 8}, () => ({value: ''})) as ExcelDesignerCell[] },
      { type: 'normal', cells: Array.from({length: 8}, () => ({value: ''})) as ExcelDesignerCell[] },
    ])
  }

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
          setTableName(design.name);
          setSelectedDataSourceId(design.dataSourceId);
          try {
            const parsed = TableDesignSchema.parse(design.schema);
            if (parsed.rows?.length) {
              setExcelData(parsed.rows.map((row: any) => row.cells));
            } else {
              setEmptyData();
            }
          } catch (e) {
            console.error("设计表解析失败:", e);
            // 如果解析失败，使用默认数据
            setEmptyData();
          }
        }
      } else {
        setEmptyData();
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
    excelData[rowIdx].type = type;
  }

  // 保存逻辑
  async function handleSave() {
    // 构造 schema
    const schema = { rows: excelData.map((row) => ({
      type: row.type || 'normal',
      cells: row.cells || [],
    })) };
    try {
      if (designId) {
        await updateTableDesign({ id: designId, name: tableName, dataSourceId: selectedDataSourceId, schema });
      } else {
        if (!selectedDataSourceId) {
          toast.error("请选择数据源");
          return;
        }
        await createTableDesign({ name: tableName, dataSourceId: selectedDataSourceId, schema });
      }
      toast.success("设计已保存");
    } catch (e: any) {
      toast.error("保存失败: " + (e?.message || e));
    }
  }

  if (loading) return <div>加载中...</div>;

  return (
    <div className="w-full">
      {/* 标题栏和操作栏 */}
      <div className="flex items-center justify-between mb-4 w-full">
        <h1 className="text-2xl font-bold flex-shrink-0 flex-1/2">
          <Input
            className="inline-block text-2xl font-bold border-none bg-transparent w-auto focus:ring-0 focus-visible:ring-0 focus:border-none focus:outline-none"
            value={tableName}
            onChange={e => setTableName(e.target.value)}
            style={{ width: `${Math.max(tableName.length, 16)}ch` }}
            minLength={2}
            maxLength={64}
            placeholder="请输入表格名称"
          />
        </h1>
        <div className="flex items-center gap-2">
          <Select
            value={dataSources.length === 0 ? undefined : (selectedDataSourceId ?? '')}
            onValueChange={setSelectedDataSourceId}
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
      {/* 主体内容，两列布局 */}
      <div className="w-full gap-4">
        {/* 中间栏：ExcelTable */}
        <div className="flex-1 min-w-0 w-full">
          <ExcelTable
            data={excelData || []}
            onDataChange={setExcelData}
            onRowTypeChange={handleRowTypeChange}
          />
        </div>
      </div>
    </div>
  );
}

