import React, { CSSProperties, useRef } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import type { ExcelDesignerCell, ExcelDesignerRow } from '@/types/table-design';
import type { TableDesign } from '@/types/table-design';
import { getDataSourceById } from '@/controller/datasource'
import { SchemaField } from '@/controller/schema'
import { DataSourceField } from '@/types/datasource-schema'
import { Separator } from '@/components/ui/separator'
import { Command, CommandInput, CommandItem, CommandList, CommandEmpty } from '@/components/ui/command';
import { Popover as ShadPopover, PopoverContent as ShadPopoverContent, PopoverTrigger as ShadPopoverTrigger } from '@/components/ui/popover';
import { Label } from '@/components/ui/label'

export interface CellConfigPanelProps {
  open: boolean;
  anchorPosition?: { x: number; y: number };
  row: number;
  col: number;
  cell?: ExcelDesignerCell;
  onClose: () => void;
  onChange?: (cell: ExcelDesignerCell) => void;
  datasourceId?: string;
  tableDesign?: TableDesign;
  currentRow?: ExcelDesignerRow;
  getDatasourceIdByRow?: (row: ExcelDesignerRow) => string | undefined;
}

export const CellConfigPanel: React.FC<CellConfigPanelProps> = ({
  open,
  anchorPosition,
  row,
  col,
  cell,
  onClose,
  onChange,
  datasourceId,
  currentRow,
  getDatasourceIdByRow,
}) => {
  const anchorRef = useRef<HTMLDivElement>(null);
  // 锚点div样式，定位到cell正下方
  const style: CSSProperties = anchorPosition
    ? {
        position: 'fixed' as const,
        left: anchorPosition.x - 1, // 保持与cell左对齐
        top: anchorPosition.y, // 正下方
        width: 1,
        height: 1,
        zIndex: 9999,
        pointerEvents: 'none',
        background: 'transparent',
      }
    : { display: 'none' };

  // 工具函数：数字列号转字母
  function colToLetter(col: number) {
    let temp = '';
    let n = col + 1;
    while (n > 0) {
      let rem = (n - 1) % 26;
      temp = String.fromCharCode(65 + rem) + temp;
      n = Math.floor((n - 1) / 26);
    }
    return temp;
  }
  const cellLabel = `${colToLetter(col)}${row + 1}`;

  // 本地 state 用于编辑
  const [localCell, setLocalCell] = React.useState<ExcelDesignerCell>(cell || { value: '' });
  const [showVariable, setShowVariable] = React.useState(false);
  const [search, setSearch] = React.useState('');

  React.useEffect(() => {
    setLocalCell(cell || { value: '' });
  }, [cell]);

  React.useEffect(() => {
    // 如果当前行是 loop 行，默认显示字段
    if (cell && currentRow?.type === 'loop') setShowVariable(true);
    else setShowVariable(false);
  }, [cell]);

  // datasourceId 优先用 currentRow + getDatasourceIdByRow 查
  const effectiveDatasourceId = React.useMemo(() => {
    if (getDatasourceIdByRow && currentRow) {
      return getDatasourceIdByRow(currentRow) || datasourceId;
    }
    return datasourceId;
  }, [getDatasourceIdByRow, currentRow, datasourceId]);

  // variableOptions 由 tableDesign/effectiveDatasourceId 推导（异步获取）
  const [variableOptions, setVariableOptions] = React.useState<DataSourceField[]>([]);

  React.useEffect(() => {
    if (!effectiveDatasourceId) {
      setVariableOptions([]);
      return;
    }
    getDataSourceById(effectiveDatasourceId).then(ds => {
      console.log(ds)
      if (ds?.schema) setVariableOptions(ds.schema as any);
      else setVariableOptions([]);
    }).catch(err => {
      console.log(err)
    });
  }, [effectiveDatasourceId]);

  // react-hook-form
  const form = useForm({
    defaultValues: localCell,
    values: localCell,
  });

  React.useEffect(() => {
    form.reset(localCell);
  }, [localCell]);

  const handleConfirm = form.handleSubmit((values) => {
    onChange?.(values as ExcelDesignerCell);
    onClose();
  });

  return (
    <Popover open={open} onOpenChange={open => { if (!open) onClose(); }}>
      <PopoverTrigger asChild>
        <div ref={anchorRef} style={style} />
      </PopoverTrigger>
      <PopoverContent side="bottom" align="start" style={{ minWidth: 320 }}>
        <div className={"flex justify-between items-center"}>
          <div className="font-semibold flex-1 flex gap-2 items-center">
            {cellLabel}
            <div className="text-xs text-muted-foreground">Row: {row}, Col: {col}</div>
          </div>
          <div className={"flex gap-2 items-center"}>
            <Switch checked={showVariable} id="use-dynamic-field"  onCheckedChange={v => { setShowVariable(v);
              if (!v) setLocalCell({ ...localCell, variable: '', value: '' });
            }} />
            <Label htmlFor="use-dynamic-field">字段</Label>
          </div>

        </div>
        <Separator className={"my-4"} />
        <Form {...form}>
          <form onSubmit={handleConfirm} className="space-y-2">
            {showVariable ? (
              <div className="space-y-1">
                <FormField
                  control={form.control}
                  name="variable"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center gap-2 w-full">
                      <FormLabel className="text-sm min-w-[48px] text-right pr-2">字段</FormLabel>
                      <FormControl className="flex-1 min-w-0">
                        <ShadPopover>
                          <ShadPopoverTrigger asChild>
                            <Button variant="outline" role="combobox" className="w-[230px] text-xs justify-between overflow-hidden text-ellipsis">
                              {variableOptions.find(opt => opt.value === field.value)?.label || '请选择字段'}
                            </Button>
                          </ShadPopoverTrigger>
                          <ShadPopoverContent align="start" className="p-0">
                            <Command>
                              <CommandInput placeholder="搜索字段..." value={search} onValueChange={setSearch} className="text-xs" />
                              <CommandList>
                                <CommandEmpty>无匹配字段</CommandEmpty>
                                {variableOptions.filter(opt => !search || opt.label.includes(search) || opt.value.includes(search)).map(opt => (
                                  <CommandItem
                                    key={opt.value}
                                    value={opt.value}
                                    onSelect={() => {
                                      field.onChange(opt.value);
                                    }}
                                    className="text-xs"
                                  >
                                    {opt.label}
                                  </CommandItem>
                                ))}
                              </CommandList>
                            </Command>
                          </ShadPopoverContent>
                        </ShadPopover>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="value"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center gap-2 w-full">
                      <FormLabel className="text-sm min-w-[48px] text-right pr-2">内容</FormLabel>
                      <FormControl className="flex-1">
                        <Input className="mt-2" placeholder="单元格内容" {...field} readOnly />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            ) : (
              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center gap-2 w-full">
                    <FormLabel className="text-sm min-w-[48px] text-right pr-2">内容</FormLabel>
                    <FormControl className="flex-1">
                      <Input placeholder="单元格内容" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="expand"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-2 w-full">
                  <FormLabel className="text-sm min-w-[48px] text-right pr-2">扩展</FormLabel>
                  <FormControl className="flex-1">
                    <Select value={field.value || 'none'} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full h-8 text-xs">
                        <SelectValue placeholder="请选择扩展" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none" className="text-xs">无</SelectItem>
                        <SelectItem value="col" className="text-xs">跨列</SelectItem>
                        <SelectItem value="row" className="text-xs">跨行</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex gap-2 justify-between mt-4">
              <Button size="sm" variant="outline" type="button" onClick={onClose}>取消</Button>
              <Button size="sm" type="submit">确认</Button>
            </div>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
};

