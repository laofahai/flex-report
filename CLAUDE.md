# LinchKit AI 开发助手指导

**版本**: v4.2.0  
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
- **框架**: Next.js 15.3.4 + React 19.0.0
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

参见 `ai-context/zh/current/development-status.md` 的 Phase 10 计划：
- 基础设施完善
- 增强权限管理系统
- 多租户管理界面
- 实时通知和事件系统

## 📖 Context7 文档集成 - 强制使用规范

**⚠️ 强制要求：每次开发 session 必须强制遵循 Context7 文档查询**

### 🔴 强制触发条件
当遇到以下任何情况时，**必须**使用 Context7 查询文档：
- 用户请求代码示例（code examples）
- 用户询问设置或配置步骤（setup or configuration steps）  
- 用户需要库/API文档（library/API documentation）
- 实现新功能前需要了解第三方库的最佳实践
- 遇到框架相关问题需要查询官方文档

### 📋 Context7 使用流程（强制执行）
1. **识别触发条件** - 判断是否需要查询第三方库文档
2. **调用 resolve-library-id** - 先获取 Context7 兼容的库ID
3. **调用 get-library-docs** - 获取最新官方文档
4. **基于文档实现** - 严格按照官方文档和最佳实践进行开发
5. **文档优先原则** - 在编写代码前必须先查询相关文档

### 🎯 优先查询的库
开发过程中必须优先使用 Context7 查询：
- **Next.js** - 框架配置、路由、API 等
- **React** - Hooks、组件、状态管理等
- **TypeScript** - 类型定义、最佳实践等
- **Tailwind CSS** - 样式配置、组件样式等
- **Prisma** - 数据库操作、Schema 设计等
- **tRPC** - API 设计、类型安全等
- **Zod** - Schema 验证、类型推导等

### ⚠️ 违规处理
- 如果发现没有使用 Context7 查询相关文档就开始实现功能，必须立即停止
- 必须先完成文档查询，了解官方推荐做法后再继续开发
- 所有第三方库的使用都必须符合官方文档的最佳实践

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

## 🤖 AI 助手无法自主遵守的约束 - 强制指导

**⚠️ 以下约束需要用户协助或监督才能遵守：**

### 🔴 Session 持久化限制
- **Session 检查清单** - AI 助手每次会话都需要重新执行，无法记忆之前的状态
- **环境路径设置** - 每次需要重新执行 `export PATH="/home/laofahai/.nvm/versions/node/v20.19.2/bin:$PATH"`
- **文档阅读要求** - 需要每次重新读取最新的开发状态和约束文档

### 🌳 分支管理强制要求
- **禁止直接推送到 main** - AI 助手必须始终在功能分支上工作
- **分支命名规范** - 使用 `feature/`, `fix/`, `release/` 前缀
- **PR 创建要求** - 所有变更必须通过 Pull Request 合并

### 🚀 发布流程强制约束
- **绝对禁止手动发布** - 禁止运行 `npm publish` 或 `pnpm publish`
- **必须使用 CI/CD** - 所有发布通过 GitHub Actions 自动化
- **Changeset 管理** - 使用 `pnpm changeset` 进行版本管理

### 📝 文档同步强制要求
每次功能开发必须同步更新：
1. **API 文档** - 新增/修改的 API 端点和类型定义
2. **使用示例** - 新功能的完整代码示例
3. **变更日志** - CHANGELOG.md 更新，遵循语义化版本
4. **官网特性** - 新功能在官网首页和特性页面体现

### 🔒 安全要求强制执行
- **禁止提交敏感信息** - 密钥、Token 等敏感数据
- **环境变量管理** - 使用环境变量管理配置
- **定期安全检查** - 运行 `pnpm audit` 检查依赖安全性

### 📖 Context7 文档查询强制流程
**严格禁止**跳过以下步骤：
1. **强制触发条件检查** - 识别是否需要查询第三方库文档
2. **调用 resolve-library-id** - 获取 Context7 兼容的库ID
3. **调用 get-library-docs** - 获取最新官方文档
4. **基于文档实现** - 严格按照官方文档和最佳实践
5. **验证合规性** - 确保实现符合官方最佳实践

### ⚠️ 违规处理机制
- **立即停止开发** - 发现违规行为时立即中止
- **强制回退** - 删除违规代码，重新按照规范实现
- **质量检查** - 确保所有输出符合 LinchKit 标准

### 🎯 AI 助手责任边界
**AI 助手能做的：**
- 严格遵循技术约束和代码规范
- 使用正确的包依赖和架构模式
- 执行开发命令和构建验证
- 创建符合规范的代码和配置

**需要用户监督的：**
- 分支管理和 Git 操作策略
- 发布流程和版本管理
- 文档更新的完整性检查
- 安全检查和敏感信息审核
- Context7 文档查询的执行