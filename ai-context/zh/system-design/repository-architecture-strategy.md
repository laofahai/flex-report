# LinchKit 仓库架构和开发流程策略

**版本**: v1.0  
**更新**: 2025-07-01  
**状态**: 规划中

---

## 🏗️ 多仓库架构设计

### 🎯 核心原则
- **开源透明**: 框架代码完全公开，促进社区贡献
- **商业保护**: 业务模块和客户项目私有保护
- **独立发布**: 不同层级独立版本管理
- **权限控制**: 精确控制代码访问权限

---

## 📦 仓库分层架构

### 1. 主仓库 (完全开源)
```
github.com/linch-tech/linch-kit (Public)
├── packages/          # 开源框架包
│   ├── core/         # @linch-kit/core
│   ├── schema/       # @linch-kit/schema  
│   ├── auth/         # @linch-kit/auth
│   ├── crud/         # @linch-kit/crud
│   ├── trpc/         # @linch-kit/trpc
│   └── ui/           # @linch-kit/ui
├── modules/          
│   └── console/      # @linch-kit/console
├── apps/
│   ├── starter/      # 示例应用模板
│   └── docs/         # 文档站点
├── tools/
│   └── create-linch-kit/  # CLI脚手架
└── README.md         # 主项目说明
```

### 2. 业务模块仓库 (私有)
```
github.com/linch-tech/linch-kit-business (Private)
├── packages/          # 付费业务模块
│   ├── erp/          # @linch-kit/erp
│   ├── crm/          # @linch-kit/crm
│   ├── wms/          # @linch-kit/wms
│   ├── ecommerce/    # @linch-kit/ecommerce
│   ├── cms/          # @linch-kit/cms
│   ├── hrm/          # @linch-kit/hrm
│   ├── analytics/    # @linch-kit/analytics
│   ├── workflow/     # @linch-kit/workflow
│   ├── billing/      # @linch-kit/billing
│   └── audit/        # @linch-kit/audit
├── examples/         # 业务模块使用示例
├── docs/            # 业务模块文档
└── tools/           # 业务模块开发工具
```

### 3. 客户项目仓库 (私有)
```
github.com/linch-tech/client-projects (Private)
├── templates/        # 项目模板
│   ├── saas-template/
│   ├── enterprise-template/
│   └── industry-templates/
├── projects/         # 具体客户项目
│   ├── client-a/
│   ├── client-b/
│   └── client-c/
└── shared/          # 共享组件和工具
```

### 4. 生态模块仓库 (社区)
```
github.com/linch-tech/linch-kit-ecosystem (Public)
├── community-modules/  # 社区贡献的模块
├── plugins/           # 第三方插件
├── extensions/        # 扩展包
├── examples/          # 社区示例
└── docs/             # 生态文档
```

---

## 🔄 开发流程设计

### 🌱 框架开发流程 (开源)

#### 1. 功能开发
```bash
# 1. Fork 主仓库
git clone https://github.com/your-username/linch-kit.git

# 2. 创建功能分支
git checkout -b feature/new-feature

# 3. 开发和测试
pnpm dev
pnpm test

# 4. 提交 PR
git push origin feature/new-feature
```

#### 2. 代码审查
- **自动化检查**: CI/CD 自动运行测试和检查
- **人工审查**: 核心团队成员代码审查
- **社区反馈**: 社区成员参与讨论

#### 3. 发布流程
```bash
# 1. 版本管理
pnpm changeset

# 2. 版本更新
pnpm changeset:version

# 3. 发布到npm
pnpm changeset:publish
```

### 💼 业务模块开发流程 (私有)

#### 1. 模块规划
- **需求分析**: 确定业务模块功能需求
- **架构设计**: 基于LinchKit框架设计模块架构
- **接口定义**: 定义与框架的集成接口

#### 2. 开发流程
```bash
# 1. 创建模块分支
git checkout -b module/wms-v1.0

# 2. 模块开发
cd packages/wms
pnpm dev

# 3. 集成测试
pnpm test:integration

# 4. 发布到私有npm
pnpm publish --registry=https://npm.linch-tech.com
```

#### 3. 质量控制
- **单元测试**: 模块功能完整测试
- **集成测试**: 与框架集成测试
- **用户测试**: 内部用户验收测试

### 🔌 第三方插件开发流程

#### 1. 插件开发指南

##### 插件结构规范
```typescript
// @third-party/linch-kit-plugin-example
export interface PluginConfig {
  name: string
  version: string
  dependencies: string[]
}

export class ExamplePlugin implements LinchKitPlugin {
  config: PluginConfig
  
  async initialize() {
    // 插件初始化逻辑
  }
  
  async activate() {
    // 插件激活逻辑
  }
  
  async deactivate() {
    // 插件停用逻辑
  }
}
```

##### 插件注册机制
```typescript
// 在 LinchKit 应用中使用插件
import { PluginManager } from '@linch-kit/core'
import { ExamplePlugin } from '@third-party/linch-kit-plugin-example'

await PluginManager.register(new ExamplePlugin({
  name: 'example-plugin',
  version: '1.0.0'
}))
```

#### 2. 第三方开发支持

##### 开发者工具
```bash
# 创建插件模板
npx create-linch-kit-plugin my-plugin

# 插件开发调试
pnpm dev:plugin

# 插件测试
pnpm test:plugin

# 插件发布
pnpm publish:plugin
```

##### 认证插件流程
1. **提交申请**: 在生态仓库提交插件认证申请
2. **代码审查**: LinchKit团队审查插件代码
3. **安全检查**: 自动化安全扫描和人工检查
4. **功能测试**: 确保插件与框架兼容
5. **文档审核**: 确保有完整的使用文档
6. **发布认证**: 获得官方认证标识

#### 3. 插件生态管理

##### 插件市场
```
https://marketplace.linch-kit.com/
├── 官方插件      # LinchKit官方维护
├── 认证插件      # 通过官方认证的第三方插件
├── 社区插件      # 社区贡献的插件
└── 企业插件      # 企业级付费插件
```

##### 插件分级
- **🌟 官方插件**: LinchKit官方开发维护
- **✅ 认证插件**: 通过官方认证的高质量插件
- **🔧 社区插件**: 社区贡献的插件
- **💼 企业插件**: 商业化的企业级插件

---

## 🔐 权限和访问控制

### 仓库访问权限

#### 开源仓库 (linch-kit)
- **公开读取**: 所有人可以查看代码
- **贡献权限**: 通过PR方式贡献代码
- **维护权限**: 核心团队成员

#### 私有仓库 (linch-kit-business)
- **内部团队**: 完整读写权限
- **客户访问**: 根据许可证授权特定模块访问
- **合作伙伴**: 受限的读取权限

#### 客户项目 (client-projects)
- **项目团队**: 特定项目的读写权限
- **客户访问**: 仅限自己项目的访问权限
- **技术支持**: 受限的故障排查权限

### npm包发布权限

#### 公开包 (@linch-kit/*)
- **发布权限**: 核心团队成员
- **自动发布**: CI/CD自动化发布
- **版本管理**: 通过changesets统一管理

#### 私有包 (@linch-kit/business-*)
- **私有registry**: 使用私有npm registry
- **访问控制**: 基于许可证的访问控制
- **版本管理**: 独立版本管理系统

---

## 📊 开发效率和质量保证

### 跨仓库集成

#### 依赖管理
```json
// 业务模块 package.json
{
  "peerDependencies": {
    "@linch-kit/core": "^1.0.0",
    "@linch-kit/auth": "^1.0.0",
    "@linch-kit/console": "^1.0.0"
  }
}
```

#### 版本兼容性
- **语义化版本**: 严格遵循semver规范
- **兼容性测试**: 自动化测试不同版本组合
- **升级指南**: 详细的版本升级文档

### 质量保证体系

#### 自动化测试
- **单元测试**: 每个包独立的单元测试
- **集成测试**: 跨包的集成测试
- **端到端测试**: 完整应用的E2E测试

#### 代码质量
- **代码检查**: ESLint + Prettier统一代码风格
- **类型检查**: TypeScript严格模式
- **安全扫描**: 自动化安全漏洞扫描

#### 文档要求
- **API文档**: 所有公开API的完整文档
- **使用指南**: 详细的使用教程和最佳实践
- **示例代码**: 丰富的代码示例和演示项目

---

## 📅 实施路线图和迁移策略

### 当前状态 → 多仓库迁移计划

**Phase 1: 仓库拆分准备 (1-2个月)**
- 完善当前主仓库的构建和发布流程
- 建立完整的CI/CD pipeline和自动化测试
- 确定代码迁移策略和版本管理方案
- 建立私有npm registry基础设施

**Phase 2: 开源仓库发布 (2-3个月)**
- 将主仓库设为公开，发布6+1个包到npm
- 建立官方文档网站和社区交流平台
- 完善starter模板和示例项目
- 开始社区推广和开发者生态建设

**Phase 3: 业务模块仓库建设 (3-6个月)**
- 创建私有业务模块仓库(linch-kit-business)
- 迁移或开发第一批商业模块(ERP/CRM/WMS)
- 建立客户项目仓库和模板体系
- 完善授权和许可证管理系统

**Phase 4: 生态完善 (6-12个月)**
- 建立第三方插件开发者生态
- 完善插件市场和认证体系
- 扩展商业模块和客户案例
- 建立合作伙伴网络

### 迁移风险控制
- **渐进式迁移**: 分阶段迁移，避免disruption
- **版本兼容**: 保持API向后兼容
- **文档同步**: 确保迁移过程中文档及时更新
- **社区沟通**: 及时向社区传达变更计划

这种多仓库架构既保护了商业价值，又促进了开源生态的发展，为LinchKit的长期成功奠定了基础。