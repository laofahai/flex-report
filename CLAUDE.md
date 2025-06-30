# LinchKit AI 开发助手指导（精简版）

**版本**: v3.0
**项目**: LinchKit - AI-First 全栈开发框架

## 🚀 项目概述

LinchKit 是企业级 AI-First 全栈开发框架，采用 Schema 驱动架构，提供端到端类型安全。

### 🎯 核心原则

- **AI-First**: 所有设计都优先考虑 AI 理解和处理能力
- **Schema 驱动**: 以 Zod Schema 为单一数据源，驱动整个系统
- **类型安全**: 端到端 TypeScript 类型安全保障
- **模块化**: 高内聚、低耦合的包设计
- **可扩展**: 插件化架构支持功能扩展
- **渐进式**: 支持从简单到复杂的渐进式开发

### 🏛️ 设计哲学

- **不重复造轮子**: 优先使用成熟的现有解决方案
- **约定优于配置**: 提供合理的默认配置
- **开发体验优先**: 优化开发者的使用体验
- **生产就绪**: 企业级的性能和可靠性

### 架构层次

```
L0: @linch-kit/core      ✅ 基础设施
L1: @linch-kit/schema    ✅ Schema引擎
L2: @linch-kit/auth      ✅ 认证权限
L2: @linch-kit/crud      ✅ CRUD操作
L3: @linch-kit/trpc      ✅ API层
L3: @linch-kit/ui        🚧 UI组件
L4: @linch-kit/console   ⏳ 管理平台
L4: @linch-kit/ai        ⏳ AI集成
```

## 📚 文档位置

- **当前状态**: `ai-context/zh/current/development-status.md`
- **开发约束**: `ai-context/zh/current/development-constraints.md`
- **模块化架构**: `ai-context/zh/current/module-architecture-design.md`
- **包 API 参考**: `ai-context/zh/current/packages-api-reference.md`
- **Console 设计**: `ai-context/zh/current/console-module-design.md`
- **架构设计**: `ai-context/zh/system-design/architecture.md`
- **决策指南**: `ai-context/zh/current/build-vs-buy-decisions.md`
- **开发历史**: `ai-context/zh/archive/development-history-complete.md`

## 🛠️ 开发命令

```bash
# 环境设置（每次必须）
export PATH="/home/laofahai/.nvm/versions/node/v20.19.2/bin:$PATH"

# 开发流程
pnpm dev        # 开发模式
pnpm build      # 构建验证
pnpm test       # 测试
pnpm validate   # 完整验证
```

## 🔒 核心约束

1. **TypeScript 严格模式**，禁止 `any`
2. **仅使用 pnpm**，禁止 npm/yarn
3. **依赖顺序**: core → schema → auth → crud → trpc → ui → console → ai
4. **必须使用 LinchKit 内部包功能**，禁止重复实现
5. **优先使用第三方库**，参考决策矩阵
6. **测试覆盖**: core>90%, 其他>80%
7. **构建时间**: <10秒

📋 **详细约束**: 参考 `ai-context/zh/current/development-constraints.md`  
🎯 **决策指南**: 参考 `ai-context/zh/current/build-vs-buy-decisions.md`

## 🎯 开发工作流

1. 查看 `ai-context/zh/current/development-status.md`
2. 按架构层次顺序开发
3. 严格遵循 `ai-context/zh/current/development-constraints.md`
4. 运行验证命令
5. 在 starter-app 中验证
6. 更新进度文档

## 💡 AI 开发模式

当用户说"继续开发"时：

1. 读取 `ai-context/zh/current/development-status.md`
2. 确定下一个开发任务
3. 参考 `ai-context/zh/system-design/architecture.md`
4. 严格遵循 `ai-context/zh/current/development-constraints.md`
5. 实施并验证
6. 更新进度文档

## 📋 当前状态（2025-06-28）

- ✅ Phase 1-3 完成：6个核心包已完成 (core, schema, auth, crud, trpc, ui)
- 🚧 Console 模块开发中：企业级管理平台 (`/modules/console`)
- ⏳ Phase 4 待开始：AI 集成包和生产级 Starter

## 🎯 下一步任务

**Console 模块开发** - 企业级管理控制台主模块

- 📁 位置: `/modules/console` (独立 npm 包)
- 🎯 功能: 多租户管理、权限控制、插件市场、系统监控
- 🔗 集成: 使用所有 packages/\* 包，不重复实现功能
- 📦 使用: Starter 引用 Console，提供路由和界面，布局由 Starter 实现

## 🏗️ 模块化架构

```
apps/starter (应用层)    - 布局、环境配置、Prisma 生成
modules/console (模块层) - 核心管理功能、路由、界面
packages/* (包层)       - 基础功能库、不可重复实现
plugins/* (插件层)      - 功能扩展、可选安装
```

## 🔗 集成模式

### 插件注册

```typescript
import { PluginSystem } from '@linch-kit/core'

const plugin = {
  id: 'my-plugin',
  setup: async config => {
    // 插件初始化逻辑
  },
}

await PluginSystem.register(plugin)
```

### 事件通信

```typescript
import { EventBus } from '@linch-kit/core'

// 发布事件
EventBus.emit('user.created', { userId: '123' })

// 监听事件
EventBus.on('user.created', data => {
  // 处理用户创建事件
})
```

### tRPC路由集成

```typescript
import { createTRPCRouter } from '@linch-kit/trpc'
import { authRouter } from '@linch-kit/auth'
import { crudRouter } from '@linch-kit/crud'

export const appRouter = createTRPCRouter({
  auth: authRouter,
  crud: crudRouter,
})
```

## 🧪 测试标准

### 覆盖率要求

- @linch-kit/core: > 90%
- @linch-kit/schema: > 85%
- @linch-kit/auth: > 85%
- @linch-kit/crud: > 85%
- @linch-kit/trpc: > 80%
- @linch-kit/ui: > 80%

### 测试模式

```typescript
// 单元测试 (70%)
import { describe, it, expect } from 'vitest'

describe('ComponentName', () => {
  it('should handle basic functionality', () => {
    // 测试核心逻辑
  })
})

// 集成测试 (25%)
describe('Package Integration', () => {
  it('should integrate with auth correctly', () => {
    // 测试跨包集成
  })
})
```

## 📏 TypeScript 约定

### 基础工具类型

```typescript
export type Result<T, E = Error> = { success: true; data: T } | { success: false; error: E }

export type AsyncResult<T, E = Error> = Promise<Result<T, E>>

export interface BaseConfig {
  readonly id: string
  readonly version: string
  readonly enabled: boolean
}
```

### 错误处理模式

```typescript
export abstract class LinchKitError extends Error {
  abstract readonly code: string
  abstract readonly category: 'validation' | 'runtime' | 'config'
}
```

## Gemini CLI 协作指南

### 目的

当用户指示**"与Gemini商讨后推进"**（或同义词）时，Claude将与**Gemini CLI**协作推进后续任务。
直接展示从Gemini获得的回答，并加上Claude自身的解说·整合，从而融合两个AI代理的知识见解。

---

### 触发条件

- 正则表达式: `/Gemini.*商讨.*一起/` 或 `/Gemini.*探讨/` 或 `/Gemini.*分析/`
- 例如:
  - "和Gemini商讨一起进行"
  - "与Gemini探讨一下这个问题"
  - "让Gemini分析一下这个方案"
  - "请Gemini一起分析这个数据"
  - "和Gemini探讨后再决定"
  - "找Gemini分析下可行性"

---

### 基本流程

1. **PROMPT 生成**
   Claude将用户需求整合为一个文本，存储在环境变量 `$PROMPT` 中。

2. **Gemini CLI 调用**

```bash
gemini <<EOF
$PROMPT
EOF
```
