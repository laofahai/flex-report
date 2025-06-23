# LinchKit Schema 包架构重构 - 新会话继续 Prompt

**会话时间**: 2025-06-22  
**项目状态**: Schema 包重构第二阶段完成，Auth 包深度优化待继续  
**工作目录**: `/home/laofahai/workspace/linch-kit`

---

## 🎯 当前任务概述

继续完成 LinchKit Schema 包架构重构工作，重点解决 Auth 包 TypeScript DTS 构建超时问题。

### 📊 当前状态总结

#### ✅ 已完成工作
1. **Schema 包破坏性重构**: 移除向后兼容代码，DTS 构建时间稳定在 4.85s
2. **循环依赖解决**: 完全打破 Auth ↔ tRPC 包循环依赖
3. **问题根源确认**: 通过测试确认 Schema 包复杂类型推导是 Auth 包 DTS 构建超时的根本原因
4. **简化方案验证**: 创建简化用户模板，DTS 构建时间 1.89s

#### ❌ 当前阻塞问题
**Auth 包 DTS 构建超时**: 完整 Auth 包构建时间 >60s，需要深度优化

#### 🔍 问题分析结果
| 测试场景 | DTS 构建时间 | 状态 |
|---------|-------------|------|
| 不使用任何 LinchKit 包 | 1.4s | ✅ 正常 |
| 使用简化用户模板 | 1.89s | ✅ 正常 |
| 使用完整 Auth 包 | >60s | ❌ 超时 |

**结论**: Auth 包的其他核心文件（`core/`、`types/`、`providers/`）中存在复杂类型定义导致 DTS 构建超时。

---

## 🚀 立即执行任务

### 任务 1: Auth 包深度分析（优先级 🔥）

#### 目标
识别 Auth 包中导致 DTS 构建超时的具体文件和类型定义。

#### 具体步骤
1. **逐个文件构建测试**:
   ```bash
   cd packages/auth
   npx tsup src/core/auth.ts --dts --out-dir test-core
   npx tsup src/types/auth.ts --dts --out-dir test-types  
   npx tsup src/providers/credentials.ts --dts --out-dir test-providers
   npx tsup src/providers/oauth.ts --dts --out-dir test-oauth
   ```

2. **识别问题文件**: 找出构建时间 >10s 的文件

3. **分析复杂类型**: 检查问题文件中的复杂泛型定义、深度嵌套类型、循环引用

#### 预期结果
- 识别出 2-3 个导致性能问题的核心文件
- 明确需要优化的具体类型定义

### 任务 2: 应用简化策略（优先级 🔥）

#### 目标
将 Schema 包的优化经验应用到 Auth 包核心文件。

#### 优化策略
1. **条件属性赋值**: 替代大量属性复制
2. **简化泛型约束**: 避免复杂类型推导
3. **运行时验证**: 替代复杂编译时类型检查
4. **分离复杂类型**: 将复杂类型移至独立文件

#### 实施方法
```typescript
// 优化前：复杂的属性复制
const config: ComplexAuthConfig = {
  providers: allProviders,
  session: allSessionConfig,
  // ... 20+ 属性
}

// 优化后：条件属性赋值
const config: Partial<ComplexAuthConfig> = {}
if (providers !== undefined) config.providers = providers
if (session !== undefined) config.session = session
// 只添加非 undefined 的属性
```

### 任务 3: 渐进式验证（优先级 🔥）

#### 目标
确保每次优化后功能不受影响，构建性能得到改善。

#### 验证流程
1. **单文件测试**: 优化一个文件后立即测试构建时间
2. **功能验证**: 运行相关测试确保功能正常
3. **整合测试**: 多个文件优化后测试完整 Auth 包构建

---

## 📁 关键文件位置

### 已创建的简化方案
- `packages/auth/src/schemas/simple-user.ts` - 简化用户模板（1.89s 构建时间）
- `packages/auth/src/test-standalone.ts` - 完全独立测试文件
- `packages/auth/src/index-simple.ts` - 简化版 Auth 包入口

### 需要分析的核心文件
- `packages/auth/src/core/auth.ts` - 核心认证逻辑
- `packages/auth/src/core/permissions.ts` - 权限系统
- `packages/auth/src/types/auth.ts` - 认证类型定义
- `packages/auth/src/types/permissions.ts` - 权限类型定义
- `packages/auth/src/providers/credentials.ts` - 凭证提供者
- `packages/auth/src/providers/oauth.ts` - OAuth 提供者

### 配置文件
- `packages/auth/tsconfig.build.json` - 已优化（disableSizeLimit: false）
- `packages/auth/tsup.config.ts` - 构建配置

---

## 🎯 成功标准

### 短期目标（今天完成）
- ✅ 识别出导致 DTS 构建超时的具体文件
- ✅ 完成 2-3 个核心文件的优化
- ✅ Auth 包 DTS 构建时间降至 <30s

### 中期目标（明天完成）
- ✅ 完成所有 Auth 包核心文件优化
- ✅ 验证所有认证功能正常工作
- ✅ 建立构建性能监控机制

### 验证方法
```bash
# 性能测试
cd packages/auth && time pnpm build

# 功能测试
cd apps/linch-starter && pnpm test:auth

# 整体构建测试
pnpm build:all
```

---

## 📚 参考文档

### 重构报告
- `SCHEMA_REFACTOR_COMPLETION_REPORT.md` - 完整重构报告
- `FINAL_REFACTOR_REPORT.md` - 最终重构报告

### 技术文档
- `ai-context/zh/tasks/current-progress.md` - 最新进度记录
- `packages/schema/src/core/core-types.ts` - 优化后的核心类型
- `packages/schema/src/core/decorators.ts` - 优化后的装饰器

### 测试文件
- `packages/schema/src/test-performance.ts` - Schema 包性能测试（1.69s）
- `packages/auth/src/schemas/simple-user.ts` - Auth 包简化方案（1.89s）

---

## 🔧 开发环境信息

- **Node.js**: v20.19.2 (通过 nvm 管理)
- **包管理器**: pnpm
- **TypeScript**: 最新版本
- **构建工具**: tsup
- **测试框架**: Vitest

### 环境变量设置
```bash
export PATH="/home/laofahai/.nvm/versions/node/v20.19.2/bin:$PATH"
```

---

## 💡 关键提醒

1. **渐进式修复**: 每次只优化一个文件，立即测试构建性能
2. **功能保护**: 确保每次优化后认证功能不受影响
3. **性能监控**: 建立构建时间监控，防止性能回退
4. **文档更新**: 及时更新进度文档和技术报告

**立即开始 Auth 包深度分析，这是解决当前阻塞性问题的关键步骤！**
