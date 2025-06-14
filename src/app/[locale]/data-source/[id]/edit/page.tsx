import { getDataSourceById, getDataSources } from '@/repository/datasource'
import { notFound } from 'next/navigation'
import JsonConfig from '../../config/json/json-config'
import MainLayout from '../../../../layouts/main-layout'

export default async function EditDataSourcePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const ds = await getDataSourceById(id)

  let content = null
  if (ds.type === 'JSON') {
    content = <JsonConfig dataSource={ds} />
  } else if (ds.type === 'MySQL') {
    content = <div>MySQL Data Source Config Page (ID: {ds.id})</div>
  } else {
    content = <div>Unsupported data source type: {ds.type}</div>
  }

  return (
    <MainLayout>
      <h1 className="text-2xl font-bold ">Edit Data Source: {ds.name}</h1>
      {content}
    </MainLayout>
  )
}
