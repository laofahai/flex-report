# @linch-kit/core

> **基础设施包** | **P0优先级** | **零依赖**

## 🎯 包概览

@linch-kit/core 是 LinchKit 生态系统的核心基础设施包，提供插件系统、配置管理、可观测性、CLI框架等基础功能。

### 核心职责
- **插件系统**: 生命周期钩子、事件总线、插件注册
- **配置管理**: 多租户配置、热更新、版本管理
- **可观测性**: Prometheus指标、OpenTelemetry追踪、健康检查
- **CLI框架**: 插件化命令行工具
- **类型定义**: 所有包共用的基础类型
- **工具函数**: 文件系统、日志、网络等通用工具

### 技术特色
- 零依赖设计，确保基础设施独立性
- 插件化架构，支持功能动态扩展
- AI-First设计，便于AI理解和处理
- 企业级可观测性和多租户支持

## 📁 文档导航

| 文档 | 描述 | 适用场景 |
|------|------|----------|
| [API参考](./api-reference.md) | 完整API接口文档 | 开发集成时查阅 |
| [实现指南](./implementation-guide.md) | 内部架构和实现细节 | 深度定制和扩展 |
| [集成示例](./integration-examples.md) | 与其他包的集成示例 | 快速上手集成 |
| [高级特性](./advanced-features.md) | 企业级特性和性能调优 | 生产环境优化 |

## 🚀 快速开始

```typescript
import { PluginSystem, ConfigManager } from '@linch-kit/core'

// 插件注册
await PluginSystem.register({
  id: 'my-plugin',
  setup: async (config) => {
    // 插件初始化
  }
})

// 配置管理
const config = await ConfigManager.loadConfig('./config.json')
```

## 🔗 相关链接

- [系统架构](../../architecture.md) - 查看core包在整体架构中的位置
- [TypeScript约定](../../../shared/typescript-conventions.md) - 通用开发约定
- [集成模式](../../../shared/integration-patterns.md) - 包间集成指南