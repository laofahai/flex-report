# LinchKit 开发强制约束

**版本**: v3.0  
**更新**: 2025-06-28  
**状态**: 🔒 强制执行

---

## 🚨 绝对禁止违反的约束

### 1. TypeScript 强制要求
- **所有文件必须使用 TypeScript (.ts/.tsx)**，禁止 .js/.jsx 文件
- **严格模式**，禁止使用 `any` 类型
- **使用 `z.unknown()` 替代 `z.any()`**
- **禁止使用 `module` 作为变量名**

### 2. 包管理强制规范
- **必须使用 pnpm 包管理器**，禁止 npm/yarn
- **禁止手动编辑包配置文件** (package.json, pnpm-lock.yaml 等)
- **运行命令必须使用环境前缀**:
  ```bash
  export PATH="/home/laofahai/.nvm/versions/node/v20.19.2/bin:$PATH"
  ```

### 3. 架构依赖强制要求
- **依赖顺序**: core → schema → auth → crud → trpc → ui → console → ai
- **禁止循环依赖**
- **优先使用第三方库**，不重复造轮子
- **必须使用 LinchKit 内部包功能**：
  - 日志系统：必须使用 `@linch-kit/core` 的 logger
  - 国际化：必须使用 `@linch-kit/core` 的 i18n
  - 配置管理：必须使用 `@linch-kit/core` 的 config
  - 插件系统：必须使用 `@linch-kit/core` 的 plugin
  - Schema定义：必须使用 `@linch-kit/schema` 的 defineEntity/defineField
  - 权限控制：必须使用 `@linch-kit/auth` 的权限系统
  - CRUD操作：必须使用 `@linch-kit/crud` 的数据操作
- **适配器模式**保持接口一致性

### 4. 国际化强制要求
- **所有包必须支持国际化**
- **禁止自行实现 i18n 功能**，必须使用 @linch-kit/core 的 i18n 系统
- **至少支持英文 (en) 和中文 (zh-CN)**

### 5. 代码质量强制标准
- **修改后必须运行 `npx eslint --fix`**
- **所有公共 API 必须有 JSDoc 注释**
- **测试覆盖率**: core>90%, 其他>80%
- **DTS 构建时间 < 10秒**

### 6. 安全性强制要求
- **禁止提交任何密钥、Token、密码等敏感信息**
- **必须使用 .env + dotenv-safe 管理环境变量**
- **定期运行 `pnpm audit` 检查依赖安全**

### 7. UI 组件强制要求
- **所有 shadcn/ui 组件必须使用 `pnpm dlx shadcn@latest add [component-name]` 安装**
- **禁止手动创建 shadcn 组件文件**，防止版本不一致
- **组件安装后自动放置在 `packages/ui/src/components/ui/` 目录**
- **必须在 `packages/ui/src/components/index.ts` 中导出新添加的组件**

### 8. 模块化开发强制要求
- **模块定位**: modules/ 作为业务模块，plugins/ 作为功能插件
- **独立发布**: 所有模块都作为独立 npm 包发布
- **不重复实现**: 模块只能组合和扩展 packages/* 的功能
- **Schema 驱动**: 所有模块必须从 Schema 定义开始
- **Starter 集成**: 数据库 schema 和 Prisma 配置在 Starter 中生成
- **布局分离**: 模块提供功能和路由，布局由应用层实现

---

## 🔄 强制性工作流程

### 开发阶段
1. **信息收集**: 了解现状和需求
2. **Schema 定义**: 🚨 **首要步骤** - 使用 @linch-kit/schema 定义所有实体模型
3. **服务层实现**: 使用 @linch-kit/crud 实现数据操作服务
4. **API 层实现**: 使用 @linch-kit/trpc 创建类型安全 API
5. **UI 层实现**: 使用 @linch-kit/ui 构建界面组件
6. **集成验证**: 在 starter 应用中验证模块功能
7. **进度保存**: 每次开发会话结束前保存进度

### 验证命令
```bash
pnpm build      # 构建验证
pnpm lint       # 代码检查
pnpm test       # 测试验证
pnpm type-check # 类型检查
```

---

## 🛡️ 质量检查点

### 每次提交前必须
- [ ] ESLint 检查 100% 通过
- [ ] TypeScript 类型检查通过
- [ ] 单元测试覆盖率达标
- [ ] DTS 构建时间验证
- [ ] 集成测试通过

### 每个包完成必须
- [ ] 所有设计功能完整实现
- [ ] 测试覆盖率达到要求
- [ ] 文档完整更新
- [ ] 在 starter-app 中验证

---

## ⚠️ 违反后果

任何违反这些约束的代码都必须立即修复，优先级：
**安全 > 架构一致性 > 代码质量 > 性能**