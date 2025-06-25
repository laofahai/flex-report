# LinchKit Starter App

> **示例应用** | **参考实现** | **依赖**: 所有LinchKit包

## 🎯 应用概览

LinchKit Starter App 是一个完整的示例应用，展示了如何使用LinchKit框架构建现代化的全栈应用程序。

### 核心功能
- **用户认证**: 完整的注册、登录、权限管理
- **数据管理**: Schema驱动的CRUD操作演示
- **实时功能**: WebSocket和实时数据更新
- **管理界面**: 企业级管理控制台集成
- **API演示**: tRPC端到端类型安全API
- **UI组件**: 完整的组件库使用示例

### 技术栈
- **前端**: Next.js 15 + React 19 + LinchKit UI
- **后端**: Node.js + tRPC + LinchKit API
- **数据库**: PostgreSQL + Prisma + LinchKit Schema
- **认证**: NextAuth + LinchKit Auth
- **部署**: Docker + LinchKit Console

## 📁 文档导航

> **状态**: 🔄 待完善 - 原始文档已备份为 [starter-app.md.backup](../starter-app.md.backup)

| 文档 | 状态 | 描述 |
|------|------|------|
| [快速开始](./quickstart.md) | ⏳ 待创建 | 应用安装和运行指南 |
| [架构说明](./architecture.md) | ⏳ 待创建 | 应用架构和技术选型 |
| [功能演示](./features.md) | ⏳ 待创建 | 各功能模块使用演示 |
| [部署指南](./deployment.md) | ⏳ 待创建 | 生产环境部署说明 |

## 🚀 快速开始

```bash
# 克隆应用模板
npx create-linch-app my-app

# 安装依赖
cd my-app
pnpm install

# 配置环境
cp .env.example .env.local
# 编辑 .env.local 配置数据库等

# 运行开发服务器
pnpm dev
```

## 📋 临时参考

在详细文档完善之前，请参考原始设计文档：[starter-app.md.backup](../starter-app.md.backup)