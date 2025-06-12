"use client";
import { useState, useEffect, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { FormEvent } from "react";
import { useTranslations } from "next-intl";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { createDataSource, getDataSources, deleteDataSource } from '@/actions/datasource';
import { Pencil, Trash2 } from "lucide-react";

interface DataSource {
  id: string;
  name: string;
  type: string;
}

export default function DataSourcePage() {
  const t = useTranslations("DataSource");
  const [dataSources, setDataSources] = useState<DataSource[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", type: "JSON" });
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    // Fetch data sources from the server on mount
    getDataSources().then(setDataSources);
  }, []);

  const handleAdd = async (e: FormEvent) => {
    e.preventDefault();
    await createDataSource({ name: form.name, type: form.type });
    setForm({ name: "", type: "JSON" });
    setOpen(false);
    // Refresh the list
    startTransition(() => {
      getDataSources().then(setDataSources);
    });
  };

  const handleDelete = async (id: string) => {
    setDeleteLoading(true);
    await deleteDataSource(id);
    setDeleteId(null);
    setDeleteLoading(false);
    startTransition(() => {
      getDataSources().then(setDataSources);
    });
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
                <div className={"flex flex-col gap-2"}>
                  <div className="font-medium">{ds.name}</div>
                  <div className="text-xs text-gray-500 flex items-center gap-2">
                    <Badge variant="outline">{ds.type}</Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => router.push(`datasource/${ds.id}/edit`)}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => setDeleteId(ds.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
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
            <Select value={form.type} onValueChange={value => setForm(f => ({ ...f, type: value }))}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="JSON">JSON</SelectItem>
                {/* Future types can be added here */}
              </SelectContent>
            </Select>
            <DialogFooter>
              <Button type="submit">{t("save")}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      {/* Delete confirm dialog */}
      <Dialog open={!!deleteId} onOpenChange={open => !open && setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('delete')}</DialogTitle>
          </DialogHeader>
          <div>{t('delete_confirm')}</div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)}>{t('cancel')}</Button>
            <Button variant="destructive" disabled={deleteLoading} onClick={() => deleteId && handleDelete(deleteId)}>
              {deleteLoading ? <span className="animate-spin mr-2 w-4 h-4 border-2 border-t-transparent border-white rounded-full inline-block" /> : null}
              {t('delete')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

