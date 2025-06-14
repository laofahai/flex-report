'use server'

import { PrismaClient } from '@/generated/prisma'
import { DataDictItem } from '@/types/datasource-schema'
import { DataDict, DataDictSchema } from '@/types/dictionary-schema'

const prisma = new PrismaClient()

export async function getDictionaries() {
  return prisma.dataDict.findMany({
    orderBy: { createdAt: 'desc' },
  })
}

export async function getDictionaryByIdIn(ids: string[]): Promise<DataDict[]> {
  const raw = await prisma.dataDict.findMany({
    where: { id: { in: ids } },
  })
  return raw.map((dict) => {
    return DataDictSchema.parse(dict)
  })
}

export async function getDictionary(id: string) {
  return prisma.dataDict.findUnique({
    where: { id },
  })
}

export async function createDictionary(name: string, items: DataDictItem[]) {
  return prisma.dataDict.create({
    data: {
      name,
      items,
    },
  })
}

export async function updateDictionary(id: string, name: string, items: DataDictItem[]) {
  return prisma.dataDict.update({
    where: { id },
    data: {
      name,
      items,
    },
  })
}

export async function deleteDictionary(id: string) {
  return prisma.dataDict.delete({ where: { id } })
}
