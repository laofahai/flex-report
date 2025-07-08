# 前端应用架构设计

## 🎯 应用架构原则

### 1. 分层架构

```
┌─────────────────────────────────────────┐
│ 应用层 (apps/)                           │
│ ├─ starter (企业级应用外壳)              │
│ ├─ website (文档平台)                    │
│ └─ demo-app (功能演示)                   │
├─────────────────────────────────────────┤
│ 功能模块层 (modules/)                   │
│ ├─ console (管理后台功能)               │
│ └─ [其他业务模块]                       │
├─────────────────────────────────────────┤
│ 组件库层 (@linch-kit/ui)                │
│ ├─ 基础组件 (shadcn/ui)                 │
│ ├─ 业务组件                             │
│ └─ 布局组件                             │
├─────────────────────────────────────────┤
│ 核心包层 (core/schema/auth/crud/trpc)   │
│ ├─ 类型定义                             │
│ ├─ 业务逻辑                             │
│ └─ 基础服务                             │
└─────────────────────────────────────────┘
```

### 2. 职责分离

- **apps/starter** - 企业级应用外壳，提供多标签页工作区
- **modules/console** - 管理功能模块，提供页面和组件
- **@linch-kit/ui** - 可复用的 UI 组件库

## 📱 starter 应用架构

### 设计目标

- 提供类似 VSCode 的多标签页工作区体验
- 支持多模块集成的企业级应用框架
- 统一的导航、状态管理和用户体验

### 核心特性需求

1. **多标签页工作区** - 同时打开多个页面，快速切换
2. **插件化路由** - 模块可以注册自己的路由和标签页
3. **统一状态管理** - 跨标签页的状态同步
4. **响应式布局** - 适配不同屏幕尺寸

### 技术选型标准

- **状态管理**: Zustand (轻量、类型安全)
- **路由系统**: Next.js 15 App Router + 并行路由
- **UI组件**: @linch-kit/ui + shadcn/ui
- **样式方案**: Tailwind CSS 4 + CSS变量

## 🏗️ 设计文档要求

### 新功能开发前必须有 DESIGN.md

每个应用和模块必须在开发前创建详细的设计文档：

#### 应用级设计文档 (apps/\*/DESIGN.md)

- **用户体验设计** - 交互流程、视觉设计
- **架构设计** - 组件层次、状态管理、路由设计
- **集成方案** - 与其他模块的集成方式
- **性能考量** - 加载策略、缓存策略

#### 模块级设计文档 (modules/\*/DESIGN.md)

- **功能规范** - 提供的功能和接口
- **组件设计** - 组件层次和接口定义
- **数据流设计** - 状态管理和数据流转
- **集成接口** - 与外部系统的集成方式

### 设计协商流程

1. **现状分析** - 分析现有代码结构和需求
2. **技术调研** - 查阅相关文档和最佳实践
3. **Gemini协商** - 与 Gemini 协商架构方案
4. **设计生成** - 生成详细设计文档
5. **用户确认** - 获得用户确认后开始开发

## 🎨 用户体验设计标准

### 多标签页工作区设计

- **标签页管理** - 创建、关闭、切换、排序
- **状态持久化** - 刷新后恢复标签页状态
- **性能优化** - 懒加载、虚拟化、内存管理
- **交互体验** - 拖拽、右键菜单、快捷键

### 响应式设计

- **桌面端** - 完整的多标签页体验
- **平板端** - 适配触摸操作
- **移动端** - 简化的单页面体验

## 🔧 开发工具链

### 必须使用的工具

- **包管理**: bun
- **类型检查**: TypeScript 严格模式
- **代码规范**: ESLint + Prettier
- **构建工具**: Next.js 15 + Turbo

### 质量标准

- **类型覆盖**: 100% TypeScript
- **测试覆盖**: 应用级 >70%, 组件级 >80%
- **性能指标**: 首屏加载 <2s, 标签页切换 <200ms
- **兼容性**: 支持现代浏览器 (Chrome/Firefox/Safari/Edge)

## 🏆 starter-console 集成实现案例

### 实现概述 (2025-07-05)

成功实现了将 `@linch-kit/console` 管理功能集成到 `starter` 应用的统一 `/dashboard` 布局架构中。

### 核心架构设计

#### 1. 统一 `/dashboard` 布局架构

- **设计理念**: 统一工作台体验，基于权限的动态导航
- **路由结构**: 嵌套布局 `/dashboard` -> `/dashboard/admin/*`
- **权限控制**: 基于 NextAuth.js 和角色的动态菜单生成

#### 2. 嵌套布局实现

```
app/
└── dashboard/
    ├── layout.tsx              # 主工作台布局
    ├── page.tsx                # 默认仪表盘页面
    └── admin/                  # 管理功能模块
        ├── layout.tsx          # 管理区权限保护布局
        ├── page.tsx            # 管理概览页
        ├── users/page.tsx      # 用户管理
        ├── tenants/page.tsx    # 租户管理
        └── settings/page.tsx   # 系统设置
```

#### 3. 权限驱动的导航设计

```typescript
// components/layout/AppSidebar.tsx
function getNavItems(userRole: string | undefined): NavItem[] {
  const isAdmin = userRole === 'SUPER_ADMIN' || userRole === 'TENANT_ADMIN'

  const baseItems: NavItem[] = [
    { label: 'Overview', href: '/dashboard', icon: Home },
    { label: 'Settings', href: '/dashboard/settings', icon: Settings },
  ]

  // 管理功能 - 仅管理员可见
  if (isAdmin) {
    baseItems.splice(1, 0, {
      label: 'Admin',
      href: '/dashboard/admin',
      icon: Shield,
      children: [
        { label: 'Overview', href: '/dashboard/admin', icon: Home },
        { label: 'Users', href: '/dashboard/admin/users', icon: Users },
        { label: 'Tenants', href: '/dashboard/admin/tenants', icon: Building },
        { label: 'System Settings', href: '/dashboard/admin/settings', icon: Settings },
      ],
    })
  }
  return baseItems
}
```

#### 4. 权限保护中间件

```typescript
// app/dashboard/admin/layout.tsx
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  if (!session) {
    redirect('/sign-in?redirect=/dashboard/admin')
  }

  const hasAdminAccess = (session.user as { role?: string })?.role === 'SUPER_ADMIN' ||
                        (session.user as { role?: string })?.role === 'TENANT_ADMIN'

  if (!hasAdminAccess) {
    redirect('/dashboard')
  }

  return <AppSidebarLayout>{children}</AppSidebarLayout>
}
```

### 技术特性

#### 1. 响应式多标签页工作区

- **桌面端**: 完整的多标签页体验，支持同时打开多个功能页面
- **移动端**: 传统面包屑导航，节省空间
- **智能切换**: 根据设备尺寸和标签数量自动选择最佳导航模式

#### 2. Console 组件集成策略

- **占位符实现**: 当前使用占位符页面，为未来Console组件做准备
- **标准UI组件**: 使用 `@linch-kit/ui` 的 SchemaTable、SchemaForm 等组件
- **一致性设计**: 保持与整体应用的视觉和交互一致性

#### 3. 角色权限映射

| 角色           | 访问权限                                                           | 管理功能             |
| -------------- | ------------------------------------------------------------------ | -------------------- |
| `USER`         | `/dashboard/*`, `/dashboard/settings/*`                            | 基础功能、个人设置   |
| `TENANT_ADMIN` | `USER` + `/dashboard/admin/users/*`, `/dashboard/admin/settings/*` | 用户管理、租户设置   |
| `SUPER_ADMIN`  | 全部权限                                                           | 系统管理、多租户管理 |

### 实施成果

#### ✅ 已完成

- [x] 嵌套布局结构实现
- [x] 权限驱动的动态导航
- [x] 管理页面占位符实现
- [x] 响应式多标签页工作区
- [x] 角色权限控制系统
- [x] 构建验证通过

#### 🔄 待完善 (后续迭代)

- [ ] Console 组件完善后的完整集成
- [ ] 真实数据的管理功能实现
- [ ] 高级权限控制（CASL细粒度权限）
- [ ] 性能优化和缓存策略

### 架构决策记录

#### 1. 为什么选择统一 `/dashboard` 布局？

- **用户体验**: 提供一致的工作台体验，减少认知负担
- **权限管理**: 集中的权限控制，易于维护
- **扩展性**: 新功能模块可以轻松集成到统一布局中

#### 2. 为什么采用占位符策略？

- **前瞻设计**: Console 包尚在开发中，占位符确保架构完整性
- **渐进式集成**: 可以在Console组件完善后无缝替换
- **保持简洁**: 符合starter应用简洁的设计原则

#### 3. 为什么使用嵌套布局而非平级路由？

- **权限分层**: 管理功能需要额外的权限检查层
- **布局复用**: admin区域共享特定的布局和样式
- **代码组织**: 更清晰的代码结构和职责分离

### 最佳实践总结

1. **权限优先**: 所有管理功能都必须通过权限检查
2. **渐进增强**: 从简单占位符开始，逐步完善功能
3. **组件复用**: 充分利用 `@linch-kit/ui` 的标准组件
4. **类型安全**: 严格的 TypeScript 类型检查
5. **响应式设计**: 考虑不同设备的用户体验

## 📋 开发检查清单

### 设计阶段

- [x] 存在完整的设计文档
- [x] 通过 Gemini 协商确认最佳实践
- [x] 用户确认设计方案
- [x] 更新相关架构文档

### 开发阶段

- [x] 严格按照设计文档实现
- [x] 使用 LinchKit 内部包功能
- [x] 遵循代码规范和类型约束
- [x] 实时更新 TODO 任务状态

### 验证阶段

- [x] 通过所有类型检查
- [x] 通过所有测试用例
- [x] 满足性能标准
- [x] 用户体验验证通过

这个架构文档确保了前端应用的设计质量和开发效率，为企业级应用提供了清晰的指导原则。
