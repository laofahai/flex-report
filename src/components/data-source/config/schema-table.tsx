import React, { useMemo, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Trash2, ChevronDown, ChevronRight } from 'lucide-react'
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ExpandedState,
  getExpandedRowModel,
  ColumnDef,
} from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useTranslations } from 'next-intl'
import type { DataSourceSchema } from '@/types/datasource-schema'
import FieldInput from './field-input'
import FieldSelect from './field-select'

// 单独提取 MemoTableRow，props 只传递 row
const MemoTableRow = React.memo(
  function MemoTableRow({ row }: { row: any }) {
    return (
      <TableRow key={row.id} data-state={row.getIsSelected() ? 'selected' : undefined}>
        {row.getVisibleCells().map((cell: any) => (
          <TableCell key={cell.id} className="p-2 border align-top">
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        ))}
      </TableRow>
    )
  },
  (prev, next) => {
    // 只在 row.original 变动时重渲染
    const prevO = prev.row.original
    const nextO = next.row.original
    if (prevO === nextO) return true
    if (!prevO || !nextO) return false
    const keysA = Object.keys(prevO)
    const keysB = Object.keys(nextO)
    if (keysA.length !== keysB.length) return false
    for (let key of keysA) {
      if (prevO[key] !== nextO[key]) return false
    }
    return true
  }
)

// 可复用的 input 组件，避免频繁重渲染
const SchemaTable = React.memo(function SchemaTable({
  schema,
  onFieldChange,
  onDeleteRequest = () => {},
  dictionaries,
  typeOptions,
  filterTypeOptions,
  expanded,
  setExpanded,
}: {
  schema: DataSourceSchema
  onFieldChange: (id: string, key: string, value: string) => void
  onDeleteRequest?: (id: string) => void
  dictionaries: { id: string; name: string }[]
  typeOptions: string[]
  filterTypeOptions: string[]
  expanded: ExpandedState
  setExpanded: React.Dispatch<React.SetStateAction<ExpandedState>>
}) {
  const t = useTranslations('DataSource')

  const dictIdToName = useMemo(() => {
    const map: Record<string, string> = {}
    dictionaries.forEach((d) => {
      map[d.id] = d.name
    })
    return map
  }, [dictionaries])

  const stableOnFieldChange = useCallback(onFieldChange, [])
  const stableOnDeleteRequest = useCallback(onDeleteRequest, [])

  const fieldHeader = t('fieldHeader')
  const typeHeader = t('typeHeader')
  const filterableHeader = t('filterableHeader')

  const columns = useMemo<ColumnDef<any, any>[]>(
    () => [
      {
        id: 'field',
        header: fieldHeader,
        cell: ({ row }) => {
          const f = row.original
          return (
            <div className="flex items-center gap-2" style={{ paddingLeft: `${row.depth * 20}px` }}>
              {f.children && f.children.length > 0 ? (
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="mr-1"
                  onClick={() => row.toggleExpanded()}
                >
                  {row.getIsExpanded() ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </Button>
              ) : (
                <span className="inline-block w-8 mr-1" />
              )}
              <FieldInput
                value={f.name}
                onCommit={(val) => stableOnFieldChange(f.id, 'name', val)}
                className="!text-xs w-32"
                placeholder="Field name"
              />
              <FieldInput
                value={f.label ?? ''}
                onCommit={(val) => stableOnFieldChange(f.id, 'label', val)}
                className="!text-xs flex-1"
                placeholder="Label (optional)"
              />
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="text-red-500 hover:text-red-700"
                title="Delete field"
                onClick={(e) => {
                  e.stopPropagation()
                  stableOnDeleteRequest(f.id)
                }}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          )
        },
      },
      {
        id: 'type',
        header: typeHeader,
        cell: ({ row }) => {
          const f = row.original
          return (
            <div className="flex items-center gap-2 w-full">
              <FieldSelect
                value={f.type}
                options={typeOptions}
                onChange={(val) => stableOnFieldChange(f.id, 'type', val)}
                className="text-xs"
              />
              {f.type === 'enum' && (
                <FieldSelect
                  value={f.dictId || ''}
                  options={dictionaries}
                  onChange={(val) => stableOnFieldChange(f.id, 'dictId', val)}
                  placeholder="Select dictionary"
                  className="text-xs flex-1"
                  renderItem={(dict: any) => dict.name}
                  getOptionValue={(dict: any) => dict.id}
                />
              )}
            </div>
          )
        },
      },
      {
        id: 'filterable',
        header: filterableHeader,
        cell: ({ row }) => {
          const f = row.original
          return (
            <div className="flex items-center gap-2 w-full">
              {f.filterType && f.filterType !== 'none' && (
                <FieldInput
                  value={f.targetField ?? f.id}
                  onCommit={(val) => stableOnFieldChange(f.id, 'targetField', val)}
                  className="!text-xs flex-1"
                  placeholder="Target field"
                />
              )}
              <FieldSelect
                value={f.filterType || 'none'}
                options={filterTypeOptions}
                onChange={(val) => stableOnFieldChange(f.id, 'filterType', val)}
                className="text-xs"
              />
            </div>
          )
        },
      },
    ],
    [
      typeOptions,
      filterTypeOptions,
      dictionaries,
      dictIdToName,
      fieldHeader,
      typeHeader,
      filterableHeader,
      stableOnFieldChange,
      stableOnDeleteRequest,
    ]
  )
  const memoizedSchema = useMemo(() => schema, [schema])
  const memoizedColumns = useMemo(() => columns, [columns])
  const table = useReactTable({
    data: memoizedSchema.fields,
    columns: memoizedColumns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row.id,
    getSubRows: (row) => row.children,
    getRowCanExpand: (row) => !!row.original.children?.length,
    state: { expanded },
    onExpandedChange: setExpanded,
    enableExpanding: true,
    getIsRowExpanded: (row) =>
      typeof expanded === 'object' && expanded !== null
        ? (expanded[row.id] ?? false)
        : expanded === true,
    autoResetExpanded: false,
    getExpandedRowModel: getExpandedRowModel(),
    debugTable: false,
  })
  if (!memoizedSchema?.fields?.length) {
    return <div className="text-gray-500 text-sm">{t('noSchemaDetected')}</div>
  }

  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="p-2 border text-left">{t('fieldHeader')}</TableHead>
            <TableHead className="p-2 border text-left">{t('typeHeader')}</TableHead>
            <TableHead className="p-2 border text-left">{t('filterableHeader')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <MemoTableRow key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </div>
  )
})

export default SchemaTable
