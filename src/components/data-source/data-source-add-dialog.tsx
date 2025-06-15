import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { FormEvent } from 'react'

export default function DataSourceAddDialog({
  open,
  setOpen,
  form,
  setForm,
  handleAdd,
  tCommon,
}: {
  open: boolean
  setOpen: (open: boolean) => void
  form: { name: string; type: string }
  setForm: (form: { name: string; type: string }) => void
  handleAdd: (e: FormEvent) => void
  tCommon: any
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{tCommon('add')}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleAdd} className="space-y-4">
          <Input
            placeholder={tCommon('name')}
            value={form.name}
            onChange={(e: any) => setForm({ ...form, name: e.target.value })}
            required
          />
          <Select value={form.type} onValueChange={(value) => setForm({ ...form, type: value })}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={tCommon('type')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="JSON">JSON</SelectItem>
              {/* Future types can be added here */}
            </SelectContent>
          </Select>
          <DialogFooter>
            <Button type="submit">{tCommon('save')}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
