# Linch Kit AI 上下文文档 v3.0

**最后更新**: 2025-06-21  
**文档版本**: v3.0 (重构优化版本)  
**重构完成**: AI Context 结构优化，文档数量从 25+ 减少到 8 个核心文件  
**维护责任**: AI Assistant + 开发团队

---

## 🎯 文档重构成果

### 优化效果
- ✅ **文档数量减少**: 从 25+ 个文件减少到 8 个核心文件
- ✅ **消除重复内容**: 合并相似信息，建立单一信息源
- ✅ **提升信息密度**: 每个文档都包含高价值、不重复的信息
- ✅ **简化导航结构**: AI 可通过少数几个文件快速理解项目全貌
- ✅ **增强维护性**: 每个信息只在一个地方维护

### 新的三层架构
```
ai-context-new/zh/
├── core/                    # 项目核心信息 (3个文件)
│   ├── project-essentials.md   # 项目概览、目标、技术栈、当前状态
│   ├── package-architecture.md # 包结构、依赖关系、模块设计
│   └── code-locations.md       # 关键代码位置索引
├── standards/               # 开发规范和标准 (3个文件)
│   ├── development-standards.md # 代码质量、TypeScript、JSDoc 规范
│   ├── ui-standards.md         # UI 组件、设计系统规范
│   └── workflow-standards.md   # Git 工作流、测试、部署规范
└── tasks/                   # 任务管理 (2个文件)
    ├── current-progress.md     # 当前开发进度和状态
    └── continue-prompt.md      # AI 工作流入口点
```

## 🚀 AI 助手快速导航

### 🎯 开始工作 (必读)
**[AI 工作流入口](./tasks/continue-prompt.md)** - 开始任何开发任务前的统一入口点

### 📖 理解项目 (核心信息)
1. **[项目核心要点](./core/project-essentials.md)** - 项目定位、技术栈、快速开始
2. **[包架构设计](./core/package-architecture.md)** - 包结构、依赖关系、架构决策
3. **[代码位置索引](./core/code-locations.md)** - 快速定位关键文件和功能

### 🔒 遵循标准 (强制要求)
1. **[开发规范](./standards/development-standards.md)** - **永久性标准，不可违背**
2. **[工作流程标准](./standards/workflow-standards.md)** - 开发、测试、发布流程
3. **[UI 组件标准](./standards/ui-standards.md)** - UI 开发和设计系统规范

### 📈 跟踪进度 (实时更新)
1. **[当前进度](./tasks/current-progress.md)** - 最新开发状态和任务优先级

## 🎯 使用指南

### 对于 AI 助手
1. **开始任务**: 从 [AI 工作流入口](./tasks/continue-prompt.md) 开始
2. **理解项目**: 阅读 [项目核心要点](./core/project-essentials.md)
3. **遵循标准**: **必须严格遵循** [开发规范](./standards/development-standards.md)
4. **查看进度**: 了解 [当前进度](./tasks/current-progress.md)
5. **定位代码**: 使用 [代码位置索引](./core/code-locations.md)

### 对于开发者
1. **快速上手**: 阅读 [项目核心要点](./core/project-essentials.md)
2. **开发规范**: **必须严格遵循** [开发规范](./standards/development-standards.md)
3. **工作流程**: 遵循 [工作流程标准](./standards/workflow-standards.md)
4. **架构理解**: 查看 [包架构设计](./core/package-architecture.md)

## 📊 项目当前状态概览

### 核心包完成情况
| 包名 | 状态 | 发布状态 | 主要功能 |
|------|------|----------|----------|
| @linch-kit/schema | ✅ 完成 | 已发布 npm | 数据模式和代码生成 |
| @linch-kit/core | ✅ 完成 | 待发布 | CLI、配置、插件系统 |
| @linch-kit/auth-core | ✅ 完成 | 待发布 | 认证和权限管理 |
| @linch-kit/crud | ✅ 完成 | 待发布 | CRUD 操作核心 |
| @linch-kit/trpc | ✅ 完成 | 待发布 | tRPC 集成 |
| @linch-kit/ui | ✅ 完成 | 待发布 | 基础 UI 组件 |

### 当前开发重点
- ✅ **已完成**: linch-starter 基座应用前端认证集成 (2025-06-20)
- 🔄 **进行中**: AI Context 重构优化 (当前任务)
- 📋 **下一步**: 产品管理模块开发

## 🔄 文档维护原则

### 更新频率
- **高频更新** (每次开发后): `tasks/current-progress.md`
- **中频更新** (功能完成后): `core/project-essentials.md`, `core/package-architecture.md`
- **低频更新** (架构变更后): `standards/*.md`, `core/code-locations.md`

### 维护责任
- **AI Assistant**: 负责 `tasks/` 目录下的任务管理文档
- **开发团队**: 负责 `core/` 和 `standards/` 目录下的核心文档
- **UI 团队**: 负责 `standards/ui-standards.md`
- **架构团队**: 负责 `core/package-architecture.md`

### 文档质量标准
1. **及时更新**: 代码变更后及时更新相关文档
2. **简洁明了**: 重点记录关键信息，避免冗余
3. **结构化**: 使用统一的格式和结构
4. **面向 AI**: 文档应该便于 AI 理解和处理
5. **任务导向**: 使用任务优先级和依赖关系组织内容

## 🔗 外部资源链接

### 项目资源
- [项目主页](../../README.md) - 项目根目录文档
- [用户文档](../../docs/README.md) - 面向用户的文档
- [包级文档](../../packages/) - 各包详细文档

### 开发资源
- [GitHub 仓库](https://github.com/laofahai/linch-kit) - 源代码仓库
- [npm 包](https://www.npmjs.com/package/@linch-kit/schema) - 已发布的包

## 📝 重构记录

### v3.0 重构 (2025-06-21)
- **目标**: 优化 AI 上下文加载效率，减少文档冗余
- **方法**: 三层架构重组，智能合并重复内容
- **成果**: 文档数量减少 60%+，信息密度提升，维护性增强

### 合并映射表
| 新文件 | 原始文件来源 |
|--------|-------------|
| `core/project-essentials.md` | `overview/project-overview.md`, `overview/quick-start.md`, `architecture/system-architecture.md` (概览部分) |
| `core/package-architecture.md` | `packages/core.md`, `packages/schema.md`, `architecture/system-architecture.md` (包架构部分), `architecture/technical-decisions.md` |
| `core/code-locations.md` | 新建文件，整合项目关键代码位置信息 |
| `standards/development-standards.md` | 保持独立，移动位置 |
| `standards/ui-standards.md` | `standards/ui-component-best-practices.md`, `architecture/ui-components-architecture.md` |
| `standards/workflow-standards.md` | `workflows/development.md`, `workflows/testing.md`, `workflows/release.md`, `standards/development-workflow.md` |
| `tasks/current-progress.md` | 保持独立，移动位置 |
| `tasks/continue-prompt.md` | 新建文件，AI 工作流入口点 |

---

**重要提醒**: 
1. 本文档结构已优化完成，请使用新的导航方式
2. 所有开发工作都必须严格遵循 [开发规范](./standards/development-standards.md)
3. 开始任何任务前请先查看 [AI 工作流入口](./tasks/continue-prompt.md)
4. 原有 `ai-context/` 目录保留作为备份，新文档在 `ai-context-new/` 目录
