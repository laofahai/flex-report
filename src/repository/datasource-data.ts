import { DataSourceType } from '@/types/datasource-schema'
import { getDataSourceById } from '@/repository/datasource'
import { get } from 'lodash-es'
import { DatasourceData } from '@/types/datasource-data'

/**
 *
 */
export interface FetchJsonDataProps {
  datasource?: DataSourceType
  datasourceId?: string
  page?: number
  pageSize?: number
  filters?: any[]
  fetchAll?: boolean
  maxRows?: number
  concurrency?: number
}

export const fetchJsonData = async (options: FetchJsonDataProps): Promise<DatasourceData> => {
  let { datasource, datasourceId } = options
  if (!datasource && !datasourceId) {
    throw new Error('datasourceId or data-source must be provided')
  }

  if (!datasource) {
    datasource = await getDataSourceById(datasourceId!)
  }

  const config = datasource.config

  // build url
  if (!config.url) {
    throw new Error('Datasource config must have a URL')
  }

  const page = options.page || 1
  const pageSize = options.pageSize || 20
  const maxRows = options.maxRows || 9999

  const url = new URL(config.url)
  url.searchParams.set(config.currentPageField || 'page', page.toString())
  url.searchParams.set(config.pageSizeField || 'pageSize', pageSize.toString())

  const data = await fetch(url.toString())
  const raw = await data.json()

  let total = config.totalItemsField ? get(raw, config.totalItemsField) : raw?.length
  const items = config.itemsField ? get(raw, config.itemsField) : raw

  if (options.fetchAll) {
    // 已经获取了第一页数据 raw/items
    let total = config.totalItemsField ? get(raw, config.totalItemsField) : raw?.length
    if (total > maxRows) {
      total = maxRows
    }
    const totalPages = Math.ceil(total / pageSize)
    const firstItems = items

    // 分批并发请求剩余所有页
    const concurrency = options.concurrency || 5
    const pageNumbers: number[] = []
    for (let p = 2; p <= totalPages; p++) {
      pageNumbers.push(p)
    }
    let allItems = firstItems || []
    for (let i = 0; i < pageNumbers.length; i += concurrency) {
      const batch = pageNumbers.slice(i, i + concurrency)
      const batchPromises = batch.map((p) => {
        const pageUrl = new URL(config.url)
        pageUrl.searchParams.set(config.currentPageField || 'page', p.toString())
        pageUrl.searchParams.set(config.pageSizeField || 'pageSize', pageSize.toString())
        return fetch(pageUrl.toString()).then((res) => res.json())
      })
      const batchRaws = await Promise.all(batchPromises)
      for (const pageRaw of batchRaws) {
        const pageItems = config.itemsField ? get(pageRaw, config.itemsField) : pageRaw
        allItems = allItems.concat(pageItems || [])
        if (maxRows && allItems.length >= maxRows) {
          allItems = allItems.slice(0, maxRows)
          break
        }
      }
      if (maxRows && allItems.length >= maxRows) {
        break
      }
    }
    return {
      page: 1,
      pageSize: allItems.length,
      totalPages: 1,
      total: total,
      items: allItems,
    }
  }

  return {
    page: page,
    pageSize: pageSize,
    totalPages: Math.ceil(total / pageSize),
    total: total,
    items: items || [],
  }
}
