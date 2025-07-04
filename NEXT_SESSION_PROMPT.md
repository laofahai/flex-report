# LinchKit Bun.js 迁移 - 下一个 Session 指导

## 🎯 当前状态

LinchKit 项目的 Bun.js 迁移已完成**第一阶段**，核心功能已成功迁移并验证。

**当前分支**: `feature/migrate-to-bun`

## ✅ 已完成的工作

1. **✅ 环境搭建**: Bun v1.2.18 安装完成
2. **✅ 依赖迁移**: bun install 成功（1449 包，68.72s）
3. **✅ 脚本更新**: 所有 package.json scripts 已更新
4. **✅ CI/CD 配置**: GitHub Actions 已更新使用 oven-sh/setup-bun
5. **✅ 功能验证**: 构建、开发服务器、测试均正常运行

## 🚨 下一个 Session 任务清单

请按以下顺序完成剩余工作：

### 1. TodoRead 检查当前进度
```bash
TodoRead
```

### 2. 完成测试迁移评估
- [ ] 运行 bun test vs vitest 性能对比
- [ ] 评估是否迁移到 bun test
- [ ] 更新测试配置（如果需要）

### 3. 全面测试验证
- [ ] 运行完整测试套件: `bun run turbo test`
- [ ] 测试所有应用启动: 
  - `bun run dev:apps` (验证多应用并行)
  - 单独测试 starter, demo-app, website
- [ ] 验证生产构建: `bun run build`

### 4. 文档更新（重要！）
- [x] 搜索并更新所有文档中的 pnpm 命令为 bun
- [x] 重点文档：
  - `README.md`
  - `CLAUDE.md` 
  - `ai-context/` 目录下所有文档
  - 各包的 README.md
- [x] 更新开发指南和安装说明

### 5. 性能基准测试
- [ ] 记录迁移前后的性能对比数据
- [ ] 更新 bun-migration-plan.md 中的实际数据

### 6. 最终验证和提交
- [ ] 运行 `bun run validate` 确保所有检查通过
- [ ] 创建迁移总结 commit
- [ ] 准备 PR 描述

## 🔧 重要配置信息

### Bun 路径
```bash
# Bun 安装在: ~/.bun/bin/bun
# 已添加 alias: alias bun='~/.bun/bin/bun'
```

### 关键文件
- `package.json`: 已配置 workspaces，保留 packageManager 供 turbo 使用
- `bun.lockb`: 新的锁文件
- `pnpm-lock.yaml.backup`: 备份文件，迁移完成后可删除

### 已知兼容性问题
1. **Turbo**: 需要 packageManager 字段和全局 pnpm
2. **Trusted Dependencies**: @tailwindcss/oxide, protobufjs, unrs-resolver
3. **端口冲突**: 3000端口被 website 占用，starter 会报错（正常）

## 📋 验证命令

```bash
# 基本功能测试
bun install --frozen-lockfile
bun run turbo build:packages
bun run turbo test
bun run dev:apps

# 个别应用测试  
cd apps/starter && bun run dev
cd apps/demo-app && bun run dev
cd apps/website && bun run dev
```

## 🎯 Session 成功标准

完成后应该达到：
- [ ] 所有测试通过
- [ ] 所有应用可正常启动
- [x] 文档中无残留的 pnpm 命令
- [ ] 迁移方案文档更新完整
- [ ] 准备好创建 PR

## 📝 提示

- 使用 `~/.bun/bin/bun` 或配置的 alias
- 重点关注文档更新，这是用户体验的关键
- 如遇问题，参考 `ai-context/bun-migration-plan.md`
- 记录所有性能数据和问题解决方案

**开始指令**: "继续 LinchKit Bun.js 迁移，完成剩余任务"