import { getDataSourceById } from '@/repository/datasource'
import MainLayout from '../../../../layouts/main-layout'
import { getTranslations } from 'next-intl/server'
import { convertRowKeysToSchemaFields } from '@/repository/schema'
import { DataSourceSchema } from '@/types/datasource-schema'
import EditDsPageClient from '@/components/data-source/edit-ds-page-client'

export default async function EditDataSourcePage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>
}) {
  const { id, locale } = await params

  let [ds, t, tCommon] = await Promise.all([
    getDataSourceById(id),
    getTranslations({ locale, namespace: 'DataSource' }),
    getTranslations({ locale, namespace: 'Common' }),
  ])

  let initialSchema: DataSourceSchema = { fields: [] }
  try {
    const raw: any = ds.schema
    if (raw?.fields.length > 0 && raw.fields[0].id) initialSchema = raw
    else initialSchema = { fields: convertRowKeysToSchemaFields(raw?.fields || []) }
  } catch {
    initialSchema = { fields: [] }
  }

  return (
    <MainLayout title={tCommon('edit')}>
      <EditDsPageClient ds={ds} initialSchema={initialSchema} />
    </MainLayout>
  )
}
