# Linch Kit 代码位置索引

**最后更新**: 2025-06-21  
**文档版本**: v3.0  
**原始来源**: 新建文件，整合项目关键代码位置信息  
**维护责任**: 开发团队

---

## 🎯 快速定位指南

本文档提供 Linch Kit 项目中关键文件和功能的快速定位信息，便于开发和调试。

## 📦 核心包代码位置

### @linch-kit/core
```
packages/core/
├── src/
│   ├── cli/                    # CLI 系统
│   │   ├── commands/           # CLI 命令实现
│   │   │   ├── init.ts        # 项目初始化命令
│   │   │   ├── dev.ts         # 开发服务器命令
│   │   │   └── build.ts       # 构建命令
│   │   ├── index.ts           # CLI 入口点
│   │   └── plugin-loader.ts   # 插件加载器
│   ├── config/                # 配置系统
│   │   ├── types.ts           # 配置类型定义
│   │   ├── loader.ts          # 配置加载器
│   │   └── validator.ts       # 配置验证器
│   ├── utils/                 # 工具函数
│   └── index.ts               # 包入口
└── package.json               # 包配置
```

### @linch-kit/schema ✅ 已发布
```
packages/schema/
├── src/
│   ├── decorators/            # Zod 装饰器
│   │   ├── primary.ts         # 主键装饰器
│   │   ├── unique.ts          # 唯一约束装饰器
│   │   ├── timestamps.ts      # 时间戳装饰器
│   │   └── soft-delete.ts     # 软删除装饰器
│   ├── generators/            # 代码生成器
│   │   ├── prisma.ts          # Prisma Schema 生成器
│   │   ├── validators.ts      # 验证器生成器
│   │   ├── mocks.ts           # Mock 数据生成器
│   │   └── openapi.ts         # OpenAPI 文档生成器
│   ├── entity/                # 实体定义系统
│   │   ├── define.ts          # defineEntity 函数
│   │   └── relations.ts       # 关系定义
│   ├── cli/                   # CLI 插件
│   │   └── commands.ts        # Schema 相关命令
│   └── index.ts               # 包入口
└── package.json               # 包配置
```

### @linch-kit/auth
```
packages/auth/
├── src/
│   ├── providers/             # 认证提供商
│   │   ├── credentials.ts     # 用户名密码认证
│   │   ├── oauth.ts           # OAuth 认证
│   │   └── jwt.ts             # JWT 处理
│   ├── permissions/           # 权限系统
│   │   ├── rbac.ts            # 基于角色的访问控制
│   │   ├── abac.ts            # 基于属性的访问控制
│   │   └── field-level.ts     # 字段级权限
│   ├── entities/              # 认证相关实体
│   │   ├── user.ts            # 用户实体
│   │   ├── role.ts            # 角色实体
│   │   └── session.ts         # 会话实体
│   └── index.ts               # 包入口
└── package.json               # 包配置
```

### @linch-kit/crud
```
packages/crud/
├── src/
│   ├── manager/               # CRUD 管理器
│   │   ├── crud-manager.ts    # 主要 CRUD 管理器类
│   │   └── operations.ts      # CRUD 操作实现
│   ├── permissions/           # 权限集成
│   │   ├── operation-level.ts # 操作级权限
│   │   ├── field-level.ts     # 字段级权限
│   │   └── row-level.ts       # 行级权限
│   ├── events/                # 事件系统
│   │   └── crud-events.ts     # CRUD 事件定义
│   └── index.ts               # 包入口
└── package.json               # 包配置
```

### @linch-kit/trpc
```
packages/trpc/
├── src/
│   ├── server/                # 服务端配置
│   │   ├── context.ts         # tRPC 上下文
│   │   ├── router.ts          # 路由配置
│   │   └── middleware.ts      # 中间件
│   ├── client/                # 客户端配置
│   │   ├── react.ts           # React Query 集成
│   │   └── vanilla.ts         # 原生客户端
│   ├── generators/            # 路由生成器
│   │   └── crud-routes.ts     # CRUD 路由生成
│   └── index.ts               # 包入口
└── package.json               # 包配置
```

### @linch-kit/ui
```
packages/ui/
├── src/
│   ├── components/            # UI 组件
│   │   ├── ui/                # shadcn/ui 组件
│   │   ├── forms/             # 表单组件
│   │   └── layouts/           # 布局组件
│   ├── hooks/                 # React Hooks
│   ├── utils/                 # 工具函数
│   └── index.ts               # 包入口
├── blocks.ts                  # 组件块定义
└── package.json               # 包配置
```

## 🚀 应用代码位置

### linch-starter 应用
```
apps/starter/
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── api/               # API 路由
│   │   │   └── trpc/          # tRPC API 端点
│   │   ├── auth/              # 认证页面
│   │   │   ├── login/         # 登录页面
│   │   │   └── register/      # 注册页面
│   │   ├── dashboard/         # 仪表板页面
│   │   └── layout.tsx         # 根布局
│   ├── components/            # React 组件
│   │   ├── auth/              # 认证相关组件
│   │   │   ├── auth-context.tsx    # 认证上下文
│   │   │   ├── auth-guard.tsx      # 路由保护
│   │   │   └── login-form.tsx      # 登录表单
│   │   ├── ui/                # UI 组件
│   │   └── providers/         # 上下文提供者
│   ├── lib/                   # 工具库
│   │   ├── trpc.ts            # tRPC 客户端配置
│   │   ├── auth.ts            # 认证配置
│   │   └── prisma.ts          # Prisma 客户端
│   └── entities/              # 实体定义
│       ├── user.ts            # 用户实体
│       └── role.ts            # 角色实体
├── prisma/                    # Prisma 配置
│   └── schema.prisma          # 数据库模式 (自动生成)
├── linch.config.ts            # Linch Kit 配置
└── package.json               # 应用配置
```

## 🔧 配置文件位置

### 项目级配置
```
linch-kit/
├── linch.config.ts            # 主配置文件
├── turbo.json                 # Turborepo 配置
├── pnpm-workspace.yaml        # pnpm 工作空间配置
├── package.json               # 根包配置
└── .env.example               # 环境变量模板
```

### 构建配置
```
configs/
├── tsconfig.base.json         # TypeScript 基础配置
├── tsconfig.build.json        # 构建配置
├── tsup.base.ts              # tsup 基础配置
├── eslint.config.js          # ESLint 配置
└── jest.config.js            # Jest 配置
```

## 🗄️ 数据库相关

### Prisma 配置
```
apps/starter/prisma/
├── schema.prisma             # 数据库模式 (自动生成)
├── migrations/               # 数据库迁移文件
└── seed.ts                   # 数据库种子文件
```

### 实体定义
```
apps/starter/src/entities/
├── user.ts                   # 用户实体定义
├── role.ts                   # 角色实体定义
├── session.ts                # 会话实体定义
└── index.ts                  # 实体导出
```

## 🧪 测试文件位置

### 包测试
```
packages/*/
├── src/
│   └── __tests__/            # 单元测试
│       ├── *.test.ts         # 测试文件
│       └── fixtures/         # 测试数据
└── tests/
    ├── integration/          # 集成测试
    └── e2e/                  # 端到端测试
```

### 应用测试
```
apps/starter/
├── src/
│   └── __tests__/            # 组件测试
└── tests/
    ├── api/                  # API 测试
    ├── pages/                # 页面测试
    └── e2e/                  # 端到端测试
```

## 📝 文档位置

### AI 上下文文档
```
ai-context/zh/
├── core/                     # 项目核心信息
├── standards/                # 开发规范
└── tasks/                    # 任务管理
```

### 用户文档
```
docs/
├── README.md                 # 文档首页
├── quick-start.md            # 快速开始
├── monorepo-architecture.md  # 架构文档
└── troubleshooting.md        # 故障排除
```

## 🔍 关键功能入口点

### CLI 命令入口
- **主 CLI**: `packages/core/src/cli/index.ts`
- **Schema 命令**: `packages/schema/src/cli/commands.ts`
- **插件加载**: `packages/core/src/cli/plugin-loader.ts`

### API 入口点
- **tRPC 服务端**: `apps/starter/src/app/api/trpc/[trpc]/route.ts`
- **认证 API**: `apps/starter/src/lib/auth.ts`
- **数据库客户端**: `apps/starter/src/lib/prisma.ts`

### 前端入口点
- **应用根组件**: `apps/starter/src/app/layout.tsx`
- **认证上下文**: `apps/starter/src/components/auth/auth-context.tsx`
- **tRPC 客户端**: `apps/starter/src/lib/trpc.ts`

---

**使用提示**: 
1. 使用 `Ctrl+F` 快速搜索特定文件或功能
2. 所有自动生成的文件都标注了 `(自动生成)` 
3. 关键配置文件的修改需要重启开发服务器
4. 实体定义修改后需要运行 `pnpm linch schema:generate:prisma` 重新生成数据库模式
