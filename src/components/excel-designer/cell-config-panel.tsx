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
import { getDataSourceById } from '@/repository/datasource'
import { DataSourceField } from '@/types/datasource-schema'
import { Separator } from '@/components/ui/separator'
import { Command, CommandInput, CommandItem, CommandList, CommandEmpty } from '@/components/ui/command';
import { Popover as ShadPopover, PopoverContent as ShadPopoverContent, PopoverTrigger as ShadPopoverTrigger } from '@/components/ui/popover';
import { Label } from '@/components/ui/label'
import { ChevronDown } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {flatMap} from 'lodash-es'

export interface CellConfigPanelProps {
  open: boolean;
  anchorPosition?: { x: number; y: number };
  row: number;
  col: number;
  cell?: ExcelDesignerCell;
  onClose: () => void;
  onChange?: (cell: ExcelDesignerCell) => void;
  datasourceId?: string;
  tableDesign: TableDesign;
  currentRow?: ExcelDesignerRow;
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
  tableDesign,
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
  const [fieldSelectOpen, setFieldSelectOpen] = React.useState(false);

  React.useEffect(() => {
    setLocalCell(cell || { value: '' });
  }, [cell]);

  React.useEffect(() => {
    // 如果当前行是 loop 行，默认显示字段
    if (cell && currentRow?.type === 'loop') setShowVariable(true);
    else setShowVariable(false);
  }, [cell]);

  // variableOptions 由 tableDesign/effectiveDatasourceId 推导（异步获取）
  const [variableOptions, setVariableOptions] = React.useState<DataSourceField[]>([]);
  const [flattenVariableOptions, setFlattenVariableOptions] = React.useState<DataSourceField[]>([]);

  React.useEffect(() => {
    if (!tableDesign.dataSourceId) {
      setVariableOptions([]);
      setFlattenVariableOptions([]);
      return;
    }
    getDataSourceById(tableDesign.dataSourceId).then(ds => {
      const options = JSON.parse(ds.schema?.toString() || "[]") as DataSourceField[];
      setVariableOptions(options);
      setFlattenVariableOptions(
        flatMap(options, (field: DataSourceField) => field.children ? [field, ...field.children] : [field])
      );
    }).catch(err => {
      console.log(err)
    });
  }, [tableDesign.dataSourceId]);

  const filteredOptions = React.useMemo(() => {
    if (!search) return variableOptions;
    const lower = search.toLowerCase()?.trim();
    const res = flattenVariableOptions.filter(
      opt =>(opt.label?.toLowerCase().includes(lower)) ||
          opt.id.toLowerCase().includes(lower)
    );

    return res || [];
  }, [search, flattenVariableOptions, variableOptions]);

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

  const handleFieldUpdate = (field: any, opt: DataSourceField) => {
    field.onChange(opt.id);
    // update localCell
    setLocalCell(prev => ({
      ...prev,
      variable: opt.id,
      value: `$\{${opt.label || opt.id}\}`
    }));
    setFieldSelectOpen(false);
  }

  // 递归渲染字段和子字段
  const renderFieldOptions = (field: DataSourceField, fieldHandler: any, level = 0) => {
    const children = Array.isArray(field.children) ? field.children : [];
    return (
      <React.Fragment key={field.id}>
        <CommandItem
          value={field.id}
          onSelect={() => {
            handleFieldUpdate(fieldHandler, field)
          }}
          style={{ paddingLeft: 16 + level * 16 }}
        >
          {field.label || field.id}
          {field.label && (
            <span className={"text-foreground border-l border-l-gray-200 pl-2"}>
              {field.id}
            </span>
          )}
        </CommandItem>
        {children.map((child: any) => renderFieldOptions(child, fieldHandler, level + 1))}
      </React.Fragment>
    );
  }

  return (
    <Popover open={open} onOpenChange={open => { if (!open) onClose(); }}>
      <PopoverTrigger asChild>
        <div ref={anchorRef} style={style} />
      </PopoverTrigger>
      <PopoverContent side="bottom" align="start" className={"z-999"} style={{ minWidth: 320 }}>
        <div className={"flex justify-between items-center"}>
          <div className="font-semibold flex-1 flex gap-2 items-center">
            <Badge variant={"secondary"} className={"text-base font-bold tracking-wider"}>{cellLabel}</Badge>
            <div className="text-xs text-muted-foreground">Row: {row}, Col: {col}</div>
          </div>
          <div className={"flex gap-2 items-center"}>
            <Switch checked={showVariable} id="use-dynamic-field" disabled={!tableDesign.dataSourceId}  onCheckedChange={v => { setShowVariable(v);
              if (!v) setLocalCell({ ...localCell, variable: '', value: '' });
            }} />
            <Label htmlFor="use-dynamic-field">字段</Label>
          </div>

        </div>
        <Separator className={"my-4"} />
        <Form {...form}>
          <div className={"space-y-4"}>
            {showVariable && (
              <FormField
                control={form.control}
                name="variable"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center gap-2 w-full">
                    <FormLabel className="text-sm min-w-[48px] text-right pr-2">字段</FormLabel>
                    <FormControl className="flex-1 min-w-0">
                      <ShadPopover open={fieldSelectOpen} onOpenChange={setFieldSelectOpen}>
                        <ShadPopoverTrigger asChild>
                          <Button variant="outline" role="combobox" className="w-[230px] justify-between overflow-hidden text-ellipsis" disabled={!tableDesign.dataSourceId}>
                            {field.value ? variableOptions.find(opt => opt.id === field.value)?.label || field.value : '请选择字段'}
                            <ChevronDown />
                          </Button>
                        </ShadPopoverTrigger>
                        <ShadPopoverContent align="start" className="p-0 z-1000">
                          <Command>
                            <CommandInput placeholder="搜索字段..." value={search} onValueChange={setSearch} />
                            <CommandList>
                              <CommandEmpty>无匹配字段</CommandEmpty>
                              {filteredOptions.map(opt => renderFieldOptions(opt, field))}
                            </CommandList>
                          </Command>
                        </ShadPopoverContent>
                      </ShadPopover>
                    </FormControl>
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-2 w-full">
                  <FormLabel className="text-sm min-w-[48px] text-right">内容</FormLabel>
                  <FormControl className="flex-1">
                    <Input readOnly={showVariable} placeholder="请输入内容" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="expand"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-2 w-full">
                  <FormLabel className="text-sm min-w-[48px] text-right">扩展</FormLabel>
                  <FormControl className="flex-1">
                    <Select value={field.value || 'none'} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full ">
                        <SelectValue placeholder="请选择扩展" />
                      </SelectTrigger>
                      <SelectContent className={"z-1000"}>
                        <SelectItem value="none" className="">无</SelectItem>
                        <SelectItem value="col" className="">跨列</SelectItem>
                        <SelectItem value="row" className="">跨行</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            <Separator className={"my-6"} />
            <div className="flex gap-2 justify-between">
              <Button size="sm" variant="outline" type="button" onClick={onClose}>取消</Button>
              <Button size="sm" onClick={handleConfirm}>确认</Button>
            </div>
          </div>
        </Form>
      </PopoverContent>
    </Popover>
  );
};

