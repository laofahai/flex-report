"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TableDesign } from "@/types/table-design";
import { getTableDesigns } from '@/controller/tableDesign'

export default function TableDesignListPage() {
  const [designs, setDesigns] = useState<TableDesign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDesigns() {
      setLoading(true);
      try {
        const data = await getTableDesigns();
        setDesigns(data.items || []);
      } catch (e) {
        setDesigns([]);
      }
      setLoading(false);
    }
    fetchDesigns();
  }, []);

  if (loading) return <div>加载中...</div>;

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">所有表格设计</h1>
      <div className="grid gap-4">
        {designs.length === 0 && <div>暂无数据</div>}
        {designs.map((design) => (
          <Card key={design.id}>
            <CardHeader>
              <CardTitle>{design.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-muted-foreground">ID: {design.id}</div>
                  <div className="text-xs text-muted-foreground">数据源: {design.dataSourceId}</div>
                </div>
                <Link href={`./excel/designer?id=${design.id}`}>
                  <Button size="sm" variant="outline">编辑</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

