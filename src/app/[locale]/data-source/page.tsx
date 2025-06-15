'use client'

import { useState, useEffect, useTransition, FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import { Badge } from '@/components/ui/badge'
import { useRouter } from 'next/navigation'
import { createDataSource, getDataSources, deleteDataSource } from '@/repository/datasource'
import { Pencil, Trash2, Plus } from 'lucide-react'
import { DataSourceType } from '@/types/datasource-schema'
import MainLayout from '../../layouts/main-layout'
import DataSourceAddDialog from '@/components/data-source/data-source-add-dialog'
import ConfirmDeleteDialog from '@/components/confirm-delete-dialog'
import DataDict from '@/components/data-source/data-dict'
import { Card } from '@/components/ui/card'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'

export default function DataSourcePage() {
  const t = useTranslations('DataSource')
  const tCommon = useTranslations('Common')
  const [dataSources, setDataSources] = useState<DataSourceType[]>([])
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ name: '', type: 'JSON' })
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [editName, setEditName] = useState('')
  const [editLoading, setEditLoading] = useState(false)

  useEffect(() => {
    // Fetch data sources from the server on mount
    getDataSources().then(setDataSources)
  }, [])

  const handleAdd = async (e: FormEvent) => {
    e.preventDefault()
    const newDs = await createDataSource({ name: form.name, type: form.type })
    setForm({ name: '', type: 'JSON' })
    setOpen(false)
    // 跳转到新建数据源的编辑页面
    if (newDs && newDs.id) {
      router.push(`/data-source/${newDs.id}/edit`)
      return
    }
    // 刷新列表（兜底）
    startTransition(() => {
      getDataSources().then(setDataSources)
    })
  }

  const handleDelete = async (id: string) => {
    setDeleteLoading(true)
    await deleteDataSource(id)
    setDeleteId(null)
    setDeleteLoading(false)
    startTransition(() => {
      getDataSources().then(setDataSources)
    })
  }

  const openEditName = (ds: any) => {
    router.push(`/data-source/${ds.id}/edit`)
  }

  return (
    <MainLayout title={t('list')}>
      <div className="flex flex-wrap gap-4">
        <Card className="p-0 flex-1 shadow-sm rounded-md">
          <div className="flex justify-between items-center mb-4 p-6 pb-0">
            <h1 className="text-lg font-semibold">{t('title')}</h1>
            <Button size={'sm'} onClick={() => setOpen(true)}>
              <Plus className="w-4 h-4 mr-1" />
              {tCommon('add')}
            </Button>
          </div>
          <div className="p-6 pt-0">
            {dataSources.length === 0 ? (
              <div className="text-gray-500">{t('empty')}</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{tCommon('type')}</TableHead>
                    <TableHead>{tCommon('name')}</TableHead>
                    <TableHead className="text-right">{tCommon('actions')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dataSources.map((ds) => (
                    <TableRow key={ds.id}>
                      <TableCell>
                        <Badge variant="outline">{ds.type}</Badge>
                      </TableCell>
                      <TableCell className="font-medium">{ds.name}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button size="sm" variant="outline" onClick={() => openEditName(ds)}>
                            <Pencil className="w-4 h-4" />
                            <span className="sr-only">{tCommon('edit')}</span>
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => setDeleteId(ds.id!)}
                          >
                            <Trash2 className="w-4 h-4" />
                            <span className="sr-only">{tCommon('delete')}</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </Card>
        <DataDict />
      </div>
      <DataSourceAddDialog
        open={open}
        setOpen={setOpen}
        form={form}
        setForm={setForm}
        handleAdd={handleAdd}
        tCommon={tCommon}
      />
      <ConfirmDeleteDialog
        open={!!deleteId}
        setOpen={(open) => !open && setDeleteId(null)}
        loading={deleteLoading}
        onConfirm={() => deleteId && handleDelete(deleteId)}
        title={tCommon('delete')}
        description={t('deleteConfirm')}
        confirmText={tCommon('delete')}
        cancelText={tCommon('cancel')}
      />
    </MainLayout>
  )
}
