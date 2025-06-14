"use server";

import { PrismaClient } from '@/generated/prisma';
import { DataSourceType, DataSourceSchema } from '@/types/datasource-schema'

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

export async function createDataSource({ name, type }: { name: string; type: string }): Promise<DataSourceType> {
  // config is left empty for now, can be extended for other types
  return DataSourceSchema.parse(await prisma.dataSource.create({
    data: {
      name,
      type,
      config: {},
      schema: {
        fields: []
      }
    },
  }));
}

export async function getDataSources(): Promise<DataSourceType[]> {
  const result = await prisma.dataSource.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return result.map((item: any) => DataSourceSchema.parse(item));
}

export async function deleteDataSource(id: string): Promise<DataSourceType> {
  return DataSourceSchema.parse(await prisma.dataSource.delete({ where: { id } }));
}

export async function updateDataSourceConfig(id: string, config: any): Promise<DataSourceType> {
  return DataSourceSchema.parse(await prisma.dataSource.update({
    where: { id },
    data: { config },
  }));
}

export async function updateDataSourceSchema(id: string, schema: DataSourceSchema): Promise<DataSourceType> {
  return DataSourceSchema.parse(await prisma.dataSource.update({
    where: { id },
    data: { schema },
  }));
}

export async function getDataSourceById(id: string): Promise<DataSourceType> {
  return DataSourceSchema.parse(await prisma.dataSource.findUnique({
    where: { id },
  }));
}

