"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { z } from "zod";

export const jsonConfigSchema = z.object({
  url: z.string().url({ message: "Must be a valid URL" }),
  totalItemsField: z.string().min(1, "Required"),
  itemsField: z.string().min(1, "Required"),
  pageField: z.string().optional(),
  pageSizeField: z.string().optional(),
  currentPageField: z.string().optional(),
});

export type JsonConfigForm = z.infer<typeof jsonConfigSchema>;

export default function JsonConfigForm({
  defaultValues,
  onSubmit,
  isSubmitting,
  isSubmitSuccessful,
  errors,
}: {
  defaultValues: JsonConfigForm;
  onSubmit: (values: JsonConfigForm) => void;
  isSubmitting: boolean;
  isSubmitSuccessful: boolean;
  errors: any;
}) {
  const { register, handleSubmit, formState } = useForm<JsonConfigForm>({
    resolver: zodResolver(jsonConfigSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-xs font-medium mb-1 text-gray-700">JSON URL</label>
        <Input {...register("url")}
          placeholder="https://api.example.com/data"
          className="w-full"
        />
        {errors.url && <span className="text-red-500 text-xs">{errors.url.message}</span>}
      </div>
      <div>
        <label className="block text-xs font-medium mb-1 text-gray-700">Total Items Field</label>
        <Input {...register("totalItemsField")}
          placeholder="data.totalItems"
          className="w-full"
        />
        {errors.totalItemsField && <span className="text-red-500 text-xs">{errors.totalItemsField.message}</span>}
      </div>
      <div>
        <label className="block text-xs font-medium mb-1 text-gray-700">Items Field</label>
        <Input {...register("itemsField")}
          placeholder="data.list"
          className="w-full"
        />
        {errors.itemsField && <span className="text-red-500 text-xs">{errors.itemsField.message}</span>}
      </div>
      <div>
        <label className="block text-xs font-medium mb-1 text-gray-700">Page Size Field</label>
        <Input {...register("pageSizeField")}
          placeholder="pageSize"
          className="w-full"
        />
      </div>
      <div>
        <label className="block text-xs font-medium mb-1 text-gray-700">Current Page Field</label>
        <Input {...register("currentPageField")}
          placeholder="currentPage"
          className="w-full"
        />
      </div>
      <div className="flex items-center gap-2 mt-2">
        <Button type="submit" disabled={isSubmitting} className="px-6 py-2">
          {isSubmitting ? "Saving..." : "Save"}
        </Button>
        {isSubmitSuccessful && (
          <div className="flex items-center gap-1 text-green-600 text-xs bg-green-50 px-2 py-1 rounded shadow-sm animate-fade-in">
            <CheckCircle2 className="w-4 h-4" />
            <span>Saved</span>
          </div>
        )}
      </div>
    </form>
  );
}

