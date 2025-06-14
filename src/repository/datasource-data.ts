import { DataSourceType } from '@/types/datasource-schema'
import { getDataSourceById } from '@/repository/datasource'
import { JsonConfigForm } from '@/app/[locale]/datasource/config/json/json-config-form'
import { get } from 'lodash-es'
import { DatasourceData } from '@/types/datasource-data'

export interface FetchJsonDataProps {
  datasource?: DataSourceType;
  datasourceId?: string;
  page?: number;
  pageSize?: number;
  filters?: any[]
}

export const fetchJsonData = async (options: FetchJsonDataProps): Promise<DatasourceData> => {
  let {datasource, datasourceId} = options;
  if (!datasource && !datasourceId) {
    throw new Error('datasourceId or datasource must be provided');
  }

  if (!datasource) {
    datasource = await getDataSourceById(datasourceId!);
  }

  const config = datasource.config as JsonConfigForm;

  // build url
  if (!config.url) {
    throw new Error('Datasource config must have a URL');
  }

  const page = options.page || 1;
  const pageSize = options.pageSize || 20;

  const url = new URL(config.url);
  url.searchParams.set(config.currentPageField || 'page', (page).toString());
  url.searchParams.set(config.pageSizeField || 'pageSize', (pageSize).toString());

  const data = await fetch(url.toString())
  const raw = await data.json();

  const total = config.totalItemsField ? get(raw, config.totalItemsField) : raw?.length;
  const items = config.itemsField ? get(raw, config.itemsField) : raw;

  return {
    page: page,
    pageSize: pageSize,
    totalPages: Math.ceil(total / pageSize),
    total: total,
    items: items || []
  }
}