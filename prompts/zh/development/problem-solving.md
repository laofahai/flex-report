# Linch Kit 问题解决提示词

## 目的

指导 AI 助手系统性地诊断和解决 Linch Kit 项目中遇到的各种技术问题，确保问题解决的效率和质量。

## 上下文

**参考文档**: 
- `ai-context/zh/reference/troubleshooting.md`
- `ai-context/zh/management/handover-guide.md`
- `ai-context/zh/management/current-progress.md`

Linch Kit 项目采用复杂的 Monorepo 架构，包含多个相互依赖的包，需要系统性的问题诊断方法。

## 问题诊断流程

### 1. 问题分类识别

#### CLI 相关问题 🔥 **当前最高优先级**
**症状**: 
- `linch plugin-list` 显示 "Unknown command"
- CLI 命令无法正常工作
- 插件加载失败

**诊断步骤**:
```bash
# 1. 检查基础 CLI 功能
cd /home/laofahai/workspace/linch-kit/apps/starter
pnpm linch --help

# 2. 检查工作目录
pwd  # 应该在正确的项目目录

# 3. 检查关键文件
ls -la scripts/linch.js
ls -la linch.config.ts
```

**参考**: `ai-context/zh/reference/troubleshooting.md#cli-问题`

#### 构建相关问题
**症状**:
- `pnpm build` 失败
- TypeScript 编译错误
- 包依赖问题

**诊断步骤**:
```bash
# 1. 清理构建缓存
pnpm clean

# 2. 重新安装依赖
rm -rf node_modules
pnpm install

# 3. 检查 TypeScript 错误
pnpm type-check

# 4. 逐个包构建
cd packages/core && pnpm build
```

#### Schema 相关问题
**症状**:
- Schema 命令无法找到实体
- Prisma 生成失败
- 类型定义错误

**诊断步骤**:
```bash
# 1. 检查实体文件
ls -la apps/starter/app/_lib/schemas/

# 2. 验证配置
cat apps/starter/linch.config.ts

# 3. 测试 Schema 命令
pnpm linch schema-list
```

### 2. 系统性诊断方法

#### 步骤 1: 环境验证
```bash
# 检查 Node.js 版本
node --version  # 应该是 20+

# 检查 pnpm 版本
pnpm --version

# 检查工作目录
pwd  # 应该在项目根目录

# 检查 Git 状态
git status
```

#### 步骤 2: 依赖检查
```bash
# 检查依赖树
pnpm list

# 检查过期依赖
pnpm outdated

# 检查安全问题
pnpm audit
```

#### 步骤 3: 配置验证
```bash
# 检查配置文件
cat linch.config.ts
cat package.json
cat turbo.json

# 检查环境变量
cat .env.local
```

#### 步骤 4: 构建验证
```bash
# 清理并重新构建
pnpm clean
pnpm install
pnpm build

# 检查构建输出
ls -la packages/*/dist/
```

## 常见问题解决方案

### 1. CLI 插件加载问题 🔥 **当前重点**

**问题**: `linch plugin-list` 命令显示 "Unknown command"

**解决步骤**:
1. **检查插件发现机制**
   ```typescript
   // 检查文件: packages/core/src/cli/core/plugin-loader.ts
   // 确认插件发现逻辑是否正确
   ```

2. **验证命令注册**
   ```typescript
   // 检查文件: packages/core/src/cli/core/command-registry.ts
   // 确认命令注册机制是否正常
   ```

3. **检查 Schema 插件**
   ```typescript
   // 检查文件: packages/schema/src/plugins/cli-plugin.ts
   // 确认插件导出和注册是否正确
   ```

4. **验证配置加载**
   ```typescript
   // 确认 apps/starter/linch.config.ts 配置正确
   // 检查配置文件路径和格式
   ```

### 2. 配置文件统一问题

**问题**: Schema CLI 插件需要从 `linch.config.ts` 读取配置

**解决步骤**:
1. **修改配置加载逻辑**
   ```typescript
   // 在 packages/schema/src/plugins/cli-plugin.ts 中
   // 修改配置加载，使用统一的配置文件
   ```

2. **验证配置结构**
   ```typescript
   // 确保 apps/starter/linch.config.ts 包含 schema 配置
   export default defineConfig({
     schema: {
       schemaDir: './app/_lib/schemas',
       outputDir: './generated'
     }
   })
   ```

### 3. 包依赖冲突解决

**问题**: 不同包使用不同版本的依赖

**解决步骤**:
1. **检查根目录 package.json**
2. **统一依赖版本**
3. **使用 `pnpm update`**
4. **重新构建所有包**

### 4. 类型错误解决

**问题**: TypeScript 类型检查失败

**解决步骤**:
1. **检查类型定义**: `packages/types/`
2. **验证包依赖版本**
3. **更新类型定义**
4. **重新构建类型包**

## 调试技巧

### 1. 日志调试
```bash
# CLI 调试模式
DEBUG=linch:* pnpm linch command

# 查看详细构建日志
pnpm build --verbose

# 查看详细测试日志
pnpm test --verbose
```

### 2. 文件检查
```bash
# 检查关键文件是否存在
ls -la apps/starter/linch.config.ts
ls -la packages/core/src/cli/
ls -la packages/schema/src/plugins/

# 检查构建输出
ls -la packages/*/dist/
```

### 3. 进程调试
```bash
# 检查运行中的进程
ps aux | grep node

# 检查端口占用
lsof -i :3000
```

## 问题解决检查清单

### 解决前检查
- [ ] 确认问题的具体症状
- [ ] 查看相关错误日志
- [ ] 检查最近的代码变更
- [ ] 验证环境配置

### 解决过程
- [ ] 按照系统性诊断流程执行
- [ ] 记录每个步骤的结果
- [ ] 测试解决方案的有效性
- [ ] 验证没有引入新问题

### 解决后验证
- [ ] 功能完全恢复正常
- [ ] 相关测试通过
- [ ] 文档更新完成
- [ ] 预防措施已实施

## 预防措施

### 1. 定期维护
- 定期更新依赖
- 定期运行安全审计
- 定期清理构建缓存
- 定期备份重要配置

### 2. 监控指标
- 构建成功率
- 测试通过率
- 依赖安全状态
- 性能指标

### 3. 文档维护
- 及时更新故障排除指南
- 记录新发现的问题和解决方案
- 维护常见问题 FAQ
- 更新最佳实践文档

---

**使用说明**:
1. 遇到问题时首先进行问题分类
2. 按照系统性诊断流程执行
3. 记录问题解决过程
4. 更新故障排除文档

**相关文档**:
- [故障排除指南](../../ai-context/zh/reference/troubleshooting.md)
- [工作交接指南](../../ai-context/zh/management/handover-guide.md)
- [当前进度](../../ai-context/zh/management/current-progress.md)
