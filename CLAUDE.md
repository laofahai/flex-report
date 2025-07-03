# LinchKit AI 开发助手指导

**版本**: v6.0  
**更新**: 2025-07-03  
**项目**: LinchKit - AI-First 全栈开发框架

## ⚠️ Session 启动检查清单

**每次新 session 必须完成：**
1. **任务状态**: 使用 TodoRead 检查待办事项
2. **知识库导航**: 阅读 [ai-context/README.md](./ai-context/README.md) 获取文档地图
3. **强制约束**: **必读** [ai-context/workflow_and_constraints.md](./ai-context/workflow_and_constraints.md) 了解开发规范
4. **当前任务**: 查看 [ai-context/roadmap.md](./ai-context/roadmap.md) 了解进行中任务
5. **分支检查**: 如在 main 分支则创建功能分支
6. **确认完成**: 确保所有初始化步骤完成

**📝 用户开始开发的标准 Prompt:**
```
请开始 [具体任务描述]。

注意：我已按照 CLAUDE.md 完成 Session 初始化，请直接开始开发。
```

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

## 💡 AI 开发模式

### 开发流程
当用户开始新任务时：
1. **文档导航** - 阅读 [ai-context/README.md](./ai-context/README.md) 了解文档结构
2. **理解愿景** - 快速浏览 [ai-context/vision_and_scope.md](./ai-context/vision_and_scope.md) 了解项目目标
3. **掌握架构** - 参考 [ai-context/system_architecture/](./ai-context/system_architecture/) 理解系统设计
4. **遵循规范** - **必读** [ai-context/workflow_and_constraints.md](./ai-context/workflow_and_constraints.md) 中的约束
5. **了解现状** - 查看 [ai-context/roadmap.md](./ai-context/roadmap.md) 了解当前进度
6. **规划任务** - 使用 TodoWrite 工具制定详细任务计划
7. **实施开发** - 严格遵循架构和约束
8. **验证结果** - 运行测试和构建
9. **更新文档** - 记录进度和变更

### 🎯 任务管理强制要求
- **必须使用 TodoWrite** - 复杂任务（3步以上）必须创建待办清单
- **单一任务进行** - 同时只能有一个任务标记为 in_progress
- **实时状态更新** - 开始任务立即标记 in_progress
- **及时完成标记** - 任务完成立即标记 completed，不可批量处理
- **频繁状态检查** - 每次新操作前使用 TodoRead 检查进度
- **任务失败处理** - 遇到阻塞时保持 in_progress，创建新任务描述问题

### 开发检查清单
- [ ] 已读取最新开发状态？
- [ ] 理解所有开发约束？
- [ ] 创建了任务待办清单？
- [ ] 使用正确的包功能？
- [ ] 遵循依赖顺序？
- [ ] 通过所有验证？

### 🚀 当前特性
- **统一工作台** - /dashboard 基于角色的模块化架构
- **角色权限** - SUPER_ADMIN、TENANT_ADMIN、USER
- **现代UI** - shadcn/ui + Tailwind CSS v4 + 主题系统
- **企业功能** - 多租户、权限管理、审计日志
- **文档平台** - apps/website Nextra 4 + i18n + 主题切换

## 📖 Context7 文档查询

### 🎯 优先查询的库
使用第三方技术时必须优先查询 Context7 文档：
- **Next.js** - 框架配置、路由、API 等
- **React** - Hooks、组件、状态管理等
- **TypeScript** - 类型定义、最佳实践等
- **Tailwind CSS** - 样式配置、组件样式等
- **Prisma** - 数据库操作、Schema 设计等
- **tRPC** - API 设计、类型安全等
- **Zod** - Schema 验证、类型推导等

### 🔄 自动查询触发条件
- **新技术使用** - 首次使用某个第三方库时，务必添加 "use context7"
- **配置问题** - 遇到框架配置相关错误时，优先使用 Context7
- **最佳实践** - 需要确认官方推荐做法时，强制使用 Context7
- **版本更新** - 使用新版本特性时，必须通过 Context7 获取最新文档

### 查询流程
1. **识别需求** - 判断是否需要查询第三方库文档
2. **使用 Context7** - 在提示中添加 "use context7" 关键词
3. **获取实时文档** - Context7 自动获取最新官方文档
4. **基于文档实现** - 按照官方最佳实践进行开发

### 🛠️ Context7 使用方式
在任何第三方库开发任务中添加 "use context7" 关键词即可自动获取最新官方文档。

**使用示例**：
- "配置 Next.js 15 App Router 路由。use context7"
- "使用 Prisma 创建用户模型。use context7"
- "集成 tRPC 与 React Query。use context7"

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
1. **任务状态**: 使用 TodoRead 检查待办事项
2. **文档导航**: 阅读 [ai-context/README.md](./ai-context/README.md)
3. **约束理解**: 阅读 [ai-context/workflow_and_constraints.md](./ai-context/workflow_and_constraints.md)
4. **分支检查**: 如在 main 分支则创建功能分支
5. **确认完成**: 确保所有初始化步骤完成

### 🌳 分支管理
- **禁止 main 分支工作** - 发现在 main 分支立即创建新分支
- **自动创建分支**:
  ```bash
  git checkout -b feature/task-description
  git checkout -b fix/issue-description  
  git checkout -b release/version-number
  ```
- **功能完成提醒** - 完成开发时提醒创建 PR

### 🚀 发布安全
- 阻止手动发布命令（`npm publish`, `pnpm publish`）
- 强制使用 `pnpm changeset` 流程
- 发布前运行完整验证

### 📝 文档同步
功能开发完成时自动提醒更新：
- **ai-context 文档** - 使用 MD 链接引用，避免重复信息
- **changelog更新** - 完成功能后立即更新 [ai-context/changelog.md](./ai-context/changelog.md)
- **roadmap调整** - 任务变更时更新 [ai-context/roadmap.md](./ai-context/roadmap.md)
- **约束新增** - 新约束添加到 [ai-context/workflow_and_constraints.md](./ai-context/workflow_and_constraints.md)

### 🎯 Session 连续性管理
- **状态保持** - 使用 TodoRead 开始新 session 时检查待办事项
- **上下文继承** - 基于 [ai-context/roadmap.md](./ai-context/roadmap.md) 了解项目当前状态
- **任务优先级** - 从高优先级任务开始继续工作
- **进度同步** - 及时更新文档和任务状态

### 🔒 安全检查
- 提交前扫描敏感信息（密钥、Token）
- 运行 `pnpm audit` 检查依赖安全
- 验证环境变量使用

### 📖 Context7 强制优先
- **强制使用** - 第三方库开发必须优先使用 Context7
- **自动触发** - 检测到技术栈关键词自动提醒使用 "use context7"
- **实时文档** - 获取最新版本的官方文档，避免过时信息
- **标准实现** - 严格按照 Context7 提供的最新最佳实践执行

### ⚠️ 违规处理和错误恢复
- **立即停止** - 发现违规立即停止当前操作
- **错误回滚** - 使用 `git restore` 撤销不符合规范的更改
- **替代方案** - 提供符合 LinchKit 约束的正确实现方式
- **流程重启** - 要求按正确流程重新执行
- **预防措施** - 更新相关文档防止同类问题再次发生

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