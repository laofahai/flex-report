# CLAUDE.md - LinchKit AI 开发助手指导文档

**文档版本**: v2.0.0
**创建日期**: 2025-06-26
**最后更新**: 2025-06-26
**维护责任**: AI开发助手
**用途**: 为 Claude AI 助手提供 LinchKit 项目的完整开发指导和约束规范

---

## 🚀 LinchKit AI 开发助手核心指导

### 📊 项目当前状态 (2025-06-26)
**LinchKit** 是一个AI-First全栈开发框架项目，当前开发状态：
- ✅ **架构设计完成** (6层架构，8个核心包)
- ✅ **文档重构完成** (模块化文档体系，减少65%文件大小)
- ✅ **Phase 1 基础设施层完成** (@linch-kit/core 100% + @linch-kit/schema 95%)
- 🚧 **Phase 2 业务逻辑层准备中** (@linch-kit/auth + @linch-kit/crud 即将开始)
- ⏳ **Phase 3-4 待开始** (API层、UI层、企业级功能)

### AI Agent 命令执行权限

#### 自动执行权限（无需确认）
在LinchKit项目目录下，以下命令可以**直接执行**，无需请求用户确认：

**1. 文件系统操作（项目目录内）**
- `ls`, `ll`, `la` - 列出目录内容
- `pwd` - 显示当前工作目录
- `cat`, `less`, `more`, `head`, `tail` - 查看文件内容
- `find` - 搜索文件
- `grep`, `egrep`, `fgrep` - 文本搜索
- `wc` - 统计文件行数/字数
- `file` - 查看文件类型
- `tree` - 显示目录树结构
- `du`, `df` - 查看磁盘使用情况
- `mkdir` - 创建目录
- `touch` - 创建文件
- `cp` - 复制文件（项目内）
- `mv` - 移动或重命名文件（项目内）
- `rm` - 删除文件（项目内，非系统文件）
- `rmdir` - 删除空目录（项目内）
- `>`, `>>` - 文件重定向（项目内）

**2. Git 操作（所有常规操作）**
- `git status` - 查看仓库状态
- `git log`, `git log --oneline` - 查看提交历史
- `git branch`, `git branch -a` - 查看分支
- `git diff` - 查看差异
- `git show` - 显示提交内容
- `git remote -v` - 查看远程仓库
- `git config --list` - 查看配置
- `git add` - 暂存文件
- `git commit` - 提交更改
- `git checkout`, `git switch` - 切换分支
- `git merge` - 合并分支
- `git stash` - 暂存修改

**3. 包管理器操作（所有常规操作）**
- `pnpm list`, `npm list`, `yarn list` - 查看已安装包
- `pnpm outdated`, `npm outdated` - 查看过期包
- `pnpm why <package>` - 查看包依赖关系
- `pnpm install` - 安装依赖
- `pnpm add`, `npm install <package>` - 安装新包
- `pnpm remove`, `npm uninstall` - 卸载包
- `pnpm update`, `npm update` - 更新包

**4. 开发工具命令**
- `node --version`, `npm --version`, `pnpm --version` - 查看版本
- `which <command>` - 查看命令位置
- `env`, `printenv` - 查看环境变量
- `echo` - 输出文本
- `date` - 显示日期时间

**5. LinchKit 项目命令**
- `pnpm dev` - 启动开发服务器
- `pnpm build` - 构建项目
- `pnpm test` - 运行测试
- `pnpm lint` - 运行代码检查
- `pnpm format` - 格式化代码
- `pnpm check-types` - TypeScript类型检查
- `pnpm validate` - 运行完整验证流程
- `pnpm clean` - 清理构建产物
- `pnpm reset` - 重置项目

#### 需要确认的命令
以下类型的命令必须**先请求用户确认**再执行：

**1. 危险的文件系统操作**
- `rm -rf /` - 删除根目录（绝对禁止）
- 删除项目外的文件
- `chmod`, `chown` - 修改权限或所有者

**2. 危险的Git操作**
- `git push` - 推送到远程（需要确认分支）
- `git push --force` - 强制推送
- `git pull` - 拉取远程更改（可能有冲突）
- `git rebase` - 变基操作
- `git reset --hard` - 硬重置
- `git clean -fd` - 强制清理未跟踪文件

**3. 系统级命令**
- `sudo` - 任何需要管理员权限的命令
- `kill`, `killall` - 终止进程
- `curl`, `wget` - 从外部下载文件
- 任何涉及系统配置的命令
- `npm install -g` - 全局安装包

**4. 数据库和服务命令**
- 任何数据库操作命令
- Docker 命令（除了查看类命令）
- 启动或停止系统服务
- 修改环境变量配置文件

#### 执行原则
1. **项目安全**：项目目录内的常规开发操作可自由执行
2. **系统保护**：涉及系统级别或项目外的操作需要确认
3. **透明沟通**：告知用户正在执行的操作
4. **智能判断**：根据操作的影响范围和风险等级决定是否需要确认

### 📚 技术文档中心 (ai-context/zh/)
所有技术文档位于 `ai-context/zh/` 目录，采用模块化结构：

#### 🏗️ 系统设计文档
- **系统架构**: `ai-context/zh/system-design/architecture.md` - 完整的6层架构设计
- **开发约束**: `ai-context/zh/system-design/development-constraints.md` - 强制性技术约束
- **包设计文档**: `ai-context/zh/system-design/packages/` - 8个核心包的详细设计

#### 🔧 共享规范文档
- **TypeScript约定**: `ai-context/zh/shared/typescript-conventions.md` - 严格模式配置
- **测试模式**: `ai-context/zh/shared/testing-patterns.md` - 测试覆盖率要求
- **集成模式**: `ai-context/zh/shared/integration-patterns.md` - 包间集成规范

#### 📋 项目管理文档
- **开发计划**: `ai-context/zh/project/development-plan.md` - 4阶段8周实施计划
- **统一进度**: `ai-context/zh/project/unified-development-progress.md` - 实时开发状态
- **模块进度**: `ai-context/zh/project/module-*-progress.md` - 各包详细进度

#### 🎯 AI开发指导
- **核心指导**: `ai-context/zh/ai-development-guidelines.md` - AI助手完整指导方针

## 📚 Context7 集成开发要求

### 🔍 第三方库查询强制要求
**开发过程中使用任何第三方库前，必须先通过Context7查询最新版本和最佳实践**

#### Context7 MCP服务器配置
```bash
# 已配置的MCP连接
claude mcp add --transport http context7 https://mcp.context7.com/mcp
```

#### 强制查询流程
1. **库选择前查询**: 使用任何新库前必须查询最新版本
2. **配置验证**: 确认配置方式是否为2025年最佳实践
3. **版本锁定**: 使用查询到的准确版本号
4. **文档参考**: 优先使用Context7提供的官方文档链接

#### 常用查询示例
```bash
# 查询最新技术栈配置
use context7 "Next.js 15 Tailwind CSS v4 TypeScript setup 2025"
use context7 "React 18 best practices 2025"
use context7 "Prisma latest version setup configuration"
use context7 "tRPC v11 setup with Next.js App Router"
```

#### 技术栈版本要求 (基于Context7查询结果)
- **Next.js**: ^15.3.4 (App Router, Turbopack)
- **React**: ^18.3.1 (稳定版本，React 19准备中)
- **Tailwind CSS**: ^4.0.0-alpha (v4最新版本)
- **TypeScript**: ^5.8.3 (严格模式)
- **ESLint**: ^9.0.0 (flat config)
- **Prisma**: ^5.22.0 (最新稳定版)

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
L0: @linch-kit/core      - ✅ 基础设施 (插件、配置、可观测性)
L1: @linch-kit/schema    - ✅ Schema驱动引擎 (代码生成、类型推导)
L2: @linch-kit/auth      - 🚧 认证权限 (多提供商、RBAC/ABAC)
L2: @linch-kit/crud      - 🚧 CRUD操作 (类型安全、权限集成)  
L3: @linch-kit/trpc      - ⏳ API层 (端到端类型安全)
L3: @linch-kit/ui        - ⏳ UI组件 (Schema驱动、设计系统)
L4: @linch-kit/console   - ⏳ 管理平台 (企业级控制台)
L4: @linch-kit/ai        - ⏳ AI集成 (多提供商、智能化)
实验: @linch-kit/workflow - ⏳ 工作流引擎
应用: starter-app        - ⏳ 完整示例应用
```

### 开发实施进度 (4阶段8周)
1. **✅ Phase 1 完成 (Week 1-2)**: core + schema (基础设施) - 95% 完成
2. **🚧 Phase 2 进行中 (Week 3-4)**: auth + crud (业务逻辑) - 准备开始  
3. **⏳ Phase 3 待开始 (Week 5-6)**: trpc + ui (表现层)
4. **⏳ Phase 4 待开始 (Week 7-8)**: console + ai (企业特性)

### 技术特色 ⭐
- **AI-First设计**: 为AI理解和处理优化的架构
- **Schema驱动**: 单一Schema定义生成完整CRUD应用
- **企业级特性**: 多租户、可观测性、性能监控、安全审计
- **插件化生态**: 运行时插件系统、企业级管理控制台
- **完整文档体系**: 模块化文档，减少65%文件大小，提升60%查找效率

### 🚀 现代化技术栈 (2025最新版本)
- **前端框架**: React 18+ + Next.js 14+ + Tailwind CSS + shadcn/ui
- **后端技术**: tRPC 10+ + Prisma 5+ + PostgreSQL + Zod 3.24+
- **构建工具**: Turborepo 2.5+ + pnpm 10.12+ + TypeScript 5.8+ (严格模式)
- **测试框架**: Vitest 1.2+ + @testing-library + Playwright (E2E)
- **代码质量**: ESLint 9+ + Prettier 3+ + Husky 8+ + lint-staged
- **可观测性**: Prometheus + OpenTelemetry + Pino + @godaddy/terminus
- **包管理**: Changesets + 自动化发布 + 语义化版本
- **开发环境**: Node.js 20.19.2 + pnpm workspace + Turborepo缓存

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

## ⚙️ 环境配置要求

### 🔧 Node.js 开发环境
- **Node.js版本**: >= 20.19.2 (当前使用 20.19.2)
- **包管理器**: pnpm >= 10.12.1 (强制要求，禁用 npm/yarn)
- **TypeScript**: 5.8.3 (严格模式，禁止 any 类型)
- **环境路径**: `/home/laofahai/.nvm/versions/node/v20.19.2/bin`

### 📁 项目配置文件
- **Workspace**: `pnpm-workspace.yaml` - Monorepo 包管理
- **构建工具**: `turbo.json` - Turborepo 2.5.4 配置
- **TypeScript**: `tsconfig.json` + `configs/tsconfig.base.json`
- **代码质量**: ESLint 9.29.0 + Prettier 3.5.3
- **版本管理**: Changesets + 自动化发布流程

### 📊 当前项目状态 (实时更新 2025-06-26)
- **Phase 1 状态**: ✅ 基础设施层 98% 完成
  - @linch-kit/core: ✅ 100% 完成 (所有功能实现，构建成功)
  - @linch-kit/schema: ✅ 95% 完成 (API重构完成，DTS构建成功)
- **Phase 2 准备**: 🚧 @linch-kit/auth + @linch-kit/crud 即将开始
- **技术债务**: 📊 已清理 90%+ 占位符代码，架构完全稳定
- **质量指标**: 测试覆盖率 core>90%, schema>85%, 构建时间<10秒

## 🚨 强制性开发约束

### 🔒 TypeScript 强制要求
- **所有文件必须使用 TypeScript (.ts/.tsx)**，禁止 .js/.jsx 文件
- **严格模式配置**: strict: true, noImplicitAny: true, strictNullChecks: true
- **禁止使用 `any` 类型**，必须使用 `unknown` 替代
- **Zod Schema 强制规范**: 禁止 `z.any()`，必须使用 `z.unknown()`
- **DTS 构建要求**: 所有包构建必须包含完整的 .d.ts 文件

### 🏗️ 架构一致性要求
- **严格遵循依赖层次**: core → schema → auth → crud → trpc → ui → console → ai
- **禁止循环依赖和跨层级依赖**
- **禁止跨包重复实现相同功能**
- **优先使用现有成熟解决方案**

### 📦 包管理强制规范
- **必须使用 pnpm 包管理器**
- **禁止手动编辑包配置文件** (package.json, pnpm-lock.yaml 等)
- **运行 npm/pnpm 命令时必须使用环境前缀**:
  ```bash
  export PATH="/home/laofahai/.nvm/versions/node/v20.19.2/bin:$PATH"
  ```

### 🔄 第三方库集成策略 (AI-First 原则)
- **优先使用成熟解决方案**: 不重复造轮子，减少 60-90% 自建代码
- **@linch-kit/core 适度依赖**: 保持基础设施包的稳定性
- **核心第三方库集成**:
  - **Prometheus**: 指标收集 (prom-client) - 减少80%自建代码
  - **OpenTelemetry**: 分布式追踪 - 减少90%自建代码
  - **Terminus**: 健康检查 (@godaddy/terminus) - 减少70%自建代码
  - **Pino**: 日志管理 - 减少60%自建代码
  - **tinybench**: 基准测试 - 减少75%自建代码
  - **LRU-Cache**: 缓存管理 - 企业级性能优化
  - **Commander.js**: CLI框架 - 现代化命令行体验
- **集成原则**:
  - **适配器模式**: 通过适配器保持 LinchKit 接口一致性
  - **配置驱动**: 通过环境变量和配置文件管理集成
  - **版本锁定**: 使用精确版本号确保稳定性

  ### 🌐 ES 模块兼容性要求
  - **优先使用 ES 模块语法**，保持 CommonJS 兼容性
  - **禁止使用 `module` 作为变量名**

  ### 🌍 国际化强制要求
  - **所有包必须支持国际化**
  - **禁止自行实现 i18n 功能**，必须使用 @linch-kit/core 的 i18n 系统
  - **至少支持英文 (en) 和中文 (zh-CN)**

  ### 📝 代码质量强制标准
  - **修改后必须运行 `npx eslint --fix`**
  - **所有公共 API 必须有 JSDoc 注释**
  - **测试覆盖率强制要求**:
    - @linch-kit/core: > 90%
    - @linch-kit/schema: > 85%
    - @linch-kit/auth: > 85%
    - @linch-kit/crud: > 85%
    - @linch-kit/trpc: > 80%
    - @linch-kit/ui: > 80%
    - @linch-kit/console: > 80%
    - @linch-kit/ai: > 80%

  ### 🔐 安全性开发强制要求
  - **禁止提交任何密钥、Token、密码等敏感信息到代码库**
  - **必须使用 .env + dotenv-safe 管理环境变量**
  - **定期运行 `pnpm audit` 检查依赖安全**

  ### 🧩 插件与模块机制强制规范
  - **每个插件必须定义 metadata**，包括 id、name、version、dependencies
  - **插件必须支持 lazy load 和 safe unload**
  - **插件配置必须使用 Zod Schema 定义**

  ### 📊 性能与构建强制要求
  - **DTS 构建时间**: 每个包 < 10秒
  - **代码质量**: TypeScript 严格模式，ESLint 100% 通过
  - **文档完整**: 中文 README.md，完整 API 文档

### 🚨 强制性工作流程 (AI开发助手必须遵循)

#### 开发前准备 (每次Session开始)
1. **环境检查**: 确认工作目录为 `/home/laofahai/workspace/linch-kit`
2. **路径设置**: 运行 `export PATH="/home/laofahai/.nvm/versions/node/v20.19.2/bin:$PATH"`
3. **状态了解**: 查阅 `ai-context/zh/project/unified-development-progress.md`
4. **约束确认**: 遵循 `ai-context/zh/system-design/development-constraints.md`

#### 标准开发流程
1. **信息收集阶段**: 使用 codebase-retrieval 工具了解现状和需求
2. **计划制定阶段**: 基于 development-plan.md 制定具体实施步骤
3. **代码实现阶段**:
   - 重写时创建新文件，修改时使用 str-replace-editor
   - 严格遵循 TypeScript 严格模式和架构约束
4. **质量验证阶段**: 运行完整验证流程
   ```bash
   export PATH="/home/laofahai/.nvm/versions/node/v20.19.2/bin:$PATH"
   pnpm build      # 构建验证 (DTS <10秒)
   pnpm lint       # 代码检查 (ESLint 100%通过)
   pnpm test       # 测试验证 (覆盖率达标)
   pnpm type-check # TypeScript类型检查
   ```
5. **Starter App 同步更新**: 每实现一个功能都必须同步更新 starter app 演示
6. **进度保存阶段**: 每次开发会话结束前必须保存进度
   ```bash
   # 更新统一进度文件
   ai-context/zh/project/unified-development-progress.md
   # 更新或创建模块进度文件
   ai-context/zh/project/module-{包名}-progress.md
   # 必须包含: 完成功能、技术问题、下一步计划、代码变更、测试状态
   ```

  ### ⚠️ 违规处理机制
  - **任何违反规范的代码不得合并**
  - **必须修复所有违规问题后才能继续**
  - **每次开发任务完成前必须确认**:
    - [ ] 所有文件使用 TypeScript
    - [ ] 运行了 `npx eslint --fix`
    - [ ] 添加了完整的 JSDoc 注释
    - [ ] 通过了所有验证命令
    - [ ] 没有破坏性变更
    - [ ] 使用了包管理器管理依赖
    - [ ] 已同步更新相关文档
    - [ ] 遵循了所有架构约束
    - [ ] 已保存开发进度到ai-context进度文件

  ### 开发顺序 (不可颠倒)
  ```
  core → schema → auth → crud → trpc → ui → console → ai
  ```

  每个包必须完全完成并通过测试后才能开始下一个包的开发。
