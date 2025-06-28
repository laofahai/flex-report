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

---

## 🔄 强制性工作流程

### 开发阶段
1. **信息收集**: 了解现状和需求
2. **全包重写**: 按照开发计划执行阶段性重写
3. **编辑修改**: 重写时创建新文件，修改时使用编辑工具
4. **验证测试**: 运行完整验证流程
5. **进度保存**: 每次开发会话结束前保存进度

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