# 继续 Starter 应用开发 - 数据库集成阶段

## 📋 当前状态概览

### ✅ 已完成的功能 (2025-06-20)

1. **tRPC 集成完成**
   - tRPC Provider 和客户端配置
   - API 路由 `/api/trpc/[trpc]/route.ts`
   - 认证和权限中间件
   - 完整的 Context 系统

2. **用户认证系统**
   - 登录页面 `/auth/login`
   - 注册页面 `/auth/register`
   - Auth Router 和 API 端点
   - Token 存储和会话管理

3. **用户管理界面**
   - 用户列表页面 `/users`
   - CRUD 操作 (创建、编辑、删除)
   - 分页、搜索、过滤功能
   - 响应式 UI 设计

4. **开发环境**
   - 开发服务器运行在 http://localhost:3000
   - 所有依赖已安装
   - TypeScript 配置完成

### 🎯 Demo 账户
- **管理员**: admin@example.com / admin123
- **普通用户**: user@example.com / user123

## 🚀 下一阶段任务：数据库集成

### 优先级 1: Prisma 数据库集成

1. **配置数据库连接**
   ```bash
   # 检查当前配置
   cat apps/linch-starter/linch.config.ts
   
   # 生成 Prisma schema
   cd apps/linch-starter
   pnpm linch schema:generate:prisma
   ```

2. **数据库迁移**
   ```bash
   # 初始化 Prisma
   npx prisma init
   
   # 生成迁移
   npx prisma migrate dev --name init
   
   # 生成 Prisma Client
   npx prisma generate
   ```

3. **替换 Mock 数据**
   - 更新 `src/server/trpc/routers/user.ts` 使用 Prisma
   - 更新 `src/server/trpc/routers/auth.ts` 使用数据库
   - 实现真实的密码哈希和验证

### 优先级 2: 认证系统增强

1. **JWT 认证实现**
   - 集成 @linch-kit/auth-core 包
   - 实现真实的 JWT token 生成和验证
   - 更新 tRPC context 以包含真实用户信息

2. **会话管理**
   - 实现 httpOnly cookies 存储
   - 添加 token 刷新机制
   - 实现自动登出功能

3. **权限系统**
   - 集成 @linch-kit/auth-core 权限检查
   - 实现基于角色的访问控制
   - 添加权限保护的路由

### 优先级 3: 功能扩展

1. **产品管理功能**
   - 创建产品管理页面
   - 实现产品 CRUD 操作
   - 集成现有的 Product 实体

2. **仪表板页面**
   - 创建管理仪表板
   - 添加统计数据展示
   - 实现用户活动监控

3. **文件上传功能**
   - 实现头像上传
   - 添加文件管理系统
   - 集成云存储服务

## 🔧 开发指南

### 启动开发环境
```bash
cd /home/laofahai/workspace/linch-kit/apps/linch-starter

# 启动开发服务器
export PATH="/home/laofahai/.nvm/versions/node/v20.19.2/bin:$PATH"
pnpm dev
```

### 检查当前状态
```bash
# 检查 CLI 功能
pnpm linch --help
pnpm linch schema:list

# 检查实体加载
pnpm linch schema:show User
```

### 关键文件位置

#### tRPC 相关
- `src/lib/trpc-provider.tsx` - tRPC 客户端配置
- `src/server/trpc/router.ts` - 主路由
- `src/server/trpc/routers/user.ts` - 用户 API
- `src/server/trpc/routers/auth.ts` - 认证 API
- `src/app/api/trpc/[trpc]/route.ts` - API 路由处理

#### 页面组件
- `src/app/users/page.tsx` - 用户管理页面
- `src/app/auth/login/page.tsx` - 登录页面
- `src/app/auth/register/page.tsx` - 注册页面

#### 配置文件
- `linch.config.ts` - Linch Kit 配置
- `src/entities/User.ts` - 用户实体定义

## 🎯 成功标准

### 数据库集成完成标准
- [ ] Prisma schema 生成成功
- [ ] 数据库连接正常
- [ ] 用户注册/登录使用真实数据库
- [ ] 用户管理 CRUD 操作正常
- [ ] 密码正确哈希和验证

### 认证系统完成标准
- [ ] JWT token 正确生成和验证
- [ ] 会话持久化正常工作
- [ ] 权限检查中间件生效
- [ ] 自动登出功能正常

### 功能扩展完成标准
- [ ] 产品管理功能完整
- [ ] 仪表板数据展示正确
- [ ] 文件上传功能正常

## 📚 相关文档

- [当前进度](../ai-context/zh/management/current-progress.md)
- [Auth Core 包文档](../ai-context/zh/packages/auth-core.md)
- [Schema 包文档](../ai-context/zh/packages/schema.md)
- [tRPC 包文档](../packages/trpc/README.md)

## 🚨 注意事项

1. **环境变量**: 确保数据库 URL 正确配置
2. **依赖版本**: 保持所有包版本兼容
3. **类型安全**: 维护端到端类型安全
4. **错误处理**: 完善错误提示和用户体验
5. **安全性**: 实现正确的密码哈希和 JWT 验证

---

**开始命令**: 请按照上述优先级顺序，从 Prisma 数据库集成开始继续开发。
