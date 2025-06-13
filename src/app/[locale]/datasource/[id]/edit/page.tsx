import { getDataSourceById, getDataSources } from '@/controller/datasource'
import { notFound } from 'next/navigation';
import JsonConfig from '../../config/json/json-config';

export default async function DataSourceEditPage({ params }: { params: Promise<{ id: string }> }) {

  const {id} = await params;


  const ds = await getDataSourceById(id);

  let content = null;
  if (ds.type === 'JSON') {
    content = <JsonConfig dataSource={ds} />;
  } else if (ds.type === 'MySQL') {
    content = <div>MySQL Data Source Config Page (ID: {ds.id})</div>;
  } else {
    content = <div>Unsupported data source type: {ds.type}</div>;
  }

  return (
    <>
      <h1 className="text-2xl font-bold ">Edit Data Source: {ds.name}</h1>
      {content}
    </>
  );
}

