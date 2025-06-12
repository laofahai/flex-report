"use server";

import { PrismaClient } from '@/generated/prisma';

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

export async function createDataSource({ name, type }: { name: string; type: string }) {
  // config is left empty for now, can be extended for other types
  return prisma.dataSource.create({
    data: {
      name,
      type,
      config: '',
    },
  })
}

export async function getDataSources() {
  return prisma.dataSource.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

export async function deleteDataSource(id: string) {
  return prisma.dataSource.delete({ where: { id } });
}

export async function updateDataSourceConfig(id: string, config: any) {
  return prisma.dataSource.update({
    where: { id },
    data: { config: JSON.stringify(config) },
  });
}

export async function updateDataSourceSchema(id: string, schema: any) {
  return prisma.dataSource.update({
    where: { id },
    data: { schema: JSON.stringify(schema) },
  });
}
