import React, { useRef } from 'react';
import { HotTable } from '@handsontable/react';
import 'handsontable/dist/handsontable.full.min.css';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react'
import Handsontable from 'handsontable'
import { AutoColumnSize, ManualColumnResize, ManualRowResize, ContextMenu } from 'handsontable/plugins'
import { ExcelDesignerCell, ExcelDesignerRow } from '@/types/table-design'
import { TableToolbar } from '@/components/excel-designer/excel-toolbar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { CellConfigPanel } from './cell-config-panel';

// @ts-ignore
Handsontable.plugins.registerPlugin('ManualColumnResize', ManualColumnResize)
// @ts-ignore
Handsontable.plugins.registerPlugin('ManualRowResize', ManualRowResize)
// @ts-ignore
Handsontable.plugins.registerPlugin('AutoColumnSize', AutoColumnSize)
// @ts-ignore
Handsontable.plugins.registerPlugin('ContextMenu', ContextMenu)


export interface ExcelTableProps {
  data: ExcelDesignerRow[];
  onDataChange: (data: ExcelDesignerRow[]) => void;
  rowTypes: { type: any; formula?: string }[];
  onRowTypeChange: (rowIdx: number, type: ExcelDesignerRow["type"], formula?: string) => void;
}

export const ExcelTable: React.FC<ExcelTableProps> = ({
  data,
  onDataChange,
}) => {
  const hotRef = useRef<any>(null);
  const [selectionRange, setSelectionRange] = React.useState<Handsontable.CellRange[] | null>(null);
  const [excelData, setExcelData] = React.useState<any[][]>(data.map(row => row.cells.map(cell => {
    return cell.value || '';
  })));
  const [cellConfigPanel, setCellConfigPanel] = React.useState<{
    row: number;
    col: number;
    visible: boolean;
    anchorPosition?: { x: number; y: number };
  }>({ row: -1, col: -1, visible: false });

  // 新增：Popover锚点ref
  const popoverAnchorRef = React.useRef<HTMLDivElement>(null);

  const handleSetExcelData = (newData: any[][]) => {
    setExcelData(newData);
    const formattedData: ExcelDesignerRow[] = newData.map((row, rowIndex) => {
      return {
        type: data[rowIndex]?.type || 'normal', // 默认类型为 'normal'
        cells: row.map((value, colIndex) => ({
          value,
        })),
      };
    });
    onDataChange(formattedData);
  };

  const closeCellConfigPanel = () => {
    setCellConfigPanel({ row: -1, col: -1, visible: false });
  };

  // 渲染 cell 配置 panel，使用独立组件
  const renderCellConfigPanel = () => {
    if (!cellConfigPanel.visible) return null;
    // 获取当前 cell 的配置
    const cell = data[cellConfigPanel.row]?.cells?.[cellConfigPanel.col] || { value: '' };
    return (
      <CellConfigPanel
        open={cellConfigPanel.visible}
        anchorPosition={cellConfigPanel.anchorPosition}
        row={cellConfigPanel.row}
        col={cellConfigPanel.col}
        cell={cell}
        currentRow={data[cellConfigPanel.row]}
        datasourceId={undefined} // 可根据需要传递
        getDatasourceIdByRow={row => row?.datasourceId}
        onClose={closeCellConfigPanel}
        onChange={updatedCell => {
          // 更新 cell 配置
          const newData = data.map((row, rowIdx) => {
            if (rowIdx !== cellConfigPanel.row) return row;
            return {
              ...row,
              cells: row.cells.map((c, colIdx) =>
                colIdx === cellConfigPanel.col ? { ...c, ...updatedCell } : c
              ),
            };
          });
          onDataChange(newData);
          // 同步 excelData 内容
          setExcelData(newData.map(row => row.cells.map(cell => cell.value || '')));
        }}
      />
    );
  };

  return (
   <div className="relative overflow-x-auto w-full" style={{ position: 'relative' }}>
     {JSON.stringify(data)}
     <div className={"py-2"}>
       <TableToolbar hotRef={hotRef} selectionRange={selectionRange} onSetSelectionRange={setSelectionRange} />
     </div>
     <HotTable
       ref={hotRef}
       data={excelData?.length > 0 ? excelData : []} // 默认数据传空时给 [[""]]
       colHeaders={true}
       rowHeaders={true}
       height={`calc(100vh - 200px)`} // 根据需要调整高度
       colWidths={120} // ✅ 建议给默认列宽
       manualRowMove={true}
       manualColumnResize={true}
       autoWrapRow={true}
       autoWrapCol={true}
       contextMenu={true}
       licenseKey="non-commercial-and-evaluation"
       afterSelectionEnd={(row: number, column: number, row2: number, column2: number) => {
          const hot = hotRef.current.hotInstance;
          const selectedRanges = hot.getSelectedRange(); // 支持多块区域
          setSelectionRange(selectedRanges);
          if (
            selectedRanges &&
            selectedRanges.length === 1 &&
            selectedRanges[0].from.row === selectedRanges[0].to.row &&
            selectedRanges[0].from.col === selectedRanges[0].to.col
          ) {
            const cellCoords = hot.getCell(selectedRanges[0].from.row, selectedRanges[0].from.col);
            let anchorPosition = undefined;
            if (cellCoords) {
              const rect = cellCoords.getBoundingClientRect();
              anchorPosition = { x: rect.right + 4, y: rect.bottom + 4 };
            }
            setCellConfigPanel({
              row: selectedRanges[0].from.row,
              col: selectedRanges[0].from.col,
              visible: true,
              anchorPosition,
            });
          } else {
            setCellConfigPanel({ row: -1, col: -1, visible: false });
          }
       }}
       afterChange={(changes, source) => {
         if (source === 'edit' && changes) {
           const newData = [...excelData];
           changes.forEach(([row, col, oldVal, newVal]) => {
             if (newData[row] && newData[row][col as number]) {
               newData[row][col as number] = newVal;
             }
           });

           handleSetExcelData(newData);
         }
       }}
     />
     {renderCellConfigPanel()}
   </div>
  );
};

