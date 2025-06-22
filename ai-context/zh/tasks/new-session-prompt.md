# LinchKit Auth 包 DTS 构建性能优化 - 新会话继续提示

## 🎯 项目背景

**LinchKit** 是一个 AI-first 企业级快速开发框架，采用 Odoo 风格的模块化架构。项目使用 TypeScript + Zod + Prisma + tRPC 技术栈，支持多种数据库和部署方式。

### 核心包架构
- `@linch-kit/schema`: Zod-first 数据建模和代码生成
- `@linch-kit/core`: 统一 CLI 和配置管理
- `@linch-kit/auth`: 企业级认证和权限系统
- `@linch-kit/ui`: 基于 shadcn/ui 的组件库
- `@linch-kit/crud`: CRUD 操作和状态管理
- `@linch-kit/trpc`: tRPC 集成和类型安全 API

## 🚨 当前问题

### 主要问题：Auth 包 DTS 构建超时
- **症状**: `packages/auth` 包的 TypeScript DTS 构建超时(>30秒)
- **影响**: 阻塞整个项目的构建流程，严重影响开发体验
- **状态**: JS/ESM 构建正常(~700ms)，仅 DTS 构建有问题

### 已完成的优化
✅ **Schema 包类型系统改进**（2025-06-22 完成）
- 分层类型系统设计（CoreFieldConfig → SimpleFieldConfig → FieldConfig）
- defineField 函数优化（基础版本 + 高级版本）
- defineEntity 函数改进（条件类型 + 限制泛型深度）
- **结果**: Schema 包 DTS 构建从挂起(>30s) 优化到 4.8s ✅

## 🔍 问题分析

### 核心架构问题假设
**问题核心**: Auth 包构建超时可能与 Schema 包中复杂的 UI 相关类型定义有关

### 具体分析点

#### 1. 复杂 UI 类型定义的影响
当前 `@linch-kit/schema` 包的 `FieldConfig` 接口包含大量复杂的 UI 配置：

```typescript
export interface FieldConfig {
  // 数据库配置（合理）
  primary?: boolean
  unique?: boolean
  
  // 复杂的 UI 配置（可能导致性能问题）
  table?: {
    width?: number | string
    render?: string
    // ... 20+ 属性
  }
  
  form?: {
    type?: 'text' | 'email' | 'password' | ...
    dependencies?: Array<{
      field: string
      condition: any
      action: 'show' | 'hide' | 'enable' | 'disable' | 'require'
    }>
    // ... 更多嵌套配置
  }
  
  // 复杂函数类型
  permissions?: {
    custom?: (user: any, context?: any) => boolean
  }
  
  transform?: {
    input?: (value: any) => any
    output?: (value: any) => any
  }
}
```

#### 2. Auth 包中的复杂类型使用
Auth 包中大量使用 `defineField` 函数，可能触发复杂类型推导：

```typescript
// packages/auth/src/schemas/user.ts
export const User = defineEntity('User', {
  departments: defineField(z.array(z.object({
    departmentId: z.string(),
    position: z.string().optional(),
    // ... 复杂嵌套对象
  })).optional(), {
    label: 'auth.user.departments',
    db: { type: 'JSON' },
    // 可能触发复杂 UI 类型推导
  }),
  
  metadata: defineField(z.record(z.string(), z.unknown()).optional(), {
    label: 'auth.user.metadata',
    db: { type: 'JSON' }
  })
})
```

### 建议的架构重构方案

#### 方案：模块扩展（Module Augmentation）
将 UI 相关的类型定义从 `@linch-kit/schema` 移动到 `@linch-kit/ui` 包：

```typescript
// @linch-kit/schema 包：只包含核心数据库类型
export interface FieldConfig {
  // 核心数据库配置
  primary?: boolean
  unique?: boolean
  default?: unknown
  db?: DatabaseConfig
  relation?: RelationConfig
  
  // 基础 UI 配置
  label?: string
  description?: string
  required?: boolean
  readonly?: boolean
}

// @linch-kit/ui 包：通过模块扩展添加复杂 UI 类型
declare module '@linch-kit/schema' {
  interface FieldConfig {
    // 复杂 UI 配置
    table?: TableConfig
    form?: FormConfig
    permissions?: PermissionConfig
    transform?: TransformConfig
  }
}
```

#### 优势
1. **包职责单一**: Schema 包专注数据建模，UI 包专注界面配置
2. **按需加载**: 不使用 UI 包时，不会引入复杂类型定义
3. **构建性能**: Auth 包只依赖简化的 Schema 类型，避免复杂推导
4. **向后兼容**: 现有代码无需修改

## 🎯 需要验证的假设

### 1. 类型复杂度假设
- Auth 包 DTS 构建超时是否因为导入了包含复杂 UI 类型的 Schema 包？
- 将 UI 类型分离后，Auth 包构建性能是否会显著改善？

### 2. 模块扩展可行性
- TypeScript 模块扩展方案是否能保持类型安全和开发体验？
- 是否会引入新的循环依赖问题？

### 3. 构建性能影响
- 分离后的构建时间是否能达到目标（Auth 包 DTS < 30s）？
- 是否会影响其他包的构建性能？

## 🔧 技术实现考虑

### 1. TypeScript 模块扩展最佳实践
```typescript
// 正确的模块扩展方式
declare module '@linch-kit/schema' {
  interface FieldConfig {
    // 扩展属性
  }
}

// 避免的问题
- 循环依赖
- 类型冲突
- 构建顺序问题
```

### 2. 包依赖关系重新设计
```
当前依赖关系:
@linch-kit/auth → @linch-kit/schema (包含复杂 UI 类型)

建议依赖关系:
@linch-kit/auth → @linch-kit/schema (仅核心类型)
@linch-kit/ui → @linch-kit/schema (扩展 UI 类型)
```

### 3. 向后兼容性保证
- 现有的 `defineField` 调用无需修改
- 类型推导结果保持一致
- 运行时功能完全保持

### 4. 构建性能监控
```typescript
// 添加构建时间监控
plugins: [
  {
    name: 'dts-performance-monitor',
    buildStart() {
      console.time('DTS构建时间')
    },
    buildEnd() {
      console.timeEnd('DTS构建时间')
      // 超过阈值时发出警告
    }
  }
]
```

## 📋 具体任务清单

### 阶段1：问题验证（优先级：🔥 高）
1. **分析 Auth 包中的具体类型使用**
   - 检查所有 `defineField` 调用
   - 识别复杂的配置使用
   - 分析类型推导链

2. **创建最小化复现测试**
   - 创建简化的 Auth schema 文件
   - 测试 DTS 构建性能
   - 确认问题根源

### 阶段2：架构重构（优先级：🔥 高）
1. **重构 Schema 包类型定义**
   - 分离核心类型和 UI 类型
   - 创建 CoreFieldConfig 接口
   - 保持向后兼容

2. **实现模块扩展方案**
   - 在 UI 包中实现类型扩展
   - 验证类型安全性
   - 测试构建性能

### 阶段3：验证和优化（优先级：🟡 中）
1. **构建性能验证**
   - Auth 包 DTS 构建 < 30s
   - 其他包构建性能不受影响
   - 整体项目构建时间优化

2. **功能完整性测试**
   - 类型推导正常工作
   - IDE 智能提示可用
   - 运行时功能保持

## 🎯 成功标准

### 构建性能目标
- ✅ Schema 包 DTS 构建 < 10s（已达成：4.8s）
- 🎯 Auth 包 DTS 构建 < 30s（待达成）
- 🎯 整体项目构建时间 < 2 分钟

### 功能完整性目标
- 🎯 类型推导精度保持 100%
- 🎯 IDE 智能提示完全可用
- 🎯 运行时功能 100% 保持
- 🎯 向后兼容性 100% 保证

### 开发体验目标
- 🎯 构建过程不再挂起
- 🎯 错误信息清晰明确
- 🎯 热重载性能良好

## 📞 上下文信息

### 项目结构
```
linch-kit/
├── packages/
│   ├── schema/     # Zod-first 数据建模（已优化）
│   ├── auth/       # 认证系统（待优化）
│   ├── ui/         # UI 组件库
│   └── ...
├── apps/
│   └── starter/    # 示例应用
└── ai-context/     # AI 上下文文档
```

### 相关文档
- [当前进展](./current-progress.md)
- [Schema 类型系统分析](./schema-type-system-analysis.md)
- [开发标准](../standards/development-standards.md)

### 技术栈
- **语言**: TypeScript 5.0+
- **构建**: tsup + Turborepo
- **包管理**: pnpm
- **数据库**: Prisma + PostgreSQL
- **验证**: Zod
- **API**: tRPC

---

**会话目标**: 解决 Auth 包 DTS 构建超时问题，实现架构优化
**预期时长**: 2-3 小时
**成功标准**: Auth 包 DTS 构建 < 30 秒，功能完整性 100% 保持
