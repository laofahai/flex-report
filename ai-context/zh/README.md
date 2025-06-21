# LinchKit AI 上下文文档

**LinchKit 项目的完整 AI 上下文信息，经过重构和优化，便于 AI 助手理解项目结构、技术决策和开发流程。**

## 🎯 核心文档 (必读)

### 📖 项目核心
- [项目核心信息](./project-core.md) - 项目定位、技术栈、包状态
- [架构设计](./architecture-design.md) - 完整的系统架构和技术决策
- [代码位置索引](./code-locations.md) - 快速定位关键文件和功能

### 🔒 开发规范 (强制)
- [开发规范](./development-rules.md) - **强制执行的开发标准**
- [国际化规范](./standards/i18n-requirements.md) - 统一 i18n 架构要求
- [UI 组件规范](./standards/ui-component-best-practices.md) - UI 开发最佳实践
- [开发工作流程](./standards/development-workflow.md) - AI-First 开发流程
- [Schema 数据规范](./standards/schema-data-standards.md) - Schema 驱动开发规范
- [安全开发规范](./standards/security-requirements.md) - 安全开发要求

### 📋 任务管理
- [当前任务](./current-tasks.md) - 当前最高优先级任务和详细计划
- [开发计划](./development-plan.md) - 完整的开发路线图和版本规划
- [继续开发提示词](./continue-prompt.md) - 可复制的 AI 继续开发指令

### 🏗️ 架构文档
- [AI 集成架构](./architecture/ai-integration-architecture.md) - AI-First 架构设计
- [插件系统设计](./architecture/plugin-system-design.md) - 插件系统架构
- [UI 组件架构](./architecture/ui-components-architecture.md) - UI 组件设计
- [技术决策记录](./architecture/technical-decisions.md) - 重要技术决策

### 📦 包文档
- [Core 包](./packages/core.md) - CLI、配置管理和统一 i18n
- [Schema 包](./packages/schema.md) - Zod Schema 驱动开发系统

### 🔧 实用工具
- [代码位置索引](./code-locations.md) - 快速定位关键文件和功能
- [继续开发提示词](./continue-prompt.md) - 可复制的 AI 继续开发指令

## 🎯 使用指南

### 对于 AI 助手
1. **项目理解**: 从 [项目核心信息](./project-core.md) 开始了解项目
2. **开发标准**: **必须严格遵循** [开发规范](./development-rules.md)
3. **当前状态**: 查看 [当前任务](./current-tasks.md) 了解最新状态
4. **继续开发**: 使用 [继续开发提示词](./continue-prompt.md) 快速开始
5. **架构理解**: 查看 [架构设计](./architecture-design.md) 了解整体设计
6. **代码定位**: 使用 [代码位置索引](./code-locations.md) 快速找到相关文件

### 对于开发者
1. **快速上手**: 使用 [继续开发提示词](./continue-prompt.md)
2. **开发规范**: **必须严格遵循** [开发规范](./development-rules.md)
3. **开发流程**: 遵循 [开发工作流程](./standards/development-workflow.md)
4. **技术决策**: 查看 [架构设计](./architecture-design.md) 了解设计背景

## 📝 文档维护原则

1. **及时更新**: 代码变更后及时更新相关文档
2. **简洁明了**: 重点记录关键信息，避免冗余
3. **结构化**: 使用统一的格式和结构
4. **面向 AI**: 文档应该便于 AI 理解和处理
5. **任务导向**: 使用任务优先级和依赖关系组织内容，避免相对时间表述

## 🔗 相关链接

- [项目主页](../../README.md) - 项目主页
- [包级文档](../../packages/) - 各包详细文档
- [用户文档](../../docs/README.md) - 面向用户的文档

---

**最后更新**: 2025-06-21 (AI Context 文档合并完成)
**维护责任**: AI Assistant + 开发团队
**文档版本**: v3.0 (统一合并版本)
**重要更新**: 合并根目录和 zh 目录内容，统一到 ai-context/zh 目录
