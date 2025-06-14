"use client";
import React from "react";
import { Card } from "@/components/ui/card";

export default function SampleDataCard({ sample }: { sample: any }) {
  if (!sample) return null;
  return (
    <Card className=" p-4 bg-gray-50 flex-1 min-h-[180px] flex flex-col justify-start">
      <div className="font-semibold mb-2">Sample Data</div>
      <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto max-h-40 flex-1">{JSON.stringify(sample, null, 2)}</pre>
    </Card>
  );
}

