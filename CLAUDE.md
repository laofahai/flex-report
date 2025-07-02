# LinchKit AI 开发助手指导

**版本**: v5.0  
**更新**: 2025-07-02  
**项目**: LinchKit - AI-First 全栈开发框架

## ⚠️ Session 启动检查清单

**每次新 session 必须完成：**
1. **环境设置**: `export PATH="/home/laofahai/.nvm/versions/node/v20.19.2/bin:$PATH"`
2. **阅读状态**: `ai-context/zh/current/development-status.md`
3. **理解约束**: `ai-context/zh/current/development-constraints.md`
4. **分支检查**: 确保不在 main 分支上工作

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
L4: @linch-kit/ai        ⏳ AI集成（规划中）
```

### 🛠️ 开发命令
```bash
# 环境设置（每次必须）
export PATH="/home/laofahai/.nvm/versions/node/v20.19.2/bin:$PATH"

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
- **认证**: NextAuth + @linch-kit/auth

### 📦 包功能速查
- **@linch-kit/core** - 日志、配置、插件系统
- **@linch-kit/schema** - Schema定义、验证、转换
- **@linch-kit/auth** - 认证、授权、会话管理
- **@linch-kit/crud** - 通用CRUD操作
- **@linch-kit/trpc** - 类型安全API
- **@linch-kit/ui** - UI组件库

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

## 🔒 基础约束

必须严格遵守以下约束（详见 `ai-context/zh/current/development-constraints.md`）：

1. **TypeScript 严格模式** - 禁止使用 `any`，使用 `unknown` 替代
2. **包管理规范** - 仅使用 pnpm，禁止 npm/yarn
3. **架构依赖顺序** - core → schema → auth → crud → trpc → ui → console
4. **功能复用原则** - 必须使用 LinchKit 内部包功能，禁止重复实现
5. **质量标准** - 测试覆盖率 core>90%, 其他>80%，构建时间<10秒

## 💡 AI 开发模式

### 开发流程
当用户开始新任务时：
1. **阅读状态** - 检查 `development-status.md` 了解当前进度
2. **理解约束** - 确认 `development-constraints.md` 中的规范
3. **确定任务** - 从开发状态文档中选择下一个任务
4. **实施开发** - 严格遵循架构和约束
5. **验证结果** - 运行测试和构建
6. **更新文档** - 记录进度和变更

### 开发检查清单
- [ ] 已读取最新开发状态？
- [ ] 理解所有开发约束？
- [ ] 使用正确的包功能？
- [ ] 遵循依赖顺序？
- [ ] 通过所有验证？

### 🚀 当前特性
- **统一工作台** - /dashboard 基于角色的模块化架构
- **角色权限** - SUPER_ADMIN、TENANT_ADMIN、USER
- **现代UI** - shadcn/ui + Tailwind CSS v4 + 主题系统
- **企业功能** - 多租户、权限管理、审计日志

## 📖 Context7 文档查询

### 🎯 优先查询的库
使用第三方技术时建议查询 Context7 文档：
- **Next.js** - 框架配置、路由、API 等
- **React** - Hooks、组件、状态管理等
- **TypeScript** - 类型定义、最佳实践等
- **Tailwind CSS** - 样式配置、组件样式等
- **Prisma** - 数据库操作、Schema 设计等
- **tRPC** - API 设计、类型安全等
- **Zod** - Schema 验证、类型推导等

### 查询流程
1. **识别需求** - 判断是否需要查询第三方库文档
2. **调用 resolve-library-id** - 获取 Context7 兼容的库ID
3. **调用 get-library-docs** - 获取最新官方文档
4. **基于文档实现** - 按照官方最佳实践进行开发

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

## 🤖 AI 助手强制执行规范

### 🔴 Session 初始化
每次新 session 自动执行：
1. 环境路径设置和文档阅读
2. Git 分支检查，如在 main 分支则创建功能分支
3. 确认初始化步骤完成

### 🌳 分支管理
- 禁止在 main 分支上工作
- 自动创建功能分支（`feature/`, `fix/`, `release/` 前缀）
- 功能完成时提醒创建 PR

### 🚀 发布安全
- 阻止手动发布命令（`npm publish`, `pnpm publish`）
- 强制使用 `pnpm changeset` 流程
- 发布前运行完整验证

### 📝 文档同步
功能开发完成时自动提醒更新：
- **ai-context 文档** - development-status.md, packages-api-reference.md
- **website 文档** - apps/website 下的用户文档（中英文）
- **生成模板** - 为新功能生成文档模板和示例代码

### 🔒 安全检查
- 提交前扫描敏感信息（密钥、Token）
- 运行 `pnpm audit` 检查依赖安全
- 验证环境变量使用

### 📖 Context7 自动查询
- 检测第三方库使用时自动触发文档查询
- 确保实现符合官方最佳实践

### ⚠️ 违规处理
- 发现违规立即停止操作
- 提供符合规范的替代方案
- 要求按正确流程重新执行