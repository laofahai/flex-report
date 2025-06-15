import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export interface FieldSelectProps<T = string> {
  value: string
  options: T[]
  onChange: (val: string) => void
  placeholder?: string
  className?: string
  renderItem?: (option: T) => React.ReactNode
  getOptionValue?: (option: T) => string
}

const FieldSelect = React.memo(
  <T extends any = string>({
    value,
    options = [],
    onChange,
    placeholder,
    className,
    renderItem,
    getOptionValue,
  }: FieldSelectProps<T>) => {
    return (
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className={className || 'text-xs'}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options && options.length > 0
            ? options.map((opt) => (
                <SelectItem
                  key={getOptionValue ? getOptionValue(opt) : (opt as any)}
                  value={getOptionValue ? getOptionValue(opt) : (opt as any)}
                >
                  {renderItem ? renderItem(opt) : (opt as any)}
                </SelectItem>
              ))
            : null}
        </SelectContent>
      </Select>
    )
  }
)

export default FieldSelect
