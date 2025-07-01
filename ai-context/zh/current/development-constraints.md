# LinchKit 开发约束 - Session 持久化指南

**版本**: v5.0  
**更新**: 2025-07-01  
**状态**: Session 级强制约束  
**重要性**: ⚠️ **必须在每个 session 开始时阅读**

---

## 🔴 SESSION 级强制要求

### ⚠️ 每次新 session 必须执行
```bash
# 1. 环境设置（必须）
export PATH="/home/laofahai/.nvm/versions/node/v20.19.2/bin:$PATH"

# 2. 阅读当前状态（必须）
cat ai-context/zh/current/development-status.md

# 3. 理解开发约束（本文档）
cat ai-context/zh/current/development-constraints.md
```

### 📋 Session 检查清单
- [ ] ✅ 已设置正确的 Node.js 环境路径？
- [ ] ✅ 已阅读最新开发状态文档？  
- [ ] ✅ 理解当前项目阶段和任务？
- [ ] ✅ 确认要使用的技术约束？

---

## 🚨 核心约束

### 1. TypeScript 严格模式
- **禁止 `any` 类型**，使用 `unknown` 替代
- **严格模式**，所有文件使用 TypeScript
- **端到端类型安全**

### 2. 包管理规范
- **仅使用 pnpm**，禁止 npm/yarn
- **环境路径**:
  ```bash
  export PATH="/home/laofahai/.nvm/versions/node/v20.19.2/bin:$PATH"
  ```

### 3. 架构依赖顺序
```
core → schema → auth → crud → trpc → ui → console
```
- **禁止循环依赖**
- **必须使用 LinchKit 内部包功能**，禁止重复实现

### 4. 构建质量标准
- **测试覆盖率** > 80% (core > 90%)
- **构建时间** < 10秒
- **无 ESLint 错误**

### 5. UI 组件规范
- **shadcn/ui 组件** 使用 `pnpm dlx shadcn@latest add [component]`
- **必须导出** 到 `@linch-kit/ui/components`

### 6. Tailwind CSS 4 规范
- **统一配置源**: 所有样式从 `@linch-kit/ui/src/styles/globals.css` 引用
- **CSS-first 配置**: 使用 `@import "tailwindcss"` 和 `@theme` 指令
- **禁用 tailwind.config.js**: 使用 CSS 文件配置主题
- **动画库**: 使用 `tw-animate-css` 替代 `tailwindcss-animate`
- **主题变量**: 使用 `hsl()` 包装所有颜色变量

---

## 🛠️ 开发流程

### 必须命令
```bash
# 开发
pnpm dev

# 验证
pnpm build
pnpm test

# 完整验证
pnpm validate
```

### 代码规范
- **JSDoc 注释** 所有公共 API
- **修改后运行** ESLint 自动修复
- **类型安全** 优先于代码简洁

---

## 🔒 安全要求

- **禁止提交敏感信息** (密钥、Token)
- **使用环境变量** 管理配置
- **定期安全检查** `pnpm audit`

---

## 📦 包功能复用

### 强制使用 LinchKit 内部功能
**绝对禁止**重新实现已有功能，必须复用：
- **日志系统**: `@linch-kit/core` logger - 不要用 console.log 或其他日志库
- **配置管理**: `@linch-kit/core` ConfigManager - 不要自己读取配置文件
- **Schema定义**: `@linch-kit/schema` defineEntity - 不要直接用 Zod
- **权限检查**: `@linch-kit/auth` PermissionChecker - 不要自己实现权限逻辑
- **CRUD操作**: `@linch-kit/crud` createCRUD - 不要手写增删改查
- **UI组件**: `@linch-kit/ui` 组件库 - 不要重复创建基础组件

### 第三方库使用规范
- **必须通过 LinchKit 包**访问第三方库功能
- **禁止直接依赖**已被 LinchKit 封装的库
- **新依赖需评估**是否应该封装到 LinchKit 包中

---

## 📖 文档查询规范

### Context7 使用
开发前必须查询相关技术文档：
1. **框架文档优先** - Next.js、React、Vue 等使用 Context7
2. **调用流程**:
   - 先调用 `resolve-library-id` 获取库ID
   - 再调用 `get-library-docs` 获取文档
3. **最佳实践** - 实现功能前先了解官方推荐做法

### 文档驱动开发
- 查询文档 → 理解最佳实践 → 设计实现 → 编写代码

---

这些约束确保 LinchKit 框架的一致性、安全性和可维护性。