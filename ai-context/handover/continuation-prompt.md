# Linch Kit 项目继续工作 Prompt

## 📋 项目背景

我正在开发 Linch Kit - 一个 AI-First 的企业级快速开发框架。项目采用 Turborepo monorepo 架构，包含多个核心包（core, schema, auth-core, types, ui, trpc, crud）和一个 starter 应用用于验证功能集成。

## 🎯 当前任务

我需要继续完成 Starter 应用的功能验证工作，通过实现完整的用户管理功能来验证各个包的集成。上一个会话中修复了 CLI 系统的一些问题，但还有几个关键问题需要解决。

## 📖 详细上下文

请先阅读以下文档了解项目状态：
1. `ai-context/handover/session-handover-2025-06-19.md` - 详细的交接文档
2. `ai-context/project-overview.md` - 项目概览
3. `ai-context/progress/current-status.md` - 当前开发状态

## 🚨 立即需要解决的问题

### 1. CLI 命令格式问题 (最高优先级)
- **问题**: `linch plugin-list` 命令显示 "Unknown command"
- **需要**: 调试插件加载和命令注册流程
- **测试**: `cd apps/starter && pnpm linch plugin-list`

### 2. 配置文件统一 (高优先级)  
- **问题**: Schema CLI 插件需要从 `linch.config.ts` 读取配置，而不是独立的配置文件
- **当前**: `apps/starter/linch.config.ts` 已包含 schema 配置
- **需要**: 修改 `packages/schema/src/plugins/cli-plugin.ts` 中的配置加载逻辑

### 3. Schema 命令验证 (高优先级)
- **问题**: Schema 相关命令可能无法正常工作
- **需要**: 确保 `linch schema-generate-prisma` 等命令能正确执行
- **测试**: `cd apps/starter && pnpm linch schema-list`

## 🎯 最终目标

通过 Starter 应用实现完整的用户管理功能，验证以下包的集成：
- `@linch-kit/core` - CLI 工具和基础设施
- `@linch-kit/schema` - 数据模式定义和 Prisma 生成
- `@linch-kit/auth-core` - 认证和权限管理
- `@linch-kit/trpc` - API 层
- `@linch-kit/ui` - UI 组件

## 🔧 重要原则

1. **优先使用现有包功能** - 不要重新实现，要使用 packages/ 下已有的功能
2. **不要手动修改生成的文件** - 使用 CLI 命令来生成和管理
3. **保持类型安全** - 不要将 TypeScript 文件改为 JavaScript
4. **遵循用户要求** - 命令格式要符合用户偏好（不用冒号分隔符）

## 🚀 开始工作

请按以下步骤开始：

1. **检查当前状态**
   ```bash
   cd apps/starter
   pnpm linch --help
   pnpm linch plugin-list
   ```

2. **调试 CLI 问题**
   - 如果 plugin-list 不工作，检查插件加载流程
   - 查看 `packages/core/src/cli/core/plugin-loader.ts` 和相关日志

3. **修复配置加载**
   - 确保 schema 命令能从 `linch.config.ts` 读取配置
   - 测试 schema 命令是否正常工作

4. **验证实体加载**
   - 确保 `apps/starter/app/_lib/schemas/user.ts` 中的用户实体能被发现
   - 测试 `linch schema-list` 是否显示实体

5. **继续功能验证**
   - 实现完整的用户注册/登录流程
   - 验证数据库操作和各包集成

## 📁 关键文件位置

- **CLI 入口**: `apps/starter/scripts/linch.js`
- **Schema CLI 插件**: `packages/schema/src/plugins/cli-plugin.ts`
- **统一配置**: `apps/starter/linch.config.ts`
- **用户实体**: `apps/starter/app/_lib/schemas/user.ts`
- **交接文档**: `ai-context/handover/session-handover-2025-06-19.md`

开始工作时，请先运行基本的 CLI 命令来了解当前状态，然后根据实际情况调整工作重点。记住要优先使用现有包的功能，这是这个框架的核心价值。
