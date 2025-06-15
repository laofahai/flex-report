'use client'
import { useState, useEffect } from 'react'
import SchemaEditor from '@/app/[locale]/data-source/config/schema-editor'
import { updateDataSourceSchema } from '@/repository/datasource'
import { DataSourceSchema } from '@/types/datasource-schema'

export default function SchemaEditorWrapper({
  schema,
  dataSourceId,
}: {
  schema: DataSourceSchema
  dataSourceId: string
}) {
  const [schemaState, setSchemaState] = useState(schema)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleFieldChange = (id: string, key: string, value: string) => {
    if (key === 'replace') {
      // value 是 JSON.stringify(newSchema)
      try {
        const newSchema = JSON.parse(value)
        setSchemaState(newSchema)
      } catch (e) {
        // ignore
      }
      return
    }
    function update(fields: any[]): any[] {
      let changed = false
      const newFields = fields
        .map((f) => {
          if (f.id === id) {
            if (key === 'delete') {
              changed = true
              return undefined
            }
            if (f[key] === value) return f // 没变直接返回原对象
            changed = true
            return { ...f, [key]: value }
          }
          if (f.children) {
            const updatedChildren = update(f.children)
            if (updatedChildren !== f.children) {
              changed = true
              if (!updatedChildren || updatedChildren.length === 0) {
                const { children, ...rest } = f
                return rest
              }
              return { ...f, children: updatedChildren }
            }
          }
          return f
        })
        .filter(Boolean)
      return changed ? newFields : fields
    }
    setSchemaState((prev) => {
      const newFields = update(prev.fields)
      if (newFields === prev.fields) return prev // 没有实际变动
      return { ...prev, fields: newFields }
    })
  }

  const handleSave = async () => {
    setSaving(true)
    await updateDataSourceSchema(dataSourceId, schemaState)
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 1200)
  }

  // fetchSample 由 JsonConfig 负责

  // 保证外部 schema 变化时同步到内部 state
  useEffect(() => {
    setSchemaState(schema)
  }, [schema])

  return (
    <SchemaEditor
      schema={schemaState}
      onFieldChange={handleFieldChange}
      onSave={handleSave}
      saving={saving}
      saved={saved}
    />
  )
}
