# LinchKit 系统架构概览

**版本**: v7.2  
**更新**: 2025-07-07  
**状态**: 完整的 (6+1) 系统架构文档

## 🏗️ 核心架构原则

### 设计哲学

- **稳定优先**: 基于现有 6+1 架构扩展，保持架构稳定性
- **职责明确**: 每个包的扩展都在其职责范围内
- **向后兼容**: 现有功能不受影响，平滑演进
- **配置驱动**: 通过配置控制新功能启用
- **AI 友好**: 架构设计便于 AI 理解和操作

### 依赖层次关系

```
L0: @linch-kit/core      → 基础设施 (日志、配置、插件系统、Extension系统)
  ↓
L1: @linch-kit/auth      → 认证权限 (NextAuth + CASL)
  ↓
L2: @linch-kit/platform  → 业务开发平台 (Schema+CRUD+tRPC+验证)
L2: @linch-kit/ui        → UI组件 (shadcn/ui + 企业组件)
  ↓
L3: extensions/console   → 管理平台Extension (多租户、权限管理)
```

**✅ 最终包架构**:
- **核心4包**: core, auth, platform, ui
- **移除**: packages/crud, packages/trpc (功能已整合到platform)
- **工具包**: tools/schema (开发时代码生成工具)

**核心约束**:

- **严格单向依赖**: 上层可以依赖下层，下层不能依赖上层
- **禁止循环依赖**: 任何包之间不允许循环依赖
- **最小依赖原则**: 每个包只依赖必要的下层包

## 🎯 四层架构设计

### 应用层 (Applications)

```
apps/starter        # 生产级基础应用 - Extension运行时环境
```

**⚠️ 应用架构简化**:
- **保留**: apps/starter (核心应用)
- **移除**: apps/demo-app, apps/website (简化架构)

**应用层特点**:

- **独立部署**: 每个应用可以独立部署和运行
- **功能集成**: 集成多个模块和包提供完整功能
- **用户入口**: 面向最终用户的交互界面

### Extension层 (Extensions)

```
extensions/console  # 企业级管理控制台Extension (已迁移)
extensions/admin    # 管理功能Extension (规划中)
extensions/blog     # 博客系统Extension (开发中)
```

**Extension层特点**:

- **功能库定位**: 通过 npm 包被应用集成使用
- **业务聚合**: 聚合多个包功能实现完整业务流程
- **可选集成**: 应用可以选择性集成所需模块

### 包层 (Packages - 核心6包)

```
@linch-kit/core     # L0: 基础设施包
@linch-kit/schema   # L1: Schema引擎包
@linch-kit/auth     # L2: 认证权限包
@linch-kit/crud     # L2: CRUD操作包
@linch-kit/trpc     # L3: API层包
@linch-kit/ui       # L3: UI组件包
```

**包层特点**:

- **原子功能**: 每个包提供单一领域的原子功能
- **高复用性**: 可以被模块层和应用层复用
- **类型安全**: 完整的 TypeScript 类型支持

### 基础设施层 (Infrastructure)

```
数据库: PostgreSQL + Prisma
认证: NextAuth.js 5.0
权限: CASL (能力访问控制)
UI: Tailwind CSS 4 + shadcn/ui
AI: Neo4j 知识图谱 + Graph RAG
```

## 📦 核心包详细架构

### L0: @linch-kit/core (基础设施)

**职责**: 提供整个框架的基础设施服务

**核心功能**:

- **日志系统**: 基于 Pino 的结构化日志
- **配置管理**: 类型安全的配置系统
- **插件系统**: 可扩展的插件架构
- **事件系统**: 类型安全的事件总线
- **依赖注入**: 轻量级 DI 容器

```typescript
// 使用示例
import { logger, config, eventBus } from '@linch-kit/core'

logger.info('Application started', { version: config.app.version })
eventBus.emit('user.created', { userId: '123' })
```

### L1: @linch-kit/schema (Schema引擎)

**职责**: Schema 定义、验证和类型生成

**核心功能**:

- **实体定义**: `defineEntity()` API
- **关系定义**: 实体间关系建模
- **类型生成**: 自动生成 TypeScript 类型
- **验证规则**: Zod 验证集成
- **数据库集成**: Prisma Schema 生成

```typescript
// 使用示例
import { defineEntity } from '@linch-kit/schema'

export const UserSchema = defineEntity('User', {
  id: z.string().uuid(),
  name: z.string().min(1),
  email: z.string().email(),
  role: z.enum(['USER', 'ADMIN']),
})
```

### L2: @linch-kit/auth (认证权限)

**职责**: 用户认证和权限管理

**核心功能**:

- **认证集成**: NextAuth.js 5.0 集成
- **权限控制**: CASL 能力访问控制
- **会话管理**: 类型安全的会话处理
- **多租户**: 租户级别的权限隔离
- **角色管理**: RBAC 角色权限模型

```typescript
// 使用示例
import { requireAuth, can } from '@linch-kit/auth'

const user = await requireAuth(request)
if (can(user, 'read', 'User')) {
  // 用户有读取用户的权限
}
```

### L2: @linch-kit/crud (CRUD操作)

**职责**: 通用的增删改查操作

**核心功能**:

- **类型安全 CRUD**: 基于 Schema 的 CRUD 操作
- **权限集成**: 与 @linch-kit/auth 深度集成
- **查询构建**: 类型安全的查询 API
- **数据验证**: 自动数据验证和清理
- **关系处理**: 复杂关系的 CRUD 支持

```typescript
// 使用示例
import { createCRUD } from '@linch-kit/crud'

const userCRUD = createCRUD(UserSchema)
const user = await userCRUD.create({ name: 'John', email: 'john@example.com' })
```

### L3: @linch-kit/trpc (API层)

**职责**: 端到端类型安全的 API

**核心功能**:

- **tRPC 集成**: 完整的 tRPC 服务器和客户端
- **类型安全**: 编译时类型检查
- **中间件系统**: 认证、权限、日志中间件
- **错误处理**: 统一的错误处理机制
- **API 生成**: 基于 Schema 自动生成 API

```typescript
// 使用示例
import { createRouter } from '@linch-kit/trpc'

export const userRouter = createRouter().query('getUser', {
  input: z.string(),
  resolve: async ({ input, ctx }) => {
    return await ctx.db.user.findUnique({ where: { id: input } })
  },
})
```

### L3: @linch-kit/ui (UI组件)

**职责**: 可复用的 UI 组件库

**核心功能**:

- **shadcn/ui 集成**: 现代 UI 组件库
- **主题系统**: Tailwind CSS 4 主题支持
- **表单组件**: 基于 Schema 的表单生成
- **数据展示**: 表格、列表等数据组件
- **企业组件**: 复杂的企业级 UI 组件

```typescript
// 使用示例
import { Button, Form, DataTable } from '@linch-kit/ui'

<Form schema={UserSchema} onSubmit={handleSubmit} />
<DataTable data={users} columns={userColumns} />
```

### L4: modules/console (管理平台)

**职责**: 企业级管理控制台

**核心功能**:

- **多租户管理**: 租户创建、配置、监控
- **用户权限管理**: 用户、角色、权限管理界面
- **系统监控**: 系统状态、性能监控
- **审计日志**: 操作日志查看和分析
- **可嵌入设计**: 可以被应用层集成

## 🔄 数据流架构

### 请求处理流程

```
用户请求 → Next.js Router → tRPC Handler → 权限检查 → CRUD 操作 → 数据库
                ↑              ↑           ↑         ↑          ↑
            @linch-kit/ui  @linch-kit/trpc  @linch-kit/auth  @linch-kit/crud  @linch-kit/core
```

### Schema 驱动流程

```
Schema 定义 → 类型生成 → API 生成 → 表单生成 → 验证规则
     ↑          ↑         ↑         ↑         ↑
@linch-kit/schema → @linch-kit/trpc → @linch-kit/ui → 运行时验证
```

## 🧠 AI 集成架构

### Neo4j 知识图谱

```
代码库扫描 → AST 分析 → 图谱构建 → 关系分析 → AI 查询接口
    ↑          ↑         ↑         ↑         ↑
  源代码    语法树   Neo4j 数据库  Graph RAG  AI Session 工具
```

**图谱 Schema**:

- **节点类型**: Package, Function, Class, Interface, Schema
- **关系类型**: CALLS, EXTENDS, IMPLEMENTS, IMPORTS, DEPENDS_ON
- **数据状态**: 5,446+ 节点，7,969+ 关系

### AI Session 工具集成

```
bun run ai:session → 意图识别 → 图谱查询 → 上下文生成 → AI 响应
        ↑              ↑         ↑         ↑         ↑
   命令行接口      NLP 处理   Neo4j 查询   结构化数据   智能建议
```

## 🎯 架构扩展原则

### 水平扩展 (同层扩展)

- **新包**: 在同一层级添加新的包 (如 @linch-kit/analytics)
- **新模块**: 在模块层添加新的业务模块
- **新应用**: 创建新的应用集成现有功能

### 垂直扩展 (功能增强)

- **包内扩展**: 在现有包内增加新功能
- **配置驱动**: 通过配置启用新特性
- **插件机制**: 通过插件系统扩展功能

### 扩展约束

- ✅ **遵循依赖方向**: 新功能不能违反依赖层次
- ✅ **保持职责边界**: 功能添加要符合包的职责定义
- ✅ **向后兼容**: 新功能不能破坏现有 API
- ❌ **禁止循环依赖**: 绝不允许引入循环依赖

## 📊 架构健康指标

### 代码质量指标

- **测试覆盖率**: core >95%, 其他 >80%
- **类型覆盖率**: 100% TypeScript 严格模式
- **构建时间**: 全量构建 <10秒
- **包大小**: 核心包 <50KB gzipped

### 依赖健康指标

- **依赖深度**: 最大依赖层级 ≤4
- **循环依赖**: 0个循环依赖
- **外部依赖**: 最小化第三方依赖
- **安全漏洞**: 0个高危漏洞

### 性能指标

- **API 响应时间**: 平均 <200ms
- **首屏加载**: <3秒
- **构建缓存命中率**: >80%
- **热重载时间**: <1秒

---

**这个架构是 LinchKit 的核心基础，所有开发活动都应该遵循这个架构设计进行。**
