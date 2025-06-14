import { NextRequest, NextResponse } from 'next/server'
import { exportExcelTable } from '@/lib/excel-table-export'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const tableDesignId = searchParams.get('tableDesignId')
  if (!tableDesignId) {
    return NextResponse.json({ error: '缺少 tableDesignId 参数' }, { status: 400 })
  }
  try {
    const buffer = await exportExcelTable(tableDesignId)
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="export.xlsx"`,
      },
    })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || '导出失败' }, { status: 500 })
  }
}
