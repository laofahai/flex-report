"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { FormEvent } from "react";
import { useTranslations } from "next-intl";

interface DataSource {
  id: string;
  name: string;
  type: string;
  config: string;
}

export default function DataSourcePage() {
  const t = useTranslations("DataSource");
  const [dataSources, setDataSources] = useState<DataSource[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", type: "json", config: "" });

  const handleAdd = (e: FormEvent) => {
    e.preventDefault();
    setDataSources([
      ...dataSources,
      {
        id: Date.now().toString(),
        name: form.name,
        type: form.type,
        config: form.config,
      },
    ]);
    setForm({ name: "", type: "json", config: "" });
    setOpen(false);
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">{t("title")}</h1>
        <Button onClick={() => setOpen(true)}>{t("add")}</Button>
      </div>
      <div className="border rounded-md p-4 bg-white">
        {dataSources.length === 0 ? (
          <div className="text-gray-500">{t("empty")}</div>
        ) : (
          <ul>
            {dataSources.map((ds) => (
              <li key={ds.id} className="py-2 border-b last:border-b-0 flex justify-between items-center">
                <div>
                  <div className="font-medium">{ds.name}</div>
                  <div className="text-xs text-gray-500">{t("type")}: {ds.type}</div>
                </div>
                {/* 预留编辑/删除按钮 */}
              </li>
            ))}
          </ul>
        )}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("add")}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAdd} className="space-y-4">
            <Input
              placeholder={t("name")}
              value={form.name}
              onChange={(e: any) => setForm(f => ({ ...f, name: e.target.value }))}
              required
            />
            <Input
              placeholder={t("type") + " (如 json)"}
              value={form.type}
              onChange={(e: any) => setForm(f => ({ ...f, type: e.target.value }))}
              required
            />
            <Input
              placeholder={t("config")}
              value={form.config}
              onChange={(e: any) => setForm(f => ({ ...f, config: e.target.value }))}
              required
            />
            <DialogFooter>
              <Button type="submit">{t("save")}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

