import * as React from 'react'
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
import { Trash2 } from 'lucide-react'
import { DataDictItem } from '@/types/datasource-schema'
import { useTranslations } from 'next-intl'

export type DataDictEditDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  editDraft: {
    id: string
    name: string
    items: DataDictItem[]
  }
  setEditDraft: (draft: { id: string; name: string; items: DataDictItem[] }) => void
  editIdx: number | null
  loading: boolean
  onSave: () => void
}

export default function DataDictEditDialog({
  open,
  onOpenChange,
  editDraft,
  setEditDraft,
  editIdx,
  loading,
  onSave,
  tCommon,
}: DataDictEditDialogProps & { tCommon: any }) {
  const t = useTranslations('DataDict')

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{editIdx === null ? tCommon('add') : tCommon('edit')}</DialogTitle>
          <DialogDescription>
            {editIdx === null ? t('addDictDesc') : t('editDictDesc')}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <Input
            value={editDraft.name}
            onChange={(e) => setEditDraft({ ...editDraft, name: e.target.value })}
            placeholder={tCommon('name')}
            className="text-xs"
          />
          <div className="border rounded p-2">
            <div className="font-semibold mb-2">{tCommon('items')}</div>
            {editDraft.items.map((item, i) => (
              <div key={i} className="flex gap-2 mb-1 items-center">
                <Input
                  value={item.value}
                  onChange={(e) => {
                    const items = [...editDraft.items]
                    items[i] = { ...items[i], value: e.target.value }
                    setEditDraft({ ...editDraft, items })
                  }}
                  placeholder={tCommon('value')}
                  className="text-xs "
                />
                <Input
                  value={item.label}
                  onChange={(e) => {
                    const items = [...editDraft.items]
                    items[i] = { ...items[i], label: e.target.value }
                    setEditDraft({ ...editDraft, items })
                  }}
                  placeholder={tCommon('label')}
                  className="text-xs "
                />
                <Button
                  size="icon"
                  variant="ghost"
                  aria-label={tCommon('delete')}
                  onClick={() => {
                    setEditDraft({
                      ...editDraft,
                      items: editDraft.items.filter((_, j) => j !== i),
                    })
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <Button
              size="sm"
              variant="secondary"
              className="text-xs mt-2"
              onClick={() =>
                setEditDraft({
                  ...editDraft,
                  items: [...editDraft.items, { value: '', label: '' }],
                })
              }
            >
              {tCommon('add')}
            </Button>
          </div>
        </div>
        <DialogFooter>
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            {tCommon('cancel')}
          </Button>
          <Button onClick={onSave} disabled={loading}>
            {tCommon('save')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
