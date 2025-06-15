import React, { useState, useEffect, useCallback } from 'react'
import { Input } from '@/components/ui/input'

export interface FieldInputProps {
  value: string
  onCommit: (val: string) => void
  [key: string]: any
}

const FieldInput: React.FC<FieldInputProps> = React.memo(({ value, onCommit, ...props }) => {
  const [val, setVal] = useState(value)
  useEffect(() => {
    setVal(value)
  }, [value])
  const commit = useCallback(() => {
    if (val !== value) onCommit(val)
  }, [val, value, onCommit])
  return (
    <Input
      value={val}
      onChange={(e) => setVal(e.target.value)}
      onBlur={commit}
      onKeyDown={(e) => {
        if (e.key === 'Enter') commit()
      }}
      {...props}
    />
  )
})

export default FieldInput
