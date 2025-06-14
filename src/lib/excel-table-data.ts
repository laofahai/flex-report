import { DatasourceData } from '@/types/datasource-data'
import { TableDesign } from '@/types/table-design'
import { get } from 'lodash-es'

export const handleDataExpand = (
  tableSchema: TableDesign["schema"],
  plainData: any[][]
) => {
  const merges: [number, number, number, number][] = [];
  const data = plainData.map(row => [...row]); // 浅拷贝

  // 获取行配置的安全方法（支持循环行）
  const getRowConfig = (rowIndex: number) => {
    // 如果行索引在定义范围内，直接返回
    if (rowIndex < tableSchema.rows.length) {
      return tableSchema.rows[rowIndex];
    }

    // 否则使用最后一个行配置（通常是循环行）
    return tableSchema.rows[tableSchema.rows.length - 1];
  };

  // 获取单元格配置的安全方法
  const getCellConfig = (rowIndex: number, colIndex: number) => {
    const rowConfig = getRowConfig(rowIndex);
    if (!rowConfig || !rowConfig.cells) return null;

    // 如果列索引在定义范围内，直接返回
    if (colIndex < rowConfig.cells.length) {
      return rowConfig.cells[colIndex];
    }

    // 否则使用最后一个单元格配置
    return rowConfig.cells[rowConfig.cells.length - 1];
  };

  // 1. 先行合并（纵向）
  for (let colIdx = 0; colIdx < tableSchema.columns.length; colIdx++) {
    for (let rowIdx = 0; rowIdx < data.length; rowIdx++) {
      const cellConfig = getCellConfig(rowIdx, colIdx);
      const cellValue = data[rowIdx][colIdx];

      // 跳过空值或非行合并单元格
      if (!cellConfig || cellConfig.expand !== 'row' || cellValue == null || cellValue === '') {
        continue;
      }

      // 查找可合并的行范围
      let mergeCount = 1;
      for (let nextRow = rowIdx + 1; nextRow < data.length; nextRow++) {
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
        merges.push([rowIdx, colIdx, mergeCount, 1]);

        // 清空被合并单元格（保留第一个）
        for (let i = rowIdx + 1; i < rowIdx + mergeCount; i++) {
          data[i][colIdx] = '';
        }

        // 跳过已合并区域
        rowIdx += mergeCount - 1;
      }
    }
  }

  // 2. 再列合并（横向）
  for (let rowIdx = 0; rowIdx < data.length; rowIdx++) {
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
        merges.push([rowIdx, colIdx, 1, mergeCount]);

        // 清空被合并单元格（保留第一个）
        for (let j = colIdx + 1; j < colIdx + mergeCount; j++) {
          data[rowIdx][j] = '';
        }

        // 跳过已合并区域
        colIdx += mergeCount - 1;
      }
    }
  }

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

  const result = handleDataExpand(tableSchema, plainData);

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


  const res = handleDataExpand(tableSchema, result)
  console.log(res)
  // console.log(2, result, tableSchema)
  // test();

  return result;
}
