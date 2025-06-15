'use client'
import React, { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog'

export default function SampleDataCard({
  sample,
  onUpdateSchema,
}: {
  sample: any
  onUpdateSchema?: () => void
}) {
  const [dialogOpen, setDialogOpen] = useState(false)
  if (!sample) return null
  return (
    <Card className=" p-4 bg-gray-50 flex-1 min-h-[180px] flex flex-col justify-start">
      <div className="flex items-center justify-between mb-2">
        <div className="font-semibold">Sample Data</div>
        {onUpdateSchema && (
          <>
            <Button size="sm" variant="outline" onClick={() => setDialogOpen(true)}>
              更新到字段
            </Button>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>更新字段确认</DialogTitle>
                </DialogHeader>
                <div className="text-sm text-gray-600 mb-4">是否用样例数据更新字段？</div>
                <DialogFooter>
                  <Button variant="secondary" onClick={() => setDialogOpen(false)}>
                    取消
                  </Button>
                  <Button
                    onClick={() => {
                      setDialogOpen(false)
                      onUpdateSchema()
                    }}
                  >
                    确认
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>
      <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto min-h-40 flex-1">
        {JSON.stringify(sample, null, 2)}
      </pre>
    </Card>
  )
}
