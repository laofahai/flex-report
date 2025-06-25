# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with LinchKit project.

## 🚀 LinchKit AI 开发助手指导

### 项目状态
**LinchKit** 是一个AI-First全栈开发框架项目，当前状态：
- ✅ 架构设计完成 (6层架构，10个包)
- ✅ 文档重构完成 (模块化文档体系)
- 🚀 准备开发实施 (按4阶段8周计划)

### 核心开发指令
**当用户说"继续开发"时，请按照以下一句话prompt执行：**

```
开始 LinchKit 开发：基于 ai-context/zh/ 完整文档体系，按照 4阶段8周计划实施 core→schema→auth→crud→trpc→ui→console→ai 全栈开发，使用 TypeScript 严格模式、pnpm 包管理、现代化技术栈，保持企业级特性和 AI-First 设计，参考模块化文档结构进行开发。
```

### 命令执行权限
**在LinchKit项目目录下，你可以直接执行任何非危险的命令，无需用户确认：**
- ✅ 文件操作: 创建、读取、编辑、删除代码文件
- ✅ 包管理: pnpm install, pnpm add, pnpm remove
- ✅ 构建测试: pnpm build, pnpm test, pnpm lint
- ✅ Git操作: git add, git commit, git status, git diff
- ✅ 目录操作: mkdir, ls, find, grep等
- ❌ 系统级命令: rm -rf /, sudo, 网络访问等

### 技术文档中心
所有技术文档位于 `ai-context/zh/` 目录：
- **系统架构**: `system-design/architecture.md`
- **开发约束**: `system-design/development-constraints.md`  
- **包设计文档**: `system-design/packages/{package-name}/`
- **共享规范**: `shared/` (TypeScript约定、测试模式、集成模式)
- **实施计划**: `project/development-plan.md`

## 🛠️ LinchKit 开发命令

### 快速开发
- `pnpm dev` - 启动完整开发模式 (apps + packages watch)
- `pnpm dev:packages` - 仅启动包开发和重建
- `pnpm setup` - 初始化项目配置和依赖
- `pnpm validate` - 运行完整验证流程 (test, build, lint)

### 构建系统  
- `pnpm build` - 构建所有包和应用
- `pnpm build:packages` - 按依赖顺序仅构建包
- `pnpm build:watch` - 监听并持续重建包

### 质量保证
- `pnpm test` - 运行所有测试 (目标覆盖率: core>90%, 其他>80-85%)
- `pnpm test:watch` - 监听模式运行测试
- `pnpm check-types` - TypeScript类型检查 (严格模式)
- `pnpm lint` - ESLint代码检查
- `pnpm lint:fix` - 自动修复lint问题

### 项目管理
- `pnpm clean` - 清理构建产物和缓存
- `pnpm reset` - 完全重置 (清理 + 重新安装依赖)

## 🏗️ LinchKit 项目架构

### AI-First 全栈开发框架
LinchKit 是企业级AI-First全栈开发框架，采用Schema驱动的代码生成架构，提供端到端类型安全的开发体验。

### 6层架构 + 10个包设计
```
L0: @linch-kit/core      - 基础设施 (插件、配置、可观测性)
L1: @linch-kit/schema    - Schema驱动引擎 (代码生成、类型推导)
L2: @linch-kit/auth      - 认证权限 (多提供商、RBAC/ABAC)
L2: @linch-kit/crud      - CRUD操作 (类型安全、权限集成)  
L3: @linch-kit/trpc      - API层 (端到端类型安全)
L3: @linch-kit/ui        - UI组件 (Schema驱动、设计系统)
L4: @linch-kit/console   - 管理平台 (企业级控制台)
L4: @linch-kit/ai        - AI集成 (多提供商、智能化)
实验: @linch-kit/workflow - 工作流引擎
应用: starter-app        - 完整示例应用
```

### 开发实施顺序 (4阶段8周)
1. **Week 1-2**: core + schema (基础设施)
2. **Week 3-4**: auth + crud (业务逻辑)  
3. **Week 5-6**: trpc + ui (表现层)
4. **Week 7-8**: console + ai (企业特性)

### 技术特色 ⭐
- **AI-First设计**: 为AI理解和处理优化的架构
- **Schema驱动**: 单一Schema定义生成完整CRUD应用
- **企业级特性**: 多租户、可观测性、性能监控、安全审计
- **插件化生态**: 运行时插件系统、企业级管理控制台
- **完整文档体系**: 模块化文档，减少65%文件大小，提升60%查找效率

### 现代化技术栈 🚀
- **前端**: React 19 + Next.js 15 + Tailwind CSS + shadcn/ui
- **后端**: tRPC 11 + Prisma 5 + PostgreSQL + Zod 3  
- **工具链**: Turborepo + pnpm + TypeScript严格模式
- **可观测性**: Prometheus + OpenTelemetry + Pino
- **质量保证**: 测试覆盖率core>90%，其他>80-85%

## 🔄 开发工作流

### AI开发模式
当用户说**"继续开发"**时，自动按照以下流程执行：
1. **理解当前进度** - 检查git状态和已完成的包
2. **参考文档结构** - 使用`ai-context/zh/`的模块化文档
3. **按序实施** - 遵循core→schema→auth→crud→trpc→ui→console→ai顺序
4. **质量保证** - 确保TypeScript严格模式、测试覆盖率达标

### 标准开发流程  
1. **初始化**: `pnpm setup` 配置项目环境
2. **开发**: `pnpm dev` 启动监听模式
3. **测试**: `pnpm validate` 验证质量
4. **构建**: 按依赖顺序构建包 (Turborepo管理)
5. **类型检查**: `pnpm check-types` 确保类型安全

## ⚙️ 环境配置

### Node.js环境
- **版本要求**: Node.js >= 20.19.2
- **包管理器**: pnpm (必需)
- **TypeScript**: 严格模式，禁止any类型

### 项目状态
- **当前状态**: 准备开发实施阶段
- **架构**: 完整设计完成，文档重构完成
- **代码**: 现有代码仅作架构参考，需从零重写

## 🚨 关键约束

### 强制性要求
- **TypeScript严格模式**: 禁止使用`any`，使用`z.unknown()`替代`z.any()`
- **测试覆盖率**: core包>90%，其他包>80-85%  
- **构建性能**: DTS构建<10秒/包
- **代码质量**: ESLint + Prettier，通过所有检查
- **文档要求**: 中文README.md，完整API文档

### 开发顺序 (不可颠倒)
```
core → schema → auth → crud → trpc → ui → console → ai
```

每个包必须完全完成并通过测试后才能开始下一个包的开发。

---

## 📞 快速参考

### 立即开始开发
当用户说**"继续开发"**时，使用这个prompt：
```
开始 LinchKit 开发：基于 ai-context/zh/ 完整文档体系，按照 4阶段8周计划实施 core→schema→auth→crud→trpc→ui→console→ai 全栈开发，使用 TypeScript 严格模式、pnpm 包管理、现代化技术栈，保持企业级特性和 AI-First 设计，参考模块化文档结构进行开发。
```

### 核心文档入口
- **开发指导**: `ai-context/zh/ai-development-guidelines.md`
- **系统架构**: `ai-context/zh/system-design/architecture.md`  
- **实施计划**: `ai-context/zh/project/development-plan.md`
- **包设计**: `ai-context/zh/system-design/packages/`

LinchKit 是一个完整的AI-First全栈开发框架，当前已准备好开始开发实施阶段。