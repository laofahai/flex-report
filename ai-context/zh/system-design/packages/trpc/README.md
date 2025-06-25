# @linch-kit/trpc

> **API层包** | **P1优先级** | **依赖**: core, schema, auth, crud

## 🎯 包概览

@linch-kit/trpc 提供端到端类型安全的API层，支持自动路由生成、中间件生态、实时订阅等企业级特性。

### 核心功能
- **端到端类型安全**: 基于Schema的完全类型推导
- **自动路由生成**: 从CRUD定义自动生成tRPC路由
- **中间件生态**: 认证、权限、缓存、限流等中间件
- **实时通信**: WebSocket支持和实时数据订阅
- **批量操作**: 请求批处理和优化传输
- **错误处理**: 结构化错误响应和客户端处理

### 技术特色
- 基于tRPC v11的现代化API设计
- 完整的权限集成和数据过滤
- 高性能的查询优化和缓存
- 企业级监控和可观测性

## 📁 文档导航

> **状态**: 🔄 待完善 - 原始文档已备份为 [trpc.md.backup](../trpc.md.backup)

| 文档 | 状态 | 描述 |
|------|------|------|
| [API参考](./api-reference.md) | ⏳ 待创建 | tRPC路由和中间件API |
| [实现指南](./implementation-guide.md) | ⏳ 待创建 | 路由生成和类型推导 |
| [集成示例](./integration-examples.md) | ⏳ 待创建 | 客户端集成和使用模式 |
| [高级特性](./advanced-features.md) | ⏳ 待创建 | 实时通信和性能优化 |

## 🚀 快速开始

```typescript
import { createTRPCRouter } from '@linch-kit/trpc'
import { userRouter } from './routers/user'

// 创建API路由
export const appRouter = createTRPCRouter({
  user: userRouter,
  // 自动生成的CRUD路由
  ...generateCrudRouters(schemas)
})

export type AppRouter = typeof appRouter
```

## 📋 临时参考

在详细文档完善之前，请参考原始设计文档：[trpc.md.backup](../trpc.md.backup)