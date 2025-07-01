# LinchKit AI 开发助手指导

**版本**: v5.0  
**项目**: LinchKit - AI-First 全栈开发框架
**更新**: 2025-07-01

## ⚠️ 重要：开发前必读

**⚠️ 每个新的开发 session 强制要求：**
1. **设置环境**: `export PATH="/home/laofahai/.nvm/versions/node/v20.19.2/bin:$PATH"`
2. **阅读开发进度**: `ai-context/zh/current/development-status.md` - 了解项目当前状态
3. **理解开发约束**: `ai-context/zh/current/development-constraints.md` - 掌握核心开发规范
4. **完成 Session 检查清单** - 确保环境和约束理解到位

## 🚀 项目概述

LinchKit 是生产就绪的企业级 AI-First 全栈开发框架，采用 Schema 驱动架构，提供端到端类型安全。

### 🎯 核心原则
- **AI-First**: 所有设计都优先考虑 AI 理解和处理能力
- **Schema 驱动**: 以 Zod Schema 为单一数据源，驱动整个系统
- **类型安全**: 端到端 TypeScript 类型安全保障
- **模块化**: 高内聚、低耦合的包设计

### 🏛️ 架构层次
```
L0: @linch-kit/core      ✅ 基础设施 (100%)
L1: @linch-kit/schema    ✅ Schema引擎 (100%)
L2: @linch-kit/auth      ✅ 认证权限 (100%)
L2: @linch-kit/crud      ✅ CRUD操作 (100%)
L3: @linch-kit/trpc      ✅ API层 (100%)
L3: @linch-kit/ui        ✅ UI组件 (100%)
L4: modules/console      ✅ 管理平台 (100%)
L4: @linch-kit/ai        ⏳ AI集成（规划中）
```

## 📚 核心文档

### 必读文档
- **🔄 开发进度**: `ai-context/zh/current/development-status.md` - 项目最新状态和待办事项
- **🔒 开发约束**: `ai-context/zh/current/development-constraints.md` - 核心规范和质量标准
- **🏗️ 模块架构**: `ai-context/zh/current/module-architecture-design.md` - 系统架构设计
- **📖 API参考**: `ai-context/zh/current/packages-api-reference.md` - 包功能速查

### 其他文档
- **历史记录**: `ai-context/zh/archive/development-history-complete.md`
- **AI包设计**: `ai-context/zh/planning/ai-package-design.md`
- **系统架构**: `ai-context/zh/system-design/architecture.md`

## 🛠️ 开发命令

```bash
# 环境设置（每次必须）
export PATH="/home/laofahai/.nvm/versions/node/v20.19.2/bin:$PATH"

# 开发流程
pnpm dev        # 开发模式
pnpm build      # 构建验证
pnpm validate   # 完整验证
```

## 🔒 核心约束

必须严格遵守以下约束（详见 `ai-context/zh/current/development-constraints.md`）：

1. **TypeScript 严格模式** - 禁止使用 `any`，使用 `unknown` 替代
2. **包管理规范** - 仅使用 pnpm，禁止 npm/yarn
3. **架构依赖顺序** - core → schema → auth → crud → trpc → ui → console
4. **功能复用原则** - 必须使用 LinchKit 内部包功能，禁止重复实现
5. **质量标准** - 测试覆盖率 core>90%, 其他>80%，构建时间<10秒

## 💡 AI 开发模式

### 继续开发流程
当用户说"继续开发"或开始新任务时：
1. **必须先阅读** `ai-context/zh/current/development-status.md` - 了解当前进度
2. **理解约束** 参考 `ai-context/zh/current/development-constraints.md`
3. **确定任务** 从开发状态文档中选择下一个任务
4. **实施开发** 严格遵循架构和约束
5. **验证结果** 运行测试和构建
6. **更新文档** 在 development-status.md 中记录进度

### 开发检查清单
- [ ] 已读取最新开发状态？
- [ ] 理解所有开发约束？
- [ ] 使用正确的包功能？
- [ ] 遵循依赖顺序？
- [ ] 通过所有验证？

## 📋 项目状态摘要

**项目成熟度**: 生产就绪（v4.2.0）
**完成度**: 核心功能 100%

### ✅ 已完成功能
- **6个核心包** - 全部完成并经过生产验证
- **Console模块** - 企业级管理平台
- **AI Dashboard** - 数据可视化和智能分析
- **统一工作台** - 基于角色的模块化架构
- **现代UI设计** - shadcn/ui + Tailwind CSS v4

### 🚀 当前特性
- **统一入口** - /dashboard 统一工作台
- **角色权限** - SUPER_ADMIN、TENANT_ADMIN、USER
- **模块化架构** - 系统管理、租户管理、业务应用
- **响应式设计** - 移动端完美适配
- **主题系统** - 明暗主题切换

## 🏗️ 技术架构

### 核心技术栈
- **框架**: Next.js 15.3.4 + React 19
- **语言**: TypeScript 5.8.3（严格模式）
- **样式**: Tailwind CSS 4.x + shadcn/ui
- **API**: tRPC + Zod Schema
- **数据**: Prisma + PostgreSQL
- **认证**: NextAuth + @linch-kit/auth

### 包功能速查
- **@linch-kit/core** - 日志、配置、插件系统
- **@linch-kit/schema** - Schema定义、验证、转换
- **@linch-kit/auth** - 认证、授权、会话管理
- **@linch-kit/crud** - 通用CRUD操作
- **@linch-kit/trpc** - 类型安全API
- **@linch-kit/ui** - UI组件库

## 🔄 下一阶段任务

参见 `ai-context/zh/current/development-status.md` 的 Phase 9 计划：
- 现代化认证界面集成
- @linch-kit/auth 完整集成
- Console 模块认证功能
- 架构合规性重构

## 📖 Context7 文档集成

使用 Context7 查询第三方库文档时：
1. **优先使用 Context7** - 查询 React、Vue、Next.js 等框架的最新文档
2. **调用顺序** - 先用 `resolve-library-id` 获取库ID，再用 `get-library-docs`
3. **文档优先** - 在实现功能前，先查询相关库的官方文档

## ⚠️ 重要开发原则

### 禁止重复实现
**绝对禁止**重新实现 LinchKit 包中已有的功能：
- ❌ 不要自己写日志系统 → 使用 `@linch-kit/core` 的 logger
- ❌ 不要自己写配置管理 → 使用 `@linch-kit/core` 的 ConfigManager
- ❌ 不要自己写Schema验证 → 使用 `@linch-kit/schema`
- ❌ 不要自己写权限检查 → 使用 `@linch-kit/auth`
- ❌ 不要自己写CRUD逻辑 → 使用 `@linch-kit/crud`
- ❌ 不要自己写UI组件 → 使用 `@linch-kit/ui`

### 文件操作原则
- **永远不要**主动创建文档文件（*.md）或 README
- **总是优先**编辑现有文件而不是创建新文件
- **只创建**实现功能绝对必要的文件