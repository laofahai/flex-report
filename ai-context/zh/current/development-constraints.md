# LinchKit 开发约束

**版本**: v4.0  
**更新**: 2025-06-30  
**状态**: 生产级约束

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

必须使用 LinchKit 内部功能：
- **日志**: `@linch-kit/core` logger
- **配置**: `@linch-kit/core` ConfigManager  
- **Schema**: `@linch-kit/schema` defineEntity
- **权限**: `@linch-kit/auth` PermissionChecker
- **CRUD**: `@linch-kit/crud` createCRUD
- **UI**: `@linch-kit/ui` 组件库

---

这些约束确保 LinchKit 框架的一致性、安全性和可维护性。