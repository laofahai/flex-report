import { DataSourceType } from '@/types/datasource-schema'
import { getDataSourceById } from '@/repository/datasource'

export interface FetchJsonDataProps {
  datasource?: DataSourceType;
  datasourceId?: string;
  page?: number;
  pageSize?: number;
}

export const fetchJsonData = async (options: FetchJsonDataProps): Promise<Record<string, any>> => {
  let {datasource, datasourceId} = options;
  if (!datasource && !datasourceId) {
    throw new Error('DatasourceId must be provided');
  }

  if (!datasource) {
    datasource = await getDataSourceById(datasourceId!);
  }

  return null;

}