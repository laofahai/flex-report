'use client'
// 1. 工具函数区

// 2. 类型定义区
import type { DataSourceSchema } from '@/types/datasource-schema'
import { DataSourceFieldSchemaBase } from '@/types/datasource-schema'

// 3. 组件区
import React, { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { getDictionaries } from '@/repository/dictionary'
import { toast } from 'sonner'
import { useTranslations } from 'next-intl'
import ConfirmDeleteDialog from '@/components/confirm-delete-dialog'
import AddFieldDialog from './add-field-dialog'
import SchemaTable from './schema-table'

interface Props {
  schema: DataSourceSchema
  onFieldChange: (id: string, key: string, value: string) => void
  onSave: () => void
  saving: boolean
  saved: boolean
}

export default function SchemaEditor({ schema, onFieldChange, onSave, saving, saved }: Props) {
  const t = useTranslations('DataSource')
  const tCommon = useTranslations('Common')
  const [expanded, setExpanded] = useState({})
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [deleteRowId, setDeleteRowId] = useState<string | null>(null)
  const [dictionaries, setDictionaries] = useState<{ id: string; name: string }[]>([])
  const [addDialogOpen, setAddDialogOpen] = useState(false)

  const [ready, setReady] = useState(false)

  useEffect(() => {
    getDictionaries().then((data) => {
      setDictionaries(
        data.map((dict: any) => ({
          id: dict.id,
          name: dict.name,
        }))
      )
      setReady(true)
    })
  }, [])

  useEffect(() => {
    if (saved) toast.success(tCommon('saveSuccess'))
  }, [saved])

  // 获取类型选项
  const typeOptions = DataSourceFieldSchemaBase.shape.type.options
  const filterTypeOptions = DataSourceFieldSchemaBase.shape.filterType.unwrap().options

  // 保证 onFieldChange/onDeleteRequest 引用稳定
  const stableOnFieldChange = useCallback(onFieldChange, [])
  const stableOnDeleteRequest = useCallback(
    (id: string) => {
      setDeleteRowId(id)
      setDeleteDialogOpen(true)
    },
    [setDeleteRowId, setDeleteDialogOpen]
  )

  return (
    ready && (
      <>
        <div>
          <div className="font-semibold mb-2 flex justify-between items-center">
            <div>{t('schemaTitle')}</div>
            <div className="flex items-center gap-2">
              <Button type="button" onClick={() => setAddDialogOpen(true)} variant="outline">
                + {t('addField')}
              </Button>
              <Button
                type="button"
                onClick={() => {
                  onSave()
                  toast.info(t('savingSchema'))
                }}
                disabled={saving || schema.fields?.length === 0}
              >
                {saving ? tCommon('saving') : t('saveSchema')}
              </Button>
            </div>
          </div>
          <SchemaTable
            schema={schema}
            onFieldChange={stableOnFieldChange}
            onDeleteRequest={stableOnDeleteRequest}
            dictionaries={dictionaries}
            typeOptions={typeOptions}
            filterTypeOptions={filterTypeOptions}
            expanded={expanded}
            setExpanded={setExpanded}
          />
          <ConfirmDeleteDialog
            open={deleteDialogOpen}
            setOpen={setDeleteDialogOpen}
            onConfirm={() => {
              if (deleteRowId) {
                onFieldChange(deleteRowId, 'delete', '')
                toast.success(t('fieldDeleted'))
              }
              setDeleteRowId(null)
              setDeleteDialogOpen(false)
            }}
            title={t('deleteField')}
            description={t('deleteFieldConfirm')}
          />
          <AddFieldDialog
            open={addDialogOpen}
            setOpen={setAddDialogOpen}
            typeOptions={typeOptions}
            filterTypeOptions={filterTypeOptions}
            schema={schema}
            onFieldChange={onFieldChange}
          />
        </div>
      </>
    )
  )
}
