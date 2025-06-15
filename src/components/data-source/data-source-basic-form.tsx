'use client'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { updateDataSource } from '@/repository/datasource'
import { DataSourceType } from '@/types/datasource-schema'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog'
import { toast } from 'sonner'
import { useTranslations } from 'next-intl'

export default function DataSourceBasicForm({ dataSource }: { dataSource: DataSourceType }) {
  const tCommon = useTranslations('Common')
  const [name, setName] = useState(dataSource.name)
  const [record, setRecord] = useState(dataSource || {})
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await updateDataSource(dataSource.id!, { name })
    setIsSubmitting(false)
    setOpen(false)
    setRecord({ ...record, name })
    toast.success(tCommon('nameSaved'))
  }

  return (
    <div>
      <div className="flex items-center gap-2 justify-between px-2">
        <span
          className="font-bold text-lg cursor-pointer hover:underline"
          onClick={() => setOpen(true)}
        >
          {record.name}
        </span>
        <span className="text-xs text-gray-500 bg-gray-100 rounded px-2 py-0.5 ml-2">
          {dataSource.type}
        </span>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{tCommon('editName')}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input value={name} onChange={(e) => setName(e.target.value)} required autoFocus />
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? tCommon('saving') : tCommon('save')}
              </Button>
              <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
                {tCommon('cancel')}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
