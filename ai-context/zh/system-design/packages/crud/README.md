# @linch-kit/crud

> **CRUD操作包** | **P1优先级** | **依赖**: core, schema, auth

## 🎯 包概览

@linch-kit/crud 提供类型安全的CRUD操作，支持复杂查询、权限集成、事务管理、缓存优化等企业级特性。

### 核心功能
- **类型安全CRUD**: 基于Schema的完全类型安全操作
- **权限集成**: 自动权限检查和数据过滤
- **复杂查询**: 支持过滤、排序、分页、聚合
- **事务管理**: 支持复杂事务和分布式事务
- **缓存优化**: 智能缓存和失效策略
- **审计日志**: 完整的数据变更追踪

### 技术特色
- Schema驱动的自动CRUD生成
- 细粒度的权限控制
- 高性能查询优化
- 企业级数据安全

## 📁 文档导航

| 文档 | 描述 |
|------|------|
| [API参考](./api-reference.md) | CRUD操作API |
| [实现指南](./implementation-guide.md) | 查询引擎和权限集成 |
| [集成示例](./integration-examples.md) | 使用示例和模式 |
| [高级特性](./advanced-features.md) | 事务、缓存、性能优化 |

## 🚀 快速开始

```typescript
import { CrudManager, QueryBuilder } from '@linch-kit/crud'

// 基础CRUD操作
const user = await CrudManager.create('User', {
  name: 'John Doe',
  email: 'john@example.com'
})

// 复杂查询
const users = await QueryBuilder
  .from('User')
  .where('age', '>', 18)
  .orderBy('createdAt', 'desc')
  .paginate(1, 20)
  .execute()
```