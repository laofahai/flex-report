// AddFieldDialog 子组件，避免主表格随输入频繁重渲染
import React, { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { useTranslations } from 'next-intl'
import { cloneDeep } from 'lodash-es'
import { toast } from 'sonner'
import type { DataSourceSchema } from '@/types/datasource-schema'

export default function AddFieldDialog({
  open,
  setOpen,
  onAddField,
  typeOptions,
  filterTypeOptions,
  schema,
  onFieldChange,
}: {
  open: boolean
  setOpen: (open: boolean) => void
  onAddField?: () => void
  typeOptions: string[]
  filterTypeOptions: string[]
  schema: DataSourceSchema
  onFieldChange: (id: string, key: string, value: string) => void
}) {
  const t = useTranslations('DataSource')
  const tCommon = useTranslations('Common')
  const [addFieldKey, setAddFieldKey] = useState('')
  const handleAddFieldRecursive = useCallback(() => {
    if (!addFieldKey.trim()) {
      toast.error('Field key is required')
      return
    }
    const keys = addFieldKey
      .split('.')
      .map((k) => k.trim())
      .filter(Boolean)
    if (keys.length === 0) {
      toast.error('Invalid field key')
      return
    }
    function addRecursively(fields: any[], path: string[]): any[] {
      if (path.length === 0) return fields
      const [current, ...rest] = path
      let found = fields.find((f) => f.name === current)
      if (!found) {
        found = {
          id: `field_${Date.now()}_${current}`,
          name: current,
          label: '',
          type: rest.length > 0 ? 'object' : typeOptions[0],
          filterType: filterTypeOptions[0],
          children: rest.length > 0 ? [] : undefined,
        }
        fields.push(found)
      }
      if (rest.length > 0) {
        if (!found.children) found.children = []
        found.children = addRecursively(found.children, rest)
      }
      return fields
    }
    const newSchema = cloneDeep(schema)
    addRecursively(newSchema.fields, keys)
    onFieldChange('', 'replace', JSON.stringify(newSchema))
    toast.success('Field(s) added')
    setOpen(false)
    setAddFieldKey('')
    onAddField?.()
  }, [addFieldKey, filterTypeOptions, onFieldChange, schema, typeOptions, setOpen, onAddField])
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('addField')}</DialogTitle>
          <DialogDescription>{t('addFieldDesc')}</DialogDescription>
        </DialogHeader>
        <Input
          value={addFieldKey}
          onChange={(e) => setAddFieldKey(e.target.value)}
          placeholder={t('addFieldPlaceholder')}
          autoFocus
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleAddFieldRecursive()
          }}
        />
        <DialogFooter>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            {tCommon('cancel')}
          </Button>
          <Button onClick={handleAddFieldRecursive}>{t('addField')}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
