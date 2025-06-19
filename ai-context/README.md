# Linch Kit AI 上下文文档

这个目录包含了 Linch Kit 项目的 AI 上下文信息，用于帮助 AI 助手理解项目结构、技术决策和开发流程。

## 🎯 快速导航

### 📖 项目概览
- [项目总览](./project-overview.md) - 项目整体介绍和当前状态
- [快速开始](./QUICK-START.md) - 快速上手指南

### 🏗️ 系统架构
- [系统架构详解](./system/architecture.md) - 完整的系统架构设计
- [构建流水线](./system/build-pipeline.md) - Turborepo + tsup 构建系统
- [依赖关系图谱](./system/dependencies.md) - 包依赖和版本管理

### 🔧 核心架构
- [Schema 系统设计](./architecture/schema-system.md) - 数据模式系统
- [插件系统核心设计](./architecture/plugin-system-core.md) - 可扩展插件架构

### 📦 包级文档
包的详细 AI 上下文文档已移动到各包目录下的 `AI-CONTEXT.md` 文件：

- [Core 包](../packages/core/AI-CONTEXT.md) - CLI、配置管理和基础工具
- [Types 包](../packages/types/AI-CONTEXT.md) - TypeScript 类型定义
- [Auth Core 包](../packages/auth-core/AI-CONTEXT.md) - 认证核心功能
- [Schema 包](../packages/schema/AI-CONTEXT.md) - 数据模式定义和验证
- [tRPC 包](../packages/trpc/AI-CONTEXT.md) - tRPC 集成和类型安全 API
- [CRUD 包](../packages/crud/AI-CONTEXT.md) - 自动化 CRUD 操作
- [UI 包](../packages/ui/AI-CONTEXT.md) - React 组件库

### 🔄 工作流程
- [开发流程](./workflows/development.md) - 完整的开发工作流程
- [测试流程](./workflows/testing.md) - 多层次测试策略
- [发布流程](./workflows/release.md) - 自动化发布管理
- [维护流程](./workflows/maintenance.md) - 日常维护任务

### 📋 技术决策
- [技术栈选择](./decisions/tech-stack.md) - 核心技术选型理由
- [发布策略](./decisions/publishing-strategy.md) - 包发布和版本管理
- [CRUD 架构决策](./decisions/crud-architecture-decisions.md) - CRUD 系统设计决策
- [插件系统架构](./decisions/plugin-system-architecture.md) - 插件系统设计决策

### 📈 项目进度
- [当前状态](./progress/current-status.md) - 项目当前开发状态
- [实施路线图](./progress/implementation-roadmap.md) - 未来发展规划

### 📝 开发规范
- [开发原则](./principles/development-principles.md) - 核心开发原则和最佳实践
- [AI-First 最佳实践](./templates/ai-first-best-practices.md) - AI 辅助开发指南

## 🎯 使用指南

### 对于 AI 助手
1. **项目理解**: 从 [项目总览](./project-overview.md) 开始了解项目
2. **架构理解**: 查看 [系统架构](./system/architecture.md) 了解整体设计
3. **包级详情**: 查看各包目录下的 `AI-CONTEXT.md` 了解具体实现
4. **开发流程**: 参考 [工作流程](./workflows/) 了解开发规范

### 对于开发者
1. **快速上手**: 阅读 [快速开始](./QUICK-START.md) 指南
2. **开发规范**: 遵循 [开发原则](./principles/development-principles.md)
3. **技术决策**: 查看 [技术决策](./decisions/) 了解设计背景
4. **贡献代码**: 按照 [开发流程](./workflows/development.md) 进行

## 📝 文档维护原则

1. **及时更新**: 代码变更后及时更新相关文档
2. **简洁明了**: 重点记录关键信息，避免冗余
3. **结构化**: 使用统一的格式和结构
4. **面向 AI**: 文档应该便于 AI 理解和处理
5. **分层管理**: 主文档保持简洁，详细信息放在包级文档中

## 🔗 相关链接

- [用户文档](../docs/README.md) - 面向用户的文档
- [项目 README](../README.md) - 项目主页
- [贡献指南](./workflows/development.md) - 如何贡献代码
