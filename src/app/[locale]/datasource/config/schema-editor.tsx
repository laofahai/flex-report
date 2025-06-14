"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, ChevronDown, ChevronRight } from "lucide-react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  Row,
  ColumnDef,
  ExpandedState,
  getExpandedRowModel,
} from "@tanstack/react-table";
import { useState, useEffect } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getDictionaries } from "@/repository/dictionary";
import { DataSourceField, DataSourceSchema, DataSourceFieldSchema, DataSourceFieldSchemaBase } from '@/types/datasource-schema';
import { toast } from "sonner";

export default function SchemaEditor({
  schema,
  onFieldChange,
  onSave,
  saving,
  saved,
  onFetchSample,
  fetching,
}: {
  schema: DataSourceSchema;
  onFieldChange: (id: string, key: string, value: string) => void;
  onSave: () => void;
  saving: boolean;
  saved: boolean;
  onFetchSample: () => void;
  fetching: boolean;
}) {
  const [expanded, setExpanded] = React.useState<ExpandedState>({});
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteRowId, setDeleteRowId] = useState<string | null>(null);
  const [dictionaries, setDictionaries] = useState<{ id: string; name: string }[]>([]);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [addFieldKey, setAddFieldKey] = useState("");

  useEffect(() => {
    getDictionaries().then((data) => {
      setDictionaries(data.map((d: any) => ({ id: d.id, name: d.name })));
    });
  }, []);

  useEffect(() => {
    if (saved) {
      toast.success("Schema Saved!");
    }
  }, [saved]);

  console.log('schema rendered');

  // Get enum options from Zod schema correctly
  const typeOptions = DataSourceFieldSchemaBase.shape.type.options;
  const filterTypeOptions = DataSourceFieldSchemaBase.shape.filterType._def.innerType.options;

  // Add handler to add a new schema field recursively by dot notation
  function handleAddFieldRecursive() {
    if (!addFieldKey.trim()) {
      toast.error("Field key is required");
      return;
    }
    const keys = addFieldKey.split(".").map(k => k.trim()).filter(Boolean);
    if (keys.length === 0) {
      toast.error("Invalid field key");
      return;
    }
    // Helper to add recursively
    function addRecursively(fields: any[], path: string[]): any[] {
      if (path.length === 0) return fields;
      const [current, ...rest] = path;
      let found = fields.find(f => f.name === current);
      if (!found) {
        found = {
          id: `field_${Date.now()}_${current}`,
          name: current,
          label: '',
          type: rest.length > 0 ? 'object' : typeOptions[0],
          filterType: filterTypeOptions[0],
          children: rest.length > 0 ? [] : undefined,
        };
        fields.push(found);
      }
      if (rest.length > 0) {
        if (!found.children) found.children = [];
        found.children = addRecursively(found.children, rest);
      }
      return fields;
    }
    // Clone schema deeply
    const newSchema = JSON.parse(JSON.stringify(schema));
    addRecursively(newSchema, keys);
    onFieldChange("", "replace", JSON.stringify(newSchema)); // Pass array, not object
    toast.success('Field(s) added');
    setAddDialogOpen(false);
    setAddFieldKey("");
  }

  // 局部 state 缓存 input
  function useFieldInput(initial: string, onCommit: (val: string) => void) {
    const [value, setValue] = React.useState(initial);
    React.useEffect(() => { setValue(initial); }, [initial]);
    const commit = React.useCallback(() => {
      if (value !== initial) onCommit(value);
    }, [value, initial, onCommit]);
    return {
      value,
      onChange: (e: any) => setValue(e.target.value),
      onBlur: commit,
      onKeyDown: (e: any) => { if (e.key === 'Enter') commit(); },
    };
  }

  const columns = React.useMemo<ColumnDef<any, any>[]>(
    () => [
      {
        id: 'field',
        header: 'Field / Label',
        cell: ({ row }) => {
          const f = row.original;
          const nameInput = useFieldInput(f.name, val => onFieldChange(f.id, 'name', val));
          const labelInput = useFieldInput(f.label ?? '', val => onFieldChange(f.id, 'label', val));
          return (
            <div className="flex items-center gap-2" style={{ paddingLeft: `${row.depth * 20}px` }}>
              {/* Always reserve space for expander */}
              {f.children && f.children.length > 0 ? (
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="mr-1"
                  onClick={() => row.toggleExpanded()}
                >
                  {row.getIsExpanded() ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </Button>
              ) : (
                <span className="inline-block w-8 mr-1" />
              )}
              <Input
                {...nameInput}
                className="!text-xs w-32"
                placeholder="Field name"
              />
              <Input
                {...labelInput}
                className="!text-xs flex-1"
                placeholder="Label (optional)"
              />
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="text-red-500 hover:text-red-700"
                title="Delete field"
                onClick={e => {
                  e.stopPropagation();
                  setDeleteRowId(f.id);
                  setDeleteDialogOpen(true);
                }}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          );
        },
      },
      {
        id: 'type',
        header: 'Type',
        cell: ({ row }) => {
          const f = row.original;
          return (
            <div className="flex items-center gap-2 w-full">
              <Select value={f.type} onValueChange={val => onFieldChange(f.id, 'type', val)}>
                <SelectTrigger className="text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {typeOptions.map((opt: string) => (
                    <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {f.type === 'enum' && (
                <Select
                  value={f.dictId || ''}
                  onValueChange={val => onFieldChange(f.id, 'dictId', val)}
                >
                  <SelectTrigger className="text-xs flex-1">
                    <SelectValue placeholder="Select dictionary" />
                  </SelectTrigger>
                  <SelectContent>
                    {dictionaries.map(dict => (
                      <SelectItem key={dict.id} value={dict.id}>{dict.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          );
        },
      },
      {
        id: 'filterable',
        header: 'Filterable',
        cell: ({ row }) => {
          const f = row.original;
          const targetFieldInput = useFieldInput(f.targetField ?? f.id, val => onFieldChange(f.id, 'targetField', val));
          return (
            <div className="flex items-center gap-2 w-full">
              {f.filterType && f.filterType !== 'none' && (
                <Input
                  {...targetFieldInput}
                  className="!text-xs flex-1"
                  placeholder="Target field"
                />
              )}
              <Select
                value={f.filterType || 'none'}
                onValueChange={val => onFieldChange(f.id, 'filterType', val)}
              >
                <SelectTrigger className="text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {filterTypeOptions.map((opt: string) => (
                    <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          );
        },
      },
    ],
    [onFieldChange, dictionaries]
  );

  // Memoize table data and columns to avoid unnecessary recalculations
  const memoizedSchema = React.useMemo(() => schema, [schema]);
  const memoizedColumns = React.useMemo(() => columns, [columns]);

  const table = useReactTable({
    data: memoizedSchema.fields,
    columns: memoizedColumns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row, index, parent) => row.id,
    getSubRows: row => row.children,
    getRowCanExpand: row => !!row.original.children?.length,
    state: { expanded },
    onExpandedChange: setExpanded,
    enableExpanding: true,
    getIsRowExpanded: row => {
      if (typeof expanded === 'object' && expanded !== null) {
        return expanded[row.id] ?? false;
      }
      return expanded === true;
    },
    autoResetExpanded: false,
    getExpandedRowModel: getExpandedRowModel(),
    // Only recompute when schema or columns change
    debugTable: false,
  });

  return (
    <>
      <div>
        <div className="font-semibold mb-2 flex justify-between items-center">
          <div>Data Source Schema</div>
          <div className="flex items-center gap-2">
            <Button type="button" onClick={() => setAddDialogOpen(true)} variant="outline">
              + Add Field
            </Button>
            <Button type="button" onClick={() => {
              onSave();
              toast.info("Saving schema...");
            }} disabled={saving || schema.fields?.length === 0}>
              {saving ? 'Saving...' : 'Save Schema'}
            </Button>
            <Button type="button" variant="secondary" onClick={() => {
              onFetchSample();
              toast.info("Fetching sample data...");
            }} disabled={fetching} className="px-6 py-2">
              {fetching ? 'Fetching...' : 'Fetch Sample'}
            </Button>
          </div>
        </div>
        {memoizedSchema?.fields?.length === 0 ? (
          <div className="text-gray-500 text-sm">No schema detected. Fetch a sample to infer schema.</div>
        ) : (
          <div className="w-full overflow-x-auto">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map(headerGroup => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                      <TableHead key={header.id} className="p-2 border text-left">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getExpandedRowModel().rows.map(row => (
                  <TableRow key={row.id} data-depth={row.depth}>
                    {row.getVisibleCells().map(cell => (
                      <TableCell key={cell.id} className="p-2 border align-top">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Field</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this field? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="secondary" onClick={() => setDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  if (deleteRowId) {
                    onFieldChange(deleteRowId, 'delete', '');
                    toast.success("Field deleted");
                  }
                  setDeleteRowId(null);
                  setDeleteDialogOpen(false);
                }}
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Field</DialogTitle>
            <DialogDescription>
              Enter a field key. Use dot notation for nested fields (e.g. <code>user.address.street</code>).
            </DialogDescription>
          </DialogHeader>
          <Input
            value={addFieldKey}
            onChange={e => setAddFieldKey(e.target.value)}
            placeholder="Field key (e.g. user.address.street)"
            autoFocus
            onKeyDown={e => { if (e.key === 'Enter') handleAddFieldRecursive(); }}
          />
          <DialogFooter>
            <Button variant="secondary" onClick={() => setAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddFieldRecursive}>Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

