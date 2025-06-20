# Linch Kit AI 上下文文档 (中文版)

这个目录包含了 Linch Kit 项目的完整 AI 上下文信息，经过重构和优化，便于 AI 助手理解项目结构、技术决策和开发流程。

## 🎯 快速导航

### 📖 项目概览
- [项目总览](./overview/project-overview.md) - 项目整体介绍和当前状态
- [快速开始指南](./overview/quick-start.md) - 快速上手指南
- [核心价值主张](./overview/value-proposition.md) - 项目定位和优势

### 🏗️ 系统架构
- [系统架构详解](./architecture/system-architecture.md) - 完整的系统架构设计
- [技术栈说明](./architecture/tech-stack.md) - 技术选型和集成方案
- [包依赖关系](./architecture/package-dependencies.md) - 包结构和依赖管理
- [构建系统](./architecture/build-system.md) - Turborepo + tsup 构建配置

### 📦 核心包文档
- [Core 包](./packages/core.md) - CLI、配置管理和基础工具
- [Schema 包](./packages/schema.md) - 数据模式定义和验证系统
- [Auth Core 包](./packages/auth-core.md) - 认证和权限管理
- [CRUD 包](./packages/crud.md) - 自动化 CRUD 操作
- [tRPC 包](./packages/trpc.md) - tRPC 集成和类型安全 API
- [UI 包](./packages/ui.md) - React 组件库
- [Types 包](./packages/types.md) - 共享类型定义

### 🔄 工作流程
- [开发流程](./workflows/development.md) - 完整的开发工作流程
- [测试策略](./workflows/testing.md) - 多层次测试方法
- [发布管理](./workflows/release.md) - 自动化发布流程
- [维护指南](./workflows/maintenance.md) - 日常维护任务

### 📋 技术决策
- [架构决策记录](./decisions/architecture-decisions.md) - 重要架构决策汇总
- [技术选型理由](./decisions/technology-choices.md) - 技术栈选择依据
- [发布策略](./decisions/publishing-strategy.md) - 包发布和版本管理策略

### 📈 项目管理
- [开发路线图](./management/roadmap.md) - 长期发展规划
- [当前进度](./management/current-progress.md) - 实时开发状态
- [任务优先级](./management/task-priorities.md) - 任务管理和优先级
- [工作交接](./management/handover-guide.md) - 会话交接指南

### 📚 参考资料
- [命令参考](./reference/commands.md) - CLI 命令完整参考
- [配置参考](./reference/configuration.md) - 配置选项说明
- [API 参考](./reference/api.md) - 核心 API 文档
- [故障排除](./reference/troubleshooting.md) - 常见问题解决

### 📝 开发模板
- [AI-First 最佳实践](./templates/ai-first-practices.md) - AI 辅助开发指南
- [代码生成模板](./templates/code-generation.md) - 代码生成提示词
- [文档模板](./templates/documentation.md) - 文档编写规范

## 🎯 使用指南

### 对于 AI 助手
1. **项目理解**: 从 [项目总览](./overview/project-overview.md) 开始了解项目
2. **架构理解**: 查看 [系统架构](./architecture/system-architecture.md) 了解整体设计
3. **当前状态**: 查看 [当前进度](./management/current-progress.md) 了解最新状态
4. **具体任务**: 根据任务类型查看相应的工作流程和参考文档

### 对于开发者
1. **快速上手**: 阅读 [快速开始指南](./overview/quick-start.md)
2. **开发规范**: 遵循 [开发流程](./workflows/development.md)
3. **技术决策**: 查看 [技术决策](./decisions/) 了解设计背景
4. **贡献代码**: 按照工作流程进行开发

## 📝 文档维护原则

1. **及时更新**: 代码变更后及时更新相关文档
2. **简洁明了**: 重点记录关键信息，避免冗余
3. **结构化**: 使用统一的格式和结构
4. **面向 AI**: 文档应该便于 AI 理解和处理
5. **任务导向**: 使用任务优先级和依赖关系组织内容，避免相对时间表述

## 🔗 相关链接

- [英文版本](../en/README.md) - English version (planned)
- [用户文档](../../docs/README.md) - 面向用户的文档
- [项目主页](../../README.md) - 项目主页
- [包级文档](../../packages/) - 各包详细文档

---

**最后更新**: 2025-06-20  
**维护责任**: AI Assistant + 开发团队  
**文档版本**: v2.0 (重构版本)
