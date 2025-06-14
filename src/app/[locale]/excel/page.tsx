"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TableDesign } from "@/types/table-design";
import { getTableDesigns, deleteTableDesign } from '@/repository/table-design';
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function TableDesignListPage() {
  const [designs, setDesigns] = useState<TableDesign[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  async function refresh() {
    setLoading(true);
    try {
      const data = await getTableDesigns();
      setDesigns(data.items || []);
    } catch (e) {
      setDesigns([]);
    }
    setLoading(false);
  }

  useEffect(() => { refresh(); }, []);

  async function handleDelete(id: string) {
    setDeleting(true);
    try {
      await deleteTableDesign(id);
      toast.success('删除成功');
      setDeleteId(null);
      refresh();
    } catch {
      toast.error('删除失败');
    }
    setDeleting(false);
  }

  if (loading) return <div>加载中...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">所有表格设计</h1>
        <Button onClick={() => router.push('./excel/designer')}>+ 新增表格设计</Button>
      </div>
      <div className="grid gap-4">
        {designs.length === 0 && <div>暂无数据</div>}
        {designs.map((design) => (
          <Card key={design.id} className="relative group border border-gray-200 hover:shadow-lg transition">
            <div className="absolute right-4 top-4 flex gap-2 opacity-0 group-hover:opacity-100 transition">
              <Button size="sm" variant="outline" onClick={() => router.push(`./excel/designer?id=${design.id}`)}>编辑</Button>
              <Button size="sm" variant="destructive" onClick={() => setDeleteId(design.id!)}>删除</Button>
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">{design.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-muted-foreground">ID: {design.id}</div>
                  <div className="text-xs text-muted-foreground">数据源: {design.dataSourceId}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Dialog open={!!deleteId} onOpenChange={open => !open && setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>确认删除</DialogTitle>
            <DialogDescription>确定要删除该表格设计吗？此操作不可撤销。</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setDeleteId(null)}>取消</Button>
            <Button variant="destructive" disabled={deleting} onClick={() => deleteId && handleDelete(deleteId)}>删除</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

