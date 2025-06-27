# LinchKit Auth 包修复 - 下一个 Session 继续任务

## 🚨 紧急任务状态

### 当前问题
**Schema 包架构错误已识别并部分修复，但仍有类型错误需要解决**

### 立即需要完成的任务

#### 1. 修复 Schema 包类型错误（最高优先级）
**位置**：`packages/schema/src/`
**问题**：DTS 构建失败，有以下类型错误需要修复：

```
src/generators/prisma.ts:18:9 - Property 'generate' 方法签名不匹配
src/generators/prisma.ts:150:22 - Property 'integer' 不存在于 NumberFieldOptions
src/generators/prisma.ts:195:15 - Property 'defaultValue' 不存在于 FieldDefinition
src/generators/prisma.ts:270:15 - Property 'foreignKey' 不存在于 RelationFieldOptions
```

**修复方案**：
1. 修复 BaseGenerator 接口，统一 generate 方法签名
2. 在字段类型中添加缺失的属性：
   - NumberFieldOptions 添加 `integer?: boolean`
   - FieldDefinition 添加 `defaultValue?: any`
   - RelationFieldOptions 添加 `foreignKey?: string`
3. 修复 TypeScriptGenerator 的相同问题

#### 2. 验证架构正确性（重要）
**确保 Schema 包职责正确**：
- ✅ Schema 定义和类型推导
- ✅ 代码生成（Prisma、TypeScript、Zod）
- ❌ 绝对不包含数据库 CRUD 操作
- ❌ 绝对不包含实际的数据库连接

#### 3. PostgreSQL 集成配置（用户需求）
**数据库信息**：
- 连接字符串：`postgresql://postgres.iebhnslvlnvisxkjdyeb:[PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres`
- 密码：`yAsWznyTkE4Dho1W`（不要存储在代码中）

**需要配置**：
1. 在 Starter 应用中配置 Prisma 连接
2. 设置环境变量管理
3. 配置用户权限和数据库迁移

#### 4. 完整项目验证
**验证命令**：
```bash
cd /home/laofahai/workspace/linch-kit
export PATH="/home/laofahai/.nvm/versions/node/v20.19.2/bin:$PATH"
pnpm build && pnpm check-types && pnpm lint && pnpm test
```

**成功标准**：
- 所有包构建成功
- TypeScript DTS 构建时间 < 30 秒
- 零 ESLint 错误
- 所有测试通过
- Starter 应用认证流程正常

## 📋 已完成的工作（不要重复）

### ✅ Auth 包修复完成
- ESLint 错误：3个错误已全部修复
- 测试套件：56个测试全部通过
- Starter 应用：集成更新完成，构建成功
- 架构重构：基于 NextAuth.js v5，命名规范统一

### ✅ 架构错误识别和修复
- 发现并移除了 Schema 包中错误的 CRUD 方法
- 明确了包职责分工：
  - Schema：定义 + 生成
  - CRUD：数据操作
  - tRPC：API 层

## 🎯 执行指导

### 开发约束（严格遵循）
1. **绝对不简化任何功能** - 保持所有企业级特性完整
2. **严格遵循架构分层** - Schema 包不能包含数据库操作
3. **使用成熟第三方库** - 避免重复造轮子
4. **保持类型安全** - 禁止使用 `any` 类型
5. **DTS 构建时间** - 必须 < 30 秒

### 技术规范
- 所有文件使用 TypeScript (.ts/.tsx)
- 使用 pnpm 包管理器
- 命令前缀：`export PATH="/home/laofahai/.nvm/versions/node/v20.19.2/bin:$PATH"`
- 认证命名：sign-in/sign-out（不是 login/logout）

### 文档更新
完成后更新：
- `ai-context/zh/project/auth-package-fix-progress.md`
- 标记任务完成状态
- 记录最终验证结果

## 🔄 继续任务的 Prompt

```
请继续完成 LinchKit 项目中 @linch-kit/auth 包的修复工作。

当前状态：
- Auth 包本身已修复完成（ESLint、测试、集成都通过）
- 发现并修复了 Schema 包的架构错误（移除了错误的 CRUD 方法）
- 但 Schema 包仍有类型错误导致 DTS 构建失败

立即任务：
1. 修复 packages/schema/src/generators/ 中的类型错误
2. 配置 PostgreSQL 数据库集成（Supabase）
3. 运行完整项目验证，确保所有包构建成功

请严格遵循 LinchKit 架构设计，不要简化任何功能，确保企业级特性完整。
```

## 📞 用户问题回答

### 关于配置项和用户权限
**配置管理**：
- 使用 `linch.config.ts` 统一配置文件
- 环境变量通过 `.env` 文件管理
- 权限配置集成在 Schema 定义中

**用户权限系统**：
- 基于 CASL 的 RBAC/ABAC 权限控制
- Schema 级别的权限定义
- 与 PostgreSQL 的用户表集成

### 关于 PostgreSQL 集成
**是的，现在需要 PostgreSQL**：
- Starter 应用需要真实的数据库连接
- 用户认证需要持久化存储
- 权限和配置需要数据库支持

**集成方案**：
- 使用 Prisma 作为 ORM
- 基于 Schema 包生成的 Prisma 模型
- 通过 CRUD 包进行数据操作
- 通过 tRPC 包提供 API 接口
