# @linch-kit/core AI 上下文文档

## 🤖 AI-First 设计原则

这是 Linch Kit 的核心包，整合了 CLI、配置管理和基础工具，专门为 AI 理解和扩展而设计。

## 📋 AI 元数据

```json
{
  "ai-purpose": "Linch Kit 核心包，提供 CLI、配置管理和基础工具",
  "ai-architecture": "模块化核心架构，包含 CLI、配置、工具三大模块",
  "ai-key-concepts": [
    "统一的 CLI 系统",
    "动态配置管理",
    "插件化架构",
    "项目脚手架",
    "开发工具代理"
  ],
  "ai-integration-points": [
    "CLI 命令扩展",
    "配置 Schema 注册",
    "插件系统",
    "工具函数库"
  ]
}
```

## 🏗️ 架构概览

```
@linch-kit/core/
├── src/
│   ├── index.ts              # AI: 统一导出入口
│   ├── cli.ts                # AI: CLI 可执行入口
│   ├── cli/                  # AI: CLI 系统模块
│   │   ├── index.ts          # AI: CLI 核心导出
│   │   ├── core/             # AI: CLI 核心组件
│   │   │   ├── command-registry.ts  # AI: 命令注册表
│   │   │   ├── plugin-loader.ts     # AI: 插件加载器
│   │   │   └── config-manager.ts    # AI: 配置管理器
│   │   ├── commands/         # AI: 内置命令
│   │   │   ├── index.ts      # AI: 命令导出
│   │   │   ├── init.ts       # AI: 项目初始化
│   │   │   ├── config.ts     # AI: 配置管理
│   │   │   ├── plugin.ts     # AI: 插件管理
│   │   │   └── dev.ts        # AI: 开发工具
│   │   ├── types/            # AI: CLI 类型定义
│   │   └── utils/            # AI: CLI 工具函数
│   ├── config/               # AI: 配置管理模块
│   │   ├── index.ts          # AI: 配置导出
│   │   ├── loader.ts         # AI: 配置加载器
│   │   ├── providers/        # AI: 配置提供者
│   │   ├── schemas/          # AI: 配置 Schema
│   │   └── types.ts          # AI: 配置类型
│   ├── utils/                # AI: 核心工具模块
│   │   ├── index.ts          # AI: 工具导出
│   │   ├── logger.ts         # AI: 日志系统
│   │   ├── fs.ts             # AI: 文件系统工具
│   │   ├── process.ts        # AI: 进程管理
│   │   └── validation.ts     # AI: 验证工具
│   └── types/                # AI: 共享类型定义
│       ├── index.ts          # AI: 类型导出
│       ├── cli.ts            # AI: CLI 类型
│       ├── config.ts         # AI: 配置类型
│       └── common.ts         # AI: 通用类型
└── AI-CONTEXT.md             # AI: 本文档
```

## 🎯 模块职责

### CLI 模块 (`src/cli/`)
- **命令注册和执行**: 统一的命令系统
- **插件发现和加载**: 自动发现和加载插件
- **交互式界面**: 用户友好的命令行界面
- **开发工具代理**: 代理到现有工具 (npm, Next.js, Turborepo)

### 配置模块 (`src/config/`)
- **多格式支持**: JS/TS/JSON/YAML 配置文件
- **Schema 验证**: 使用 Zod 进行配置验证
- **环境变量集成**: 自动加载和合并环境变量
- **动态注册**: 支持插件动态注册配置 Schema

### 工具模块 (`src/utils/`)
- **日志系统**: 结构化日志记录
- **文件系统**: 文件操作工具
- **进程管理**: 子进程管理和代理
- **验证工具**: 通用验证函数

## 🔌 扩展机制

### 1. CLI 命令扩展
```typescript
// 插件可以注册新命令
import { CommandRegistry } from '@linch-kit/core/cli'

const registry = CommandRegistry.getInstance()
registry.registerCommand('my-command', {
  description: 'My custom command',
  handler: async (context) => {
    // 命令逻辑
  }
})
```

### 2. 配置 Schema 扩展
```typescript
// 插件可以注册配置 Schema
import { ConfigManager } from '@linch-kit/core/config'

const configManager = ConfigManager.getInstance()
configManager.registerSchema({
  name: 'my-plugin',
  schema: z.object({
    enabled: z.boolean().default(true)
  })
})
```

### 3. 工具函数扩展
```typescript
// 使用核心工具函数
import { logger, validateSchema } from '@linch-kit/core/utils'

logger.info('Plugin loaded', { plugin: 'my-plugin' })
const isValid = validateSchema(data, schema)
```

## 🎛️ 使用方式

### 作为 CLI 工具
```bash
# 全局安装
npm install -g @linch-kit/core

# 使用 CLI
linch init my-app
linch dev
linch build
```

### 作为库使用
```typescript
// 导入整个核心包
import { CLI, Config, Utils } from '@linch-kit/core'

// 或者导入特定模块
import { CommandRegistry } from '@linch-kit/core/cli'
import { ConfigManager } from '@linch-kit/core/config'
import { logger } from '@linch-kit/core/utils'
```

### 在插件中使用
```typescript
// 插件开发
import type { CommandPlugin } from '@linch-kit/core'

const myPlugin: CommandPlugin = {
  name: 'my-plugin',
  version: '1.0.0',
  async register(registry) {
    // 注册命令
  }
}
```

## 📊 性能考虑

### 1. 模块化加载
- **按需导入**: 只加载使用的模块
- **懒加载**: CLI 命令按需加载
- **代码分割**: 不同模块独立打包

### 2. 缓存策略
- **配置缓存**: 避免重复解析配置文件
- **插件缓存**: 缓存插件发现结果
- **命令缓存**: 缓存命令注册信息

### 3. 启动优化
- **快速启动**: CLI 启动时间 < 100ms
- **并行加载**: 插件并行发现和加载
- **增量更新**: 仅更新变更的部分

## 🔮 未来扩展

### 短期 (1-2 个月)
- [ ] 完善工具函数库
- [ ] 添加更多内置命令
- [ ] 优化性能和启动时间

### 中期 (3-6 个月)
- [ ] AI 辅助命令推荐
- [ ] 智能配置验证
- [ ] 可视化配置编辑器

### 长期 (6+ 个月)
- [ ] 云端配置同步
- [ ] AI 驱动的项目分析
- [ ] 自动化最佳实践建议

## 🛡️ 质量保证

### 1. 类型安全
- **完整类型定义**: 所有 API 都有类型定义
- **运行时验证**: 使用 Zod 进行运行时验证
- **AI 标注**: 所有代码都有 AI 标注

### 2. 测试覆盖
- **单元测试**: 核心功能单元测试
- **集成测试**: 模块间集成测试
- **E2E 测试**: 端到端功能测试

### 3. 文档完整
- **API 文档**: 完整的 API 文档
- **使用示例**: 丰富的使用示例
- **AI 上下文**: 便于 AI 理解的文档
