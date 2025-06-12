"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react";

// TableRow and TableCell types for the designer
interface TableCell {
  id: string;
  value: string;
  colSpan?: number;
  rowSpan?: number;
  grouped?: string[];
}

interface TableRow {
  id: string;
  type: "normal" | "traversable";
  mapKey?: string;
  cells: TableCell[];
}

export default function TableDesignerPage() {
  const [rows, setRows] = useState<TableRow[]>([{
    id: crypto.randomUUID(),
    type: "normal",
    cells: [{ id: crypto.randomUUID(), value: "" }],
  }]);

  // Add a new row
  const addRow = (type: "normal" | "traversable") => {
    setRows(r => [
      ...r,
      {
        id: crypto.randomUUID(),
        type,
        mapKey: type === "traversable" ? "items" : undefined,
        cells: [{ id: crypto.randomUUID(), value: "" }],
      },
    ]);
  };

  // Remove a row
  const removeRow = (rowId: string) => {
    setRows(r => r.filter(row => row.id !== rowId));
  };

  // Add a cell to a row
  const addCell = (rowId: string) => {
    setRows(r => r.map(row =>
      row.id === rowId
        ? { ...row, cells: [...row.cells, { id: crypto.randomUUID(), value: "" }] }
        : row
    ));
  };

  // Remove a cell from a row
  const removeCell = (rowId: string, cellId: string) => {
    setRows(r => r.map(row =>
      row.id === rowId
        ? { ...row, cells: row.cells.filter(cell => cell.id !== cellId) }
        : row
    ));
  };

  // Update cell value
  const updateCellValue = (rowId: string, cellId: string, value: string) => {
    setRows(r => r.map(row =>
      row.id === rowId
        ? { ...row, cells: row.cells.map(cell => cell.id === cellId ? { ...cell, value } : cell) }
        : row
    ));
  };

  // Change row type
  const changeRowType = (rowId: string, type: "normal" | "traversable") => {
    setRows(r => r.map(row =>
      row.id === rowId ? { ...row, type, mapKey: type === "traversable" ? "items" : undefined } : row
    ));
  };

  // Change mapKey for traversable row
  const changeMapKey = (rowId: string, mapKey: string) => {
    setRows(r => r.map(row =>
      row.id === rowId ? { ...row, mapKey } : row
    ));
  };

  // Move row up/down
  const moveRow = (rowId: string, direction: "up" | "down") => {
    setRows(r => {
      const idx = r.findIndex(row => row.id === rowId);
      if (idx === -1) return r;
      const newRows = [...r];
      if (direction === "up" && idx > 0) {
        [newRows[idx - 1], newRows[idx]] = [newRows[idx], newRows[idx - 1]];
      } else if (direction === "down" && idx < r.length - 1) {
        [newRows[idx], newRows[idx + 1]] = [newRows[idx + 1], newRows[idx]];
      }
      return newRows;
    });
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Table Designer</h1>
      <div className="flex gap-2 mb-4">
        <Button onClick={() => addRow("normal")}>Add Normal Row</Button>
        <Button variant="outline" onClick={() => addRow("traversable")}>Add Traversable Row</Button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm bg-white rounded shadow">
          <tbody>
            {rows.map((row, rowIdx) => (
              <tr key={row.id} className="border-b align-top">
                <td className="p-2 align-top bg-gray-50">
                  <div className="flex flex-col gap-2">
                    <select
                      className="border rounded px-2 py-1 text-xs"
                      value={row.type}
                      onChange={e => changeRowType(row.id, e.target.value as any)}
                    >
                      <option value="normal">Normal</option>
                      <option value="traversable">Traversable</option>
                    </select>
                    {row.type === "traversable" && (
                      <Input
                        value={row.mapKey || ""}
                        onChange={e => changeMapKey(row.id, e.target.value)}
                        placeholder="map key (e.g. items)"
                        className="text-xs"
                      />
                    )}
                    <div className="flex gap-1 mt-2">
                      <Button size="icon" variant="ghost" onClick={() => moveRow(row.id, "up")}
                        disabled={rowIdx === 0}><ArrowUp className="w-4 h-4" /></Button>
                      <Button size="icon" variant="ghost" onClick={() => moveRow(row.id, "down")}
                        disabled={rowIdx === rows.length - 1}><ArrowDown className="w-4 h-4" /></Button>
                      <Button size="icon" variant="destructive" onClick={() => removeRow(row.id)}><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </div>
                </td>
                {row.cells.map((cell, cellIdx) => (
                  <td key={cell.id} className="p-2 border-l">
                    <div className="flex flex-col gap-1">
                      <Input
                        value={cell.value}
                        onChange={e => updateCellValue(row.id, cell.id, e.target.value)}
                        placeholder={`Cell ${cellIdx + 1}`}
                        className="text-xs"
                      />
                      <div className="flex gap-1 mt-1">
                        <Button size="icon" variant="ghost" onClick={() => removeCell(row.id, cell.id)} disabled={row.cells.length === 1}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </td>
                ))}
                <td className="p-2 align-top">
                  <Button size="icon" variant="outline" onClick={() => addCell(row.id)}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

