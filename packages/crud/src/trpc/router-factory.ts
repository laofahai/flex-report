/**
 * CRUD Router Factory
 * 避免循环依赖的路由工厂函数
 */

import { z } from 'zod'

// 避免循环依赖的通用类型定义
interface TRPCProcedure {
  input: (schema: z.ZodType) => TRPCProcedure
  query: (handler: (opts: { ctx: Record<string, unknown>; input?: Record<string, unknown> }) => Promise<unknown> | unknown) => unknown
  mutation: (handler: (opts: { ctx: Record<string, unknown>; input?: Record<string, unknown> }) => Promise<unknown> | unknown) => unknown
}

interface TRPCRouterBuilder {
  router: (routes: Record<string, unknown>) => unknown
  protectedProcedure: TRPCProcedure
}

export function createCrudRouter(trpc: TRPCRouterBuilder) {
  const { router, protectedProcedure } = trpc

  return router({
    // 通用查询
    findMany: protectedProcedure
      .input(z.object({
        model: z.string(),
        where: z.record(z.any()).optional(),
        orderBy: z.record(z.any()).optional(),
        take: z.number().optional(),
        skip: z.number().optional()
      }))
      .query(async ({ input, ctx }: any) => {
        // TODO: 集成CRUD管理器
        return []
      }),

    // 通用创建
    create: protectedProcedure
      .input(z.object({
        model: z.string(),
        data: z.record(z.any())
      }))
      .mutation(async ({ input, ctx }: any) => {
        // TODO: 集成CRUD管理器
        return {}
      }),

    // 通用更新  
    update: protectedProcedure
      .input(z.object({
        model: z.string(),
        where: z.record(z.any()),
        data: z.record(z.any())
      }))
      .mutation(async ({ input, ctx }: any) => {
        // TODO: 集成CRUD管理器
        return {}
      }),

    // 通用删除
    delete: protectedProcedure
      .input(z.object({
        model: z.string(),
        where: z.record(z.any())
      }))
      .mutation(async ({ input, ctx }: any) => {
        // TODO: 集成CRUD管理器
        return {}
      }),

    // 统计查询
    count: protectedProcedure
      .input(z.object({
        model: z.string(),
        where: z.record(z.any()).optional()
      }))
      .query(async ({ input, ctx }: any) => {
        // TODO: 集成CRUD管理器
        return 0
      })
  })
}