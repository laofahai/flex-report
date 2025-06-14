"use server";

import { PrismaClient } from '@/generated/prisma';
import { DataDictItem } from '@/types/datasource-schema';

const prisma = new PrismaClient();

export async function getDictionaries() {
  return prisma.dataDict.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

export async function getDictionary(id: string) {
  return prisma.dataDict.findUnique({
    where: { id },
  });
}

export async function createDictionary(name: string, items: DataDictItem[]) {
  return prisma.dataDict.create({
    data: {
      name,
      items,
    },
  });
}

export async function updateDictionary(id: string, name: string, items: DataDictItem[]) {
  return prisma.dataDict.update({
    where: { id },
    data: {
      name,
      items,
    },
  });
}

export async function deleteDictionary(id: string) {
  return prisma.dataDict.delete({ where: { id } });
}
