'use client'

import Preview from '@/components/excel-designer/preview'
import { useSearchParams } from 'next/navigation'
import MainLayout from '../../../layouts/main-layout'

export default function ExcelPreviewPage() {
  const searchParams = useSearchParams()

  return (
    <MainLayout>
      <Preview tableDesignId={searchParams.get('id')!} />
    </MainLayout>
  )
}
