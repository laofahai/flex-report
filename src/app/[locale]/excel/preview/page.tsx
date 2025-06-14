'use client'

import Preview from '@/components/excel-designer/preview'
import { useSearchParams } from 'next/navigation'

export default function PreviewPage() {
  const searchParams = useSearchParams();

  return (
    <Preview tableDesignId={searchParams.get("id")!}/>
  );
}