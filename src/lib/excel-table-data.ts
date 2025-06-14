import { DatasourceData } from '@/types/datasource-data'
import { TableDesign } from '@/types/table-design'
import { get } from 'lodash-es'

interface HandleDataExpandResult {
  merges: TableDesign["schema"]["mergeCells"];
  data: any[][];
}

export const handleDataExpand = (
  tableSchema: TableDesign["schema"],
  plainData: any[][]
): HandleDataExpandResult => {
  const merges: TableDesign["schema"]["mergeCells"] = [];
  const data = plainData.map(row => [...row]); // 浅拷贝数据

  // 构建行类型映射：判断每行是普通行还是循环行
  const rowTypes: ("normal" | "loop")[] = [];
  let currentRow = 0;

  // 遍历表结构定义，构建行类型映射
  for (const rowDef of tableSchema.rows) {
    if (rowDef.type === 'loop') {
      // 循环行：计算该循环行生成的行数
      const loopRowCount = plainData.length - tableSchema.rows.length + 1;
      for (let i = 0; i < loopRowCount; i++) {
        rowTypes[currentRow++] = "loop";
      }
    } else {
      // 普通行
      rowTypes[currentRow++] = "normal";
    }
  }

  // 获取单元格配置的安全方法
  const getCellConfig = (rowIndex: number, colIndex: number) => {
    let configRowIndex = 0;
    let rowCount = 0;

    // 查找当前数据行对应的配置行
    for (let i = 0; i < tableSchema.rows.length; i++) {
      const rowDef = tableSchema.rows[i];
      const rowsGenerated = rowDef.type === 'loop'
        ? plainData.length - tableSchema.rows.length + 1
        : 1;

      if (rowIndex >= rowCount && rowIndex < rowCount + rowsGenerated) {
        configRowIndex = i;
        break;
      }
      rowCount += rowsGenerated;
    }

    const rowConfig = tableSchema.rows[configRowIndex];
    if (!rowConfig || !rowConfig.cells) return null;

    // 返回列配置（如果列超出范围，返回最后一列的配置）
    return colIndex < rowConfig.cells.length
      ? rowConfig.cells[colIndex]
      : rowConfig.cells[rowConfig.cells.length - 1];
  };

  // 1. 行合并（纵向）：只处理循环行
  for (let colIdx = 0; colIdx < tableSchema.columns.length; colIdx++) {
    for (let rowIdx = 0; rowIdx < data.length; rowIdx++) {
      // 只对循环行做行合并
      if (rowTypes[rowIdx] !== "loop") continue;

      const cellConfig = getCellConfig(rowIdx, colIdx);
      const cellValue = data[rowIdx][colIdx];

      // 跳过空值或非行合并单元格
      if (!cellConfig || cellConfig.expand !== 'row' || cellValue == null || cellValue === '') {
        continue;
      }

      // 查找可合并的行范围（只考虑循环行）
      let mergeCount = 1;
      for (let nextRow = rowIdx + 1; nextRow < data.length; nextRow++) {
        // 遇到普通行停止合并
        if (rowTypes[nextRow] === "normal") break;

        const nextCellConfig = getCellConfig(nextRow, colIdx);
        const nextValue = data[nextRow][colIdx];

        // 检查是否可合并
        if (
          nextCellConfig?.expand === 'row' &&
          nextValue === cellValue
        ) {
          mergeCount++;
        } else {
          break;
        }
      }

      // 找到可合并区域
      if (mergeCount > 1) {
        merges.push({
          row: rowIdx,
          col: colIdx,
          rowspan: mergeCount,
          colspan: 1
        });

        // 清空被合并单元格（保留第一个）
        for (let i = rowIdx + 1; i < rowIdx + mergeCount; i++) {
          data[i][colIdx] = '';
        }

        // 跳过已合并区域
        rowIdx += mergeCount - 1;
      }
    }
  }

  // 2. 列合并（横向）：只处理循环行
  for (let rowIdx = 0; rowIdx < data.length; rowIdx++) {
    // 只对循环行做列合并
    if (rowTypes[rowIdx] !== "loop") continue;

    for (let colIdx = 0; colIdx < tableSchema.columns.length; colIdx++) {
      // 跳过已合并的单元格
      if (data[rowIdx][colIdx] === '') continue;

      const cellConfig = getCellConfig(rowIdx, colIdx);
      const cellValue = data[rowIdx][colIdx];

      // 跳过空值或非列合并单元格
      if (!cellConfig || cellConfig.expand !== 'col' || cellValue == null) {
        continue;
      }

      // 查找可合并的列范围
      let mergeCount = 1;
      for (let nextCol = colIdx + 1; nextCol < tableSchema.columns.length; nextCol++) {
        const nextCellConfig = getCellConfig(rowIdx, nextCol);
        const nextValue = data[rowIdx][nextCol];

        // 检查是否可合并
        if (
          nextCellConfig?.expand === 'col' &&
          nextValue === cellValue
        ) {
          mergeCount++;
        } else {
          break;
        }
      }

      // 找到可合并区域
      if (mergeCount > 1) {
        //rowIdx, colIdx, 1, mergeCount
        merges.push({
          row: rowIdx,
          col: colIdx,
          rowspan: 1,
          colspan: mergeCount
        });

        // 清空被合并单元格（保留第一个）
        for (let j = colIdx + 1; j < colIdx + mergeCount; j++) {
          data[rowIdx][j] = '';
        }

        // 跳过已合并区域
        colIdx += mergeCount - 1;
      }
    }
  }

  // 3. 普通行的合并（如果有需要，可以在这里实现）
  // 当前只对循环行做合并，普通行不做合并

  return { merges, data };
};

const test = () => {
  const tableSchema = {
    rows: [
      {
        cells: [
          { expand: 'row' }, // 第0行第0列
          { expand: 'col' }  // 第0行第1列
        ]
      },
      {
        cells: [
          { expand: 'row' }, // 第1行第0列
          {} // 第1行第1列
        ]
      }
    ],
    columns: [{}, {}] // 两列
  };

  const plainData = [
    ['合并我', '横向合并'],
    ['合并我', '单独值']
  ];

  const result = handleDataExpand(tableSchema as any, plainData);

  console.log(result)
}

export const toExcelTableData = (raw: DatasourceData, tableSchema: TableDesign["schema"]) => {

  const {items} = raw;

  const result: any[][] = [];

  tableSchema.rows.forEach((row) => {
    if (row.type === "loop") {
      items.forEach(record => {
        const rowData: any[] = [];
        row.cells.forEach((cell) => {
          let cellValue = '';
          if (cell.variable) {
            cellValue = get(record, cell.variable, '')
          } else {
            cellValue = cell.value || '';
          }

          rowData.push(cellValue);
        })

        result.push(rowData);
      })
    } else {
      const rowData: any[] = [];
      row.cells.forEach((cell) => {
        rowData.push(cell.value || '');
      });
      result.push(rowData);
    }
  })


  return handleDataExpand(tableSchema, result)
}

