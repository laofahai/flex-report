# @linch-kit/ai

> **AI集成包** | **P2优先级** | **依赖**: core, schema

## 🎯 包概览

@linch-kit/ai 提供多AI提供商集成，支持智能代码生成、自然语言查询、智能缓存、AI驱动的数据分析等功能。

### 核心功能
- **多AI提供商**: OpenAI、Claude、Gemini等主流AI服务集成
- **智能代码生成**: 基于Schema的代码和API自动生成
- **自然语言查询**: 将自然语言转换为数据库查询
- **智能缓存**: AI驱动的缓存策略和预测性加载
- **数据分析**: 自动化的数据洞察和报告生成
- **AI工作流**: 可视化的AI任务编排和自动化

### 技术特色
- 统一的AI提供商抽象接口
- 智能的成本优化和模型选择
- 企业级的数据安全和隐私保护
- 可扩展的AI能力插件系统

## 📁 文档导航

> **状态**: 🔄 待完善 - 原始文档已备份为 [ai-integration.md.backup](../ai-integration.md.backup)

| 文档 | 状态 | 描述 |
|------|------|------|
| [API参考](./api-reference.md) | ⏳ 待创建 | AI服务和工具API |
| [实现指南](./implementation-guide.md) | ⏳ 待创建 | AI集成架构和安全设计 |
| [集成示例](./integration-examples.md) | ⏳ 待创建 | AI功能使用示例 |
| [高级特性](./advanced-features.md) | ⏳ 待创建 | 自定义AI模型和工作流 |

## 🚀 快速开始

```typescript
import { AIManager, NLQueryEngine } from '@linch-kit/ai'

// 配置AI提供商
await AIManager.configure({
  providers: ['openai', 'claude'],
  defaultProvider: 'openai'
})

// 自然语言查询
const result = await NLQueryEngine.query(
  "Find all users created last month with more than 10 orders"
)
```

## 📋 临时参考

在详细文档完善之前，请参考原始设计文档：[ai-integration.md.backup](../ai-integration.md.backup)