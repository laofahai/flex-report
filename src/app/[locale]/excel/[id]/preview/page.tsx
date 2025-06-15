'use client'

import Preview from '@/components/excel-designer/preview'
import { useParams, useSearchParams } from 'next/navigation'
import MainLayout from '../../../../layouts/main-layout'

export default function ExcelPreviewPage() {
  const params = useParams()

  return (
    <MainLayout>
      <Preview tableDesignId={params.id as string} />
    </MainLayout>
  )
}
