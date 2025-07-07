# LinchKit AI 开发助手指导

**版本**: v7.2  
**更新**: 2025-07-07  
**项目**: LinchKit - AI-First 全栈开发框架

## 🚫 CRITICAL: NO DIRECTORY CHANGES & MUST USE BUN
**NEVER use `cd` to change directories. ALWAYS work from project root. Use `bun run <script> --filter <package>` for monorepo operations.**

## 🔴 **MANDATORY: 强制使用 bun**
**项目已完全转向 bun 生态，严禁使用 node 或 npm！**

### ✅ 正确使用方式
```bash
bun run build                    # 构建项目
bun run dev                      # 开发模式
bun dist/cli/index.js           # 运行 CLI 工具
bun install                      # 安装依赖
bun test                         # 运行测试
```

### ❌ 严禁使用
```bash
node dist/cli/index.js          # 禁止！必须用 bun
npm install                     # 禁止！必须用 bun install
yarn install                    # 禁止！必须用 bun install
npx command                     # 禁止！必须用 bun 等价命令
```

## 🔐 **MANDATORY: 环境变量管理**
**严禁硬编码敏感信息！所有数据库连接、API密钥必须使用环境变量：**

### ✅ 正确方式：使用环境变量
```javascript
const config = {
  connectionUri: process.env.NEO4J_CONNECTION_URI,
  username: process.env.NEO4J_USERNAME,
  password: process.env.NEO4J_PASSWORD
};
```

### ❌ 严禁：硬编码敏感信息
```javascript
const config = {
  connectionUri: 'neo4j+s://...',      // 禁止！
  password: 'actual-password'          // 禁止！
};
```

## 🚀 快速启动：AI Session 工具

**核心工具**: `bun run ai:session <command>`  
**优势**: 自动化执行CLAUDE.md中的繁琐步骤，提升开发效率

### ⚡ 快速初始化
```bash
# 自动执行所有初始化检查（分支、环境、依赖）
bun run ai:session init "[任务描述]"

# 或者简单的环境检查
bun run ai:session init
```

### 🌳 智能分支创建
**Claude会根据任务描述智能生成英文分支名**:
```bash
# Claude调用方式（推荐）
bun run ai:session branch add-user-avatar "给用户添加头像功能"

# 直接指定分支名
bun run ai:session branch fix-login-bug "修复登录错误"
```

**分支名规范**:
- 自动添加 `feature/` 前缀
- 只允许字母、数字、连字符、下划线
- Claude会将中文任务描述转换为简洁的英文分支名

### 🎯 上下文查询（强制执行）
**任何代码相关任务都必须先查询项目上下文**:
```bash
# 查询实体定义和相关文件
bun run ai:session query "[实体名]"

# 查询符号定义（函数、类、接口）
bun run ai:session symbol "[符号名]"

# 查询实现模式
bun run ai:session pattern "[模式]" "[实体]"
```

### 🔄 图谱数据同步（强制执行）
```bash
# 同步Neo4j图谱数据
bun run ai:session sync

# 完整验证（包含图谱同步）
bun run ai:session validate
```

**💡 用户简化提示语**：
```
开始开发：[具体任务描述]
```
AI 将自动执行 `bun run ai:session init "[任务]"` 进行初始化检查。

**📋 完整工具文档**: `bun run ai:session help` - 查看所有可用命令

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
L4: apps/demo-app        ✅ 演示应用 (已修复构建问题)
L4: apps/starter         ✅ 多标签工作台 (100%)
L4: @linch-kit/ai        🚧 AI集成（Graph RAG需改进）
```

### 🛠️ 开发命令
```bash
# 开发流程
bun dev        # 开发模式
bun build      # 构建验证
bun validate   # 完整验证
```

### 🏗️ 技术架构
- **框架**: Next.js 15.3.4 + React 19.1.0
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
**导航中心**: [ai-context/00-core/readme.md](./ai-context/00-core/readme.md) - 完整的文档地图和使用指南

### 🔴 核心约束 (每次开发前必读)
**开发规范**: [ai-context/03-workflows/development-workflow.md](./ai-context/03-workflows/development-workflow.md) - **所有开发约束和技术规范**

## 🔒 基础约束

必须严格遵守以下约束（详见 [ai-context/03-workflows/development-workflow.md](./ai-context/03-workflows/development-workflow.md)）：

1. **TypeScript 严格模式** - 禁止使用 `any`，使用 `unknown` 替代
2. **包管理规范** - 仅使用 bun，禁止 npm/yarn
3. **架构依赖顺序** - core → schema → auth → crud → trpc → ui → console
4. **功能复用原则** - 必须使用 LinchKit 内部包功能，禁止重复实现
5. **质量标准** - 测试覆盖率 core>90%, 其他>80%，构建时间<10秒
6. **🤖 AI智能开发助手使用规范** - Claude作为智能开发伙伴的正确工作方式

### 🎯 AI助手工作流程

**用户自然语言请求 → Claude理解分析 → 调用查询工具 → Claude执行开发**

```
示例：
用户: "我要给user加一个生日字段"
  ↓
Claude分析: 这是添加字段需求，目标实体User，字段名birthday
  ↓  
Claude查询: bun scripts/ai/context-cli.js --find-entity "User" --include-related
  ↓
工具返回: User的schema位置、相关API/UI文件、实现建议
  ↓
Claude执行: 编辑schema → 创建迁移 → 更新API → 更新UI → 运行测试
```

### 🛠️ 简化的查询接口

**▶️ 使用统一工具替代复杂命令：**

```bash
# 1. 查找实体定义和相关文件
bun run ai:session query "User"
bun run ai:session query "Product"

# 2. 查找符号定义
bun run ai:session symbol "UserSchema"
bun run ai:session symbol "createUser"

# 3. 查找实现模式
bun run ai:session pattern "add_field" "User"
bun run ai:session pattern "create_api" "Product"
```

### 🚨 强制使用场景

**🔴 所有AI开发、文档、分析操作都必须先通过Neo4j图谱获取项目上下文：**

#### 代码开发场景
1. **添加字段**: `--find-entity "EntityName" --include-related`
2. **创建API**: `--find-pattern "create_api" --for-entity "EntityName"`
3. **修改现有功能**: `--find-symbol "FunctionName"`
4. **创建新组件**: `--find-pattern "create_component"`
5. **集成第三方库**: `--find-pattern "integration"`
6. **重构代码**: `--find-entity "TargetEntity" --include-related`
7. **调试问题**: `--find-symbol "ProblemFunction"`

#### 文档操作场景
8. **编写文档**: 查询相关代码实体确保准确性
9. **更新API文档**: `--find-symbol "APIFunction"`
10. **架构分析**: `--find-pattern "architecture_pattern"`

#### 分析和决策场景
11. **技术选型**: 查询现有技术栈和依赖关系
12. **影响分析**: 查询变更影响的相关组件
13. **代码审查**: 验证代码一致性和最佳实践

### 📋 Claude的标准工作模式

**Phase 1: 理解用户需求**
```typescript
// Claude内部分析（示例）
const userRequest = "我要给user加一个生日字段"
const analysis = {
  action: "add_field",
  entity: "User", 
  field: "birthday",
  type: "Date"
}
```

**Phase 2: 查询项目上下文**
```bash
# Claude必须调用工具获取信息
bun run ai:session query "User"
```

**Phase 3: 基于查询结果执行开发**
```typescript
// 根据工具返回的信息，Claude使用现有工具：
await Read(userSchemaPath)      // 读取schema文件
await Edit(userSchemaPath, ...) // 编辑添加字段
await Bash("bunx prisma migrate dev") // 创建迁移
// ... 继续其他步骤
```

### 🎯 工具返回的结构化信息

```json
{
  "success": true,
  "results": {
    "primary_target": {
      "name": "User",
      "file_path": "packages/schema/src/user.ts",
      "current_fields": ["id", "name", "email"]
    },
    "related_files": {
      "schemas": ["packages/schema/src/user.ts"],
      "apis": ["packages/trpc/src/user.ts"],
      "ui_components": ["packages/ui/src/forms/UserForm.tsx"]
    },
    "suggestions": {
      "add_field": {
        "steps": [
          "1. 编辑 packages/schema/src/user.ts 更新Schema定义",
          "2. 运行 bunx prisma migrate dev 创建数据库迁移",
          "3. 更新相关的tRPC API procedures",
          "4. 更新相关的UI表单组件"
        ]
      }
    }
  }
}
```

### ⚠️ 严格禁止的行为

**❌ 绝不允许：**
- 直接猜测文件位置和代码结构
- 在没有查询工具信息的情况下修改代码
- 忽略工具返回的实现建议
- 创建与现有模式不一致的代码
- **跳过Neo4j上下文查询，直接进行任何代码操作**
- **基于记忆或假设进行架构分析或技术决策**
- **不验证代码一致性就编写文档或注释**

**✅ 必须遵循：**
- **每次AI操作前必须通过Neo4j图谱查询获取准确的项目上下文**
- 严格按照工具建议的文件路径和模式
- 使用工具返回的相关文件列表
- 遵循LinchKit的架构约束和最佳实践
- **所有代码分析、文档编写、架构决策都基于实时图谱数据**
- **任何技术选型或影响分析都先查询现有依赖关系**

### 🎪 完整示例：Claude处理添加字段请求

```
用户: "给User添加一个phone字段"

Claude: 我来帮你为User添加phone字段。首先让我查询User实体的相关信息...

[调用工具]
$ bun run ai:session query "User"

我发现User定义在 packages/schema/src/user.ts，当前包含字段：id, name, email

相关文件：
- Schema: packages/schema/src/user.ts  
- API: packages/trpc/src/user.ts
- UI: packages/ui/src/forms/UserForm.tsx

现在我来执行以下步骤：

1. 更新User Schema...
[使用Edit工具修改packages/schema/src/user.ts]

2. 创建数据库迁移...
[使用Bash工具运行bunx prisma migrate dev]

3. 更新相关API...
[继续执行其他步骤]

4. 同步图谱数据...
[运行 bun run ai:session sync]

完成！User现在支持phone字段了。
```

**核心原则：Claude负责理解和执行，工具负责提供准确的项目信息**

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
- [ ] 0. 包复用检查：bun check-reuse [关键词]
- [ ] 1. 创建功能分支 feature/[task-name]
- [ ] 2. 创建临时设计文档 DESIGN.md（如为集成/实验任务）
- [ ] 3. [具体实现步骤1] 
- [ ] 4. [具体实现步骤2]
- [ ] 5. ESLint质量检查：修复所有错误（禁止使用eslint-disable）
- [ ] 6. 编写/更新测试用例
- [ ] 7. 运行 bun validate 验证
- [ ] 8. 文档整合：将临时文档内容整合到主文档体系
- [ ] 9. 更新文档 (changelog/roadmap/development-status)
- [ ] 10. 提交符合规范的 commit
- [ ] 11. 提醒用户创建 PR
- [ ] 12. PR 合并后删除本地和远程分支

**包复用检查**: 必须在步骤0执行，确认无重复实现
**文档整合**: 步骤8必须按照 workflow_and_constraints.md 中的整合策略执行
**质量要求**: 构建成功 + ESLint通过 + 测试通过 + 文档同步 + 临时文档清理
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
- [ ] **代码质量** - 运行 `bun lint` 无错误
- [ ] **测试通过** - 运行 `bun test` 全部通过
- [ ] **构建验证** - 运行 `bun build` 成功
- [ ] **🔴 图谱数据同步** - 运行 `bun scripts/ai/graph-data-extractor.js` 更新Neo4j数据
- [ ] **🔴 查询功能验证** - 验证AI上下文查询工具正常工作
- [ ] **文档整合** - 临时文档已整合到主文档体系，无信息冗余
- [ ] **文档更新** - 更新 README/CHANGELOG 或相关文档
- [ ] **规范提交** - 遵循 Conventional Commits 格式
- [ ] **分支整洁** - 工作分支相对于目标分支干净
- [ ] **临时清理** - 临时文档已删除或整合到主文档体系

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
- **临时文档整合** - 将开发过程中的 DESIGN.md 等临时文档整合到主文档体系
- **changelog** - 记录新功能和修复
- **roadmap** - 调整任务状态和优先级  
- **约束文档** - 新增规范和最佳实践
- **临时文档清理** - 删除已整合的临时文档，避免信息冗余

### 🔄 AI上下文数据同步自动化 (强制执行)
**🔴 每次代码提交前必须执行以下数据同步检查：**

#### 强制同步触发条件
- **添加新文件**: 立即更新图谱数据
- **修改Schema/实体**: 必须更新图谱数据
- **添加新函数/类**: 必须更新图谱数据
- **修改包依赖**: 必须更新图谱数据
- **重构代码结构**: 必须更新图谱数据

#### 强制执行流程
1. **图谱数据提取** - 运行 `bun scripts/ai/graph-data-extractor.js` 重新分析代码
2. **数据质量验证** - 检查节点数量、关系完整性、查询性能
3. **工具功能测试** - 验证关键实体查询是否正常工作
4. **性能基准检查** - 确保查询时间保持在1.4-2.3s范围内
5. **提交图谱数据** - 将更新的图谱数据包含在提交中

#### 验证命令
```bash
# 必须在每次代码提交前运行
bun run ai:session sync
bun run ai:session validate
```

### 🔒 安全检查自动化
- **敏感信息扫描** - 提交前检查密钥、Token
- **依赖安全** - 运行 `bun audit` 检查漏洞
- **环境变量** - 验证配置使用规范

### ⚠️ 违规处理自动化
- **立即阻止** - 发现违规立即停止操作
- **自动回滚** - 使用 `git restore` 撤销不当更改
- **流程重启** - 要求按正确流程重新执行
- **预防更新** - 自动更新相关文档防止重复错误

## 🌳 分支并行开发管理

### 🚨 分支使用规范

**核心原则**: 所有开发工作必须在专门的功能分支中进行，确保主分支的稳定性

#### 1. 环境检查与创建
```bash
# 检查当前环境
pwd                           # 确认当前目录
git branch --show-current     # 确认当前分支
git status                   # 查看工作目录状态

# 如不在 main 分支，先切换到 main
git checkout main
git pull origin main          # 获取最新更新

# 创建新的功能分支
git checkout -b feature/your-task-name
```

#### 2. 已有分支的处理
```bash
# 查看所有分支
git branch -a

# 切换到已存在的功能分支
git checkout feature/existing-feature

# 清理不需要的本地分支
git branch -d feature/feature-name
# 清理远程分支
git push origin --delete feature/feature-name
```

#### 3. 违规检测与处理
- **发现在受保护分支工作**: 立即停止，创建功能分支
- **发现分支状态不正确**: 修正分支或重新创建
- **工作目录有未提交更改**: 先处理更改再继续

## 🎯 具体场景开发指导

### 📋 新功能开发流程
1. **需求分析** - 使用 TodoWrite 分解功能需求
2. **架构设计** - 参考 [ai-context/02-architecture/](./ai-context/02-architecture/) 确定设计
3. **查询文档** - 优先使用 Context7（添加 "use context7"），备用 WebSearch/WebFetch
4. **编码实现** - 严格遵循 [ai-context/03-workflows/development-workflow.md](./ai-context/03-workflows/development-workflow.md) 约束
5. **测试验证** - 运行 `bun validate` 确保质量
6. **文档更新** - 更新 [ai-context/05-planning/development-status.md](./ai-context/05-planning/development-status.md) 记录完成功能

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