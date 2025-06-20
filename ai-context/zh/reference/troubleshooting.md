# 故障排除指南

## 🚨 当前已知问题

### 1. CLI 命令格式问题 (最高优先级)
**问题**: `linch plugin-list` 命令显示 "Unknown command"

**症状**:
```bash
cd apps/starter
pnpm linch plugin-list
# 输出: Unknown command: plugin-list
```

**可能原因**:
- 插件加载流程有问题
- 命令注册机制失效
- 配置文件路径错误

**调试步骤**:
```bash
# 1. 检查基础 CLI 功能
pnpm linch --help

# 2. 检查插件加载
# 查看文件: packages/core/src/cli/core/plugin-loader.ts

# 3. 检查命令注册
# 查看文件: packages/core/src/cli/core/command-registry.ts

# 4. 检查 Schema 插件
# 查看文件: packages/schema/src/plugins/cli-plugin.ts
```

**解决方案**:
1. 检查插件发现机制
2. 验证命令注册流程
3. 确认配置文件加载

### 2. 配置文件统一问题 (高优先级)
**问题**: Schema CLI 插件需要从 `linch.config.ts` 读取配置

**症状**:
- Schema 命令无法找到实体
- 配置加载失败

**解决方案**:
1. 修改 `packages/schema/src/plugins/cli-plugin.ts`
2. 确保从统一配置文件读取
3. 验证配置路径正确

### 3. Schema 命令验证问题 (高优先级)
**问题**: Schema 相关命令可能无法正常工作

**测试命令**:
```bash
cd apps/starter
pnpm linch schema-list
pnpm linch schema-generate-prisma
```

**解决方案**:
1. 检查实体文件路径
2. 验证配置中的 schemaDir 设置
3. 确认实体定义正确

## 🔧 常见问题解决

### CLI 问题

#### 问题: CLI 命令不工作
**症状**: 运行 `pnpm linch` 命令时出错

**解决步骤**:
```bash
# 1. 检查工作目录
pwd
# 应该在 /home/laofahai/workspace/linch-kit

# 2. 检查 CLI 入口
ls -la apps/starter/scripts/linch.js

# 3. 检查包构建
pnpm build

# 4. 重新安装依赖
pnpm install
```

#### 问题: 插件加载失败
**症状**: 插件相关命令不可用

**解决步骤**:
1. 检查插件目录: `packages/*/plugins/`
2. 验证插件注册: `packages/core/src/cli/core/plugin-loader.ts`
3. 查看错误日志
4. 重新构建相关包

#### 问题: 配置加载失败
**症状**: 配置相关命令报错

**解决步骤**:
1. 检查配置文件: `apps/starter/linch.config.ts`
2. 验证配置格式
3. 检查配置管理器: `packages/core/src/config/`

### 构建问题

#### 问题: 构建失败
**症状**: `pnpm build` 命令失败

**解决步骤**:
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
cd packages/schema && pnpm build
```

#### 问题: TypeScript 类型错误
**症状**: 类型检查失败

**解决步骤**:
1. 检查类型定义: `packages/types/`
2. 验证包依赖版本
3. 更新类型定义
4. 重新构建类型包

### 依赖问题

#### 问题: 包依赖冲突
**症状**: 安装或构建时依赖冲突

**解决步骤**:
```bash
# 1. 检查依赖树
pnpm list

# 2. 清理依赖
pnpm clean
rm -rf node_modules

# 3. 重新安装
pnpm install

# 4. 检查 package.json 版本
```

#### 问题: 包版本不一致
**症状**: 不同包使用不同版本的依赖

**解决步骤**:
1. 检查根目录 `package.json`
2. 统一依赖版本
3. 使用 `pnpm update`
4. 重新构建

### Schema 问题

#### 问题: 实体定义不被识别
**症状**: `linch schema-list` 显示空列表

**解决步骤**:
1. 检查实体文件路径: `apps/starter/app/_lib/schemas/`
2. 验证实体定义格式
3. 检查配置中的 `schemaDir`
4. 确认文件导出正确

#### 问题: Prisma 生成失败
**症状**: `linch schema-generate-prisma` 失败

**解决步骤**:
1. 检查实体定义语法
2. 验证 Zod 装饰器使用
3. 查看生成器错误日志
4. 手动验证 Schema 定义

### 数据库问题

#### 问题: 数据库连接失败
**症状**: 应用无法连接数据库

**解决步骤**:
1. 检查环境变量: `.env.local`
2. 验证数据库 URL
3. 测试数据库连接
4. 检查网络和防火墙

#### 问题: Prisma 迁移失败
**症状**: 数据库迁移命令失败

**解决步骤**:
```bash
# 1. 检查 Prisma schema
cat prisma/schema.prisma

# 2. 重置数据库
pnpm prisma db push --force-reset

# 3. 生成 Prisma 客户端
pnpm prisma generate

# 4. 运行迁移
pnpm prisma db push
```

## 🔍 调试技巧

### 日志查看
```bash
# CLI 调试模式
DEBUG=linch:* pnpm linch command

# 查看构建日志
pnpm build --verbose

# 查看测试日志
pnpm test --verbose
```

### 文件检查
```bash
# 检查关键文件
ls -la apps/starter/linch.config.ts
ls -la packages/core/src/cli/
ls -la packages/schema/src/plugins/

# 检查构建输出
ls -la packages/*/dist/
```

### 环境验证
```bash
# 检查 Node.js 版本
node --version  # 应该是 20+

# 检查 pnpm 版本
pnpm --version

# 检查工作目录
pwd  # 应该在项目根目录
```

## 📞 获取帮助

### 文档资源
- [快速参考](./quick-reference.md) - 快速查找信息
- [开发流程](../workflows/development.md) - 开发规范
- [包文档](../packages/) - 各包详细文档

### 调试资源
- [系统架构](../architecture/system-architecture.md) - 理解系统设计
- [部署配置](./deployment-configurations.md) - 部署相关配置

### 社区资源
- GitHub Issues - 报告问题
- 项目文档 - 查看最新信息
- AI 助手 - 获取即时帮助

---

**最后更新**: 2025-06-20  
**维护**: 根据实际问题持续更新  
**用途**: 快速解决开发和使用中遇到的问题
