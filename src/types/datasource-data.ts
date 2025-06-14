export interface DatasourceData {
  page: number;
  pageSize: number;
  totalPages: number;
  total: number;
  items: Record<string, any>[]
}