# LinchKit AI 开发助手指导

**版本**: v7.0  
**更新**: 2025-07-03  
**项目**: LinchKit - AI-First 全栈开发框架

## 🚨 PHASE 1: 强制性 Session 初始化 (Pre-flight Checklist)

**触发条件**: 用户提及 "开始开发"、"修复bug"、"实现功能"、"继续开发" 等关键词

**⚠️ 在执行任何代码修改前，必须严格按顺序完成以下检查：**

### 1. 任务状态检查
- [ ] 使用 `TodoRead` 检查待办事项
- [ ] 如有未完成任务，询问用户是否继续或开始新任务

### 2. 分支安全检查 (🔴 最高优先级)
- [ ] 运行 `git branch --show-current` 检查当前分支
- [ ] **禁止在以下分支工作**: `main`, `master`, `develop`, `release/*`
- [ ] 如在受限分支，**立即创建新分支**：
  ```bash
  git checkout -b feature/[task-description]
  # 或
  git checkout -b fix/[issue-description]
  ```

### 3. 工作目录检查
- [ ] 运行 `git status --porcelain` 检查工作目录状态
- [ ] 如有未提交更改，询问用户处理方式（stash/commit）
- [ ] 确保工作目录干净后再继续

### 4. 任务明确性检查
- [ ] 确认任务描述具体且可执行
- [ ] 如任务模糊（如"优化一下"），要求用户提供具体需求
- [ ] 估算任务复杂度，决定是否需要拆分

### 5. 上下文获取策略
- [ ] **仅在必要时**读取核心文档：
  - ai-context/README.md（文档地图）
  - ai-context/workflow_and_constraints.md（约束规范）
  - ai-context/roadmap.md（当前状态）
- [ ] **优先使用搜索**而非全文读取
- [ ] 建立任务相关的最小上下文

**💡 用户简化提示语**：
```
开始开发：[具体任务描述]
```
AI 将自动执行完整的初始化检查。

**📋 标准化 Session 模板**: [ai-context/session_template.md](./ai-context/session_template.md) - 详细的执行流程指导

## 🚀 项目概览

LinchKit 是生产就绪的企业级 AI-First 全栈开发框架，采用 Schema 驱动架构，提供端到端类型安全。

### 🎯 核心原则
- **AI-First**: 所有设计都优先考虑 AI 理解和处理能力
- **Schema 驱动**: 以 Zod Schema 为单一数据源，驱动整个系统
- **类型安全**: 端到端 TypeScript 类型安全保障
- **模块化**: 高内聚、低耦合的包设计

### 🏛️ 架构状态
```
L0: @linch-kit/core      ✅ 基础设施 (100%)
L1: @linch-kit/schema    ✅ Schema引擎 (100%)
L2: @linch-kit/auth      ✅ 认证权限 (100%)
L2: @linch-kit/crud      ✅ CRUD操作 (100%)
L3: @linch-kit/trpc      ✅ API层 (100%)
L3: @linch-kit/ui        ✅ UI组件 (100%)
L4: modules/console      ✅ 管理平台 (100%)
L4: apps/website         ✅ 文档平台 (100%)
L4: @linch-kit/ai        ⏳ AI集成（规划中）
```

### 🛠️ 开发命令
```bash
# 开发流程
pnpm dev        # 开发模式
pnpm build      # 构建验证
pnpm validate   # 完整验证
```

### 🏗️ 技术架构
- **框架**: Next.js 15.3.4 + React 19.0.0
- **语言**: TypeScript 5.8.3（严格模式）
- **样式**: Tailwind CSS 4.x + shadcn/ui
- **API**: tRPC + Zod Schema
- **数据**: Prisma + PostgreSQL
- **认证**: NextAuth.js 5.0 + CASL

### 📦 包功能速查
- **@linch-kit/core** - 日志、配置、插件系统
- **@linch-kit/schema** - Schema定义、验证、转换
- **@linch-kit/auth** - 认证、授权、会话管理
- **@linch-kit/crud** - 通用CRUD操作
- **@linch-kit/trpc** - 类型安全API
- **@linch-kit/ui** - UI组件库

## 📚 LinchKit 知识库

### 🎯 知识库入口
**导航中心**: [ai-context/README.md](./ai-context/README.md) - 完整的文档地图和使用指南

### 🔴 核心约束 (每次开发前必读)
**开发规范**: [ai-context/workflow_and_constraints.md](./ai-context/workflow_and_constraints.md) - **所有开发约束和技术规范**

## 🔒 基础约束

必须严格遵守以下约束（详见 [ai-context/workflow_and_constraints.md](./ai-context/workflow_and_constraints.md)）：

1. **TypeScript 严格模式** - 禁止使用 `any`，使用 `unknown` 替代
2. **包管理规范** - 仅使用 pnpm，禁止 npm/yarn
3. **架构依赖顺序** - core → schema → auth → crud → trpc → ui → console
4. **功能复用原则** - 必须使用 LinchKit 内部包功能，禁止重复实现
5. **质量标准** - 测试覆盖率 core>90%, 其他>80%，构建时间<10秒

## 🚨 PHASE 2: 任务规划与分解 (Task Planning & Decomposition)

**目标**: 将用户需求分解为小型、逻辑清晰、可验证的步骤

### 任务分解流程
1. **范围分析** - 使用 `Grep/Glob` 识别相关文件和代码段
2. **生成计划** - 创建逐步计划清单，每步代表原子级更改
3. **计划公示** - 向用户展示计划，获得确认后执行

### 🎯 任务管理核心原则
- **强制 TodoWrite** - 复杂任务（3步以上）必须创建待办清单
- **单任务进行** - 同时只能有一个任务标记为 in_progress
- **实时更新** - 开始任务立即标记 in_progress
- **即时完成** - 任务完成立即标记 completed，禁止批量处理
- **session 拆分** - 每个 session 最多处理 1-2 个主要步骤
- **主动结束** - 完成阶段性任务后主动询问是否继续

### 任务计划模板
```
## 开发计划：[功能名称]
- [ ] 0. 包复用检查：pnpm check-reuse [关键词]
- [ ] 1. 创建功能分支 feature/[task-name]
- [ ] 2. [具体实现步骤1] 
- [ ] 3. [具体实现步骤2]
- [ ] 4. ESLint质量检查：修复所有错误（禁止使用eslint-disable）
- [ ] 5. 编写/更新测试用例
- [ ] 6. 运行 pnpm validate 验证
- [ ] 7. 更新文档 (changelog/roadmap/development-status)
- [ ] 8. 提交符合规范的 commit
- [ ] 9. 提醒用户创建 PR
- [ ] 10. PR 合并后删除本地和远程分支

**包复用检查**: 必须在步骤0执行，确认无重复实现
**质量要求**: 构建成功 + ESLint通过 + 测试通过 + 文档同步
**预估时间**: [评估每个步骤的复杂度]
**Session 建议**: 建议分 X 个 session 完成
```

### 🔄 Session 管理策略
- **小批量原则** - 每次 session 专注 1-2 个相关任务
- **进度检查点** - 每完成一个主要步骤后暂停，询问用户
- **上下文控制** - 避免单个 session 超过 50k tokens
- **连续性保障** - 通过 TodoRead 无缝接续前一个 session

### 🚀 当前特性
- **统一工作台** - /dashboard 基于角色的模块化架构
- **角色权限** - SUPER_ADMIN、TENANT_ADMIN、USER
- **现代UI** - shadcn/ui + Tailwind CSS v4 + 主题系统
- **企业功能** - 多租户、权限管理、审计日志
- **文档平台** - apps/website Nextra 4 + i18n + 主题切换

## 📖 优化的上下文管理策略

### 🎯 上下文索引系统
建立分层的知识获取体系，减少不必要的 token 消耗：

#### 1. 快速导航索引
- **ai-context/README.md** - 文档地图（优先查询）
- **ai-context/manifest.json** - 结构化索引文件
- **项目概览** - 仅获取任务相关的架构信息

#### 2. 精确搜索策略
- **使用 Grep/Glob** - 先搜索关键词，再读取相关文件
- **避免全文读取** - 除非确认需要完整上下文
- **按需获取** - 只获取任务直接相关的信息

#### 3. 外部文档查询
- **Context7 优先** - 第三方库技术问题
- **WebSearch 备用** - Context7 不可用时使用
- **官方文档** - 确保获取最新最准确信息

### 🔄 Context7 自动查询
**触发条件**：
- **新技术使用** - 首次使用某个第三方库
- **配置问题** - 遇到框架配置相关错误
- **最佳实践** - 需要确认官方推荐做法
- **版本更新** - 使用新版本特性

**查询流程**：
1. 识别需求 → 2. 添加 "use context7" → 3. 获取实时文档 → 4. 基于文档实现

### 🛠️ 使用方式
```bash
# 自动触发示例
"配置 Next.js 15 App Router 路由。use context7"
"使用 Prisma 创建用户模型。use context7"
"集成 tRPC 与 React Query。use context7"
```

## ⚠️ 开发原则

### 功能复用
**必须使用 LinchKit 内部包功能，禁止重复实现：**
- ❌ 不要自己写日志系统 → 使用 `@linch-kit/core` logger
- ❌ 不要自己写配置管理 → 使用 `@linch-kit/core` ConfigManager
- ❌ 不要自己写Schema验证 → 使用 `@linch-kit/schema`
- ❌ 不要自己写权限检查 → 使用 `@linch-kit/auth`
- ❌ 不要自己写CRUD逻辑 → 使用 `@linch-kit/crud`
- ❌ 不要自己写UI组件 → 使用 `@linch-kit/ui`

### 文件操作
- 优先编辑现有文件而不是创建新文件
- 只创建实现功能绝对必要的文件
- 不主动创建文档文件（*.md）或 README

## 🚨 PHASE 3: 实施与验证 (Implementation & Verification)

**目标**: 确保所有更改都是高质量、经过测试且有文档记录的

### 📋 完成定义 (Definition of Done)
每个任务必须满足以下所有条件才能标记为完成：

- [ ] **代码完成** - 功能代码已根据计划实现
- [ ] **类型安全** - 通过 TypeScript 严格模式检查
- [ ] **代码质量** - 运行 `pnpm lint` 无错误
- [ ] **测试通过** - 运行 `pnpm test` 全部通过
- [ ] **构建验证** - 运行 `pnpm build` 成功
- [ ] **文档更新** - 更新 README/CHANGELOG 或相关文档
- [ ] **规范提交** - 遵循 Conventional Commits 格式
- [ ] **分支整洁** - 工作分支相对于目标分支干净

### 🔧 自动化检查机制
依赖 Git Hooks 和 CI/CD 强制执行规则：

#### 本地 Git Hooks (.husky/)
- **pre-commit** - 自动运行格式化、lint、测试
- **commit-msg** - 检查 commit message 格式
- **pre-push** - 确保推送前通过所有检查

#### CI Pipeline 检查
- 构建验证、测试覆盖率、依赖安全检查
- 阻止不合规代码合入主分支

### 🌳 分支管理自动化
- **检测违规** - 自动检测在受限分支的工作
- **强制创建** - 立即创建合适的功能分支
- **命名规范** - 使用标准化分支命名格式
- **PR 提醒** - 完成开发时自动提醒创建 PR

### 📝 文档同步自动化
功能开发完成时强制更新：
- **changelog** - 记录新功能和修复
- **roadmap** - 调整任务状态和优先级
- **约束文档** - 新增规范和最佳实践

### 🔒 安全检查自动化
- **敏感信息扫描** - 提交前检查密钥、Token
- **依赖安全** - 运行 `pnpm audit` 检查漏洞
- **环境变量** - 验证配置使用规范

### ⚠️ 违规处理自动化
- **立即阻止** - 发现违规立即停止操作
- **自动回滚** - 使用 `git restore` 撤销不当更改
- **流程重启** - 要求按正确流程重新执行
- **预防更新** - 自动更新相关文档防止重复错误

## 🎯 具体场景开发指导

### 📋 新功能开发流程
1. **需求分析** - 使用 TodoWrite 分解功能需求
2. **架构设计** - 参考 [ai-context/system_architecture/](./ai-context/system_architecture/) 确定设计
3. **查询文档** - 优先使用 Context7（添加 "use context7"），备用 WebSearch/WebFetch
4. **编码实现** - 严格遵循 [ai-context/workflow_and_constraints.md](./ai-context/workflow_and_constraints.md) 约束
5. **测试验证** - 运行 `pnpm validate` 确保质量
6. **文档更新** - 更新 [ai-context/changelog.md](./ai-context/changelog.md) 记录完成功能

### 🐛 问题排查流程
1. **错误定位** - 分析错误日志和堆栈信息
2. **依赖检查** - 确认包版本和依赖关系
3. **文档查询** - 强制使用 Context7 查询官方文档确认正确用法
4. **方案实施** - 使用 LinchKit 内部功能解决问题
5. **预防措施** - 更新约束文档防止重复问题

### 🔧 配置问题处理
1. **配置对比** - 参考 demo-app 和 starter 的正确配置
2. **版本检查** - 确认技术栈版本匹配
3. **官方文档** - 查询 Context7 或使用 WebSearch/WebFetch 获取最新配置方式
4. **测试验证** - 确保配置更改不影响现有功能

## 🤝 Gemini 协作模式

### 触发条件
当用户使用以下关键词时自动启用：
- "与Gemini商讨后推进" / "和Gemini探讨"
- "让Gemini分析" / "请Gemini协助"
- "Gemini意见" / "双AI协作"

### 协作流程
```bash
# 生成协作提示
export PROMPT="[用户需求整合为协作查询]"

# 调用 Gemini CLI
gemini <<EOF
$PROMPT
EOF
```

### 整合输出
- 展示 Gemini 的分析结果
- 结合 Claude 的技术见解
- 提供融合两个 AI 代理的综合方案

## 🔗 重要提醒

### 📝 文档管理约束
- **单一信息源**: 避免重复信息，优先使用 MD 链接引用
- **实时更新**: 完成功能后立即更新相关文档
- **信息完整性**: 绝不丢失重要的开发约束、规范、流程信息
- **链接维护**: 保持文档间链接的准确性和有效性

### 🎯 AI 助手职责
- **每次Session**: 必须按检查清单执行初始化步骤
- **开发前**: 必须阅读相关约束和规范文档
- **开发中**: 严格遵循所有技术约束和工作流程
- **开发后**: 及时更新文档，记录进度和变更