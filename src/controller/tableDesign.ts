"use server";

import { PrismaClient } from '@/generated/prisma';
import { TableDesign, TableDesignSchema } from '@/types/table-design'
import { Pagination } from '@/types/common'

let prisma: PrismaClient;
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  // @ts-ignore
  if (!global.prisma) {
    // @ts-ignore
    global.prisma = new PrismaClient();
  }
  // @ts-ignore
  prisma = global.prisma;
}

export async function getTableDesignById(id: string): Promise<TableDesign | null> {
  const data = await prisma.tableDesign.findUnique({ where: { id } });
  if (!data) return null;
  return TableDesignSchema.parse({
    ...data,
    schema: {
      ...(data.schema || {}),
      columns: data.schema?.columns || []
    },
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt),
  });
}

export async function createTableDesign({ name, dataSourceId, schema }: TableDesign): Promise<TableDesign> {
  const data = await prisma.tableDesign.create({
    data: {
      name,
      dataSourceId,
      schema,
    },
  });
  return TableDesignSchema.parse({
    ...data,
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt),
  });
}

export async function updateTableDesign({ id, name, dataSourceId, schema }: TableDesign) {
  const data = await prisma.tableDesign.update({
    where: { id },
    data: {
      ...(name !== undefined ? { name } : {}),
      ...(dataSourceId !== undefined ? { dataSourceId } : {}),
      ...(schema !== undefined ? { schema } : {}),
    },
  });
  return {
    ...data,
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt),
  };
}

export async function deleteTableDesign(id: string) {
  const data = await prisma.tableDesign.delete({ where: { id } });
  return {
    ...data,
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt),
  };
}

export async function getTableDesigns({ page = 1, pageSize = 20 }: { page?: number; pageSize?: number } = {}): Promise<Pagination<TableDesign>> {
  const skip = (page - 1) * pageSize;
  const [items, total] = await Promise.all([
    prisma.tableDesign.findMany({
      skip,
      take: pageSize,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.tableDesign.count(),
  ]);
  const parsedItems = items.map(item => {
    return TableDesignSchema.parse({
      ...item,
      createdAt: new Date(item.createdAt),
      updatedAt: new Date(item.updatedAt),
    });
  });
  return {
    items: parsedItems,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
}
