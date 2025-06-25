# @linch-kit/workflow

> **工作流引擎** | **实验性包** | **依赖**: core, schema, auth

## 🎯 包概览

@linch-kit/workflow 提供可视化工作流编排引擎，支持业务流程自动化、事件驱动处理、分布式任务调度等功能。

### 核心功能
- **可视化流程设计**: 拖拽式工作流编辑器
- **事件驱动执行**: 基于事件的自动化触发
- **分布式执行**: 支持分布式任务调度和负载均衡
- **条件分支**: 复杂的条件逻辑和分支处理
- **外部集成**: 第三方服务和API集成
- **监控审计**: 工作流执行监控和审计追踪

### 技术特色
- 基于状态机的可靠执行引擎
- 支持长时间运行的业务流程
- 错误处理和重试机制
- 可扩展的任务节点系统

## 📁 文档导航

> **状态**: 🔄 待完善 - 原始文档已备份为 [workflow.md.backup](../workflow.md.backup)

| 文档 | 状态 | 描述 |
|------|------|------|
| [API参考](./api-reference.md) | ⏳ 待创建 | 工作流API和节点类型 |
| [实现指南](./implementation-guide.md) | ⏳ 待创建 | 执行引擎和状态管理 |
| [集成示例](./integration-examples.md) | ⏳ 待创建 | 业务流程实现示例 |
| [高级特性](./advanced-features.md) | ⏳ 待创建 | 自定义节点和分布式执行 |

## 🚀 快速开始

```typescript
import { WorkflowEngine, WorkflowBuilder } from '@linch-kit/workflow'

// 定义工作流
const workflow = WorkflowBuilder
  .create('user-onboarding')
  .addNode('send-welcome-email', { type: 'email' })
  .addNode('create-profile', { type: 'crud' })
  .addCondition('is-enterprise', user => user.plan === 'enterprise')
  .build()

// 执行工作流
await WorkflowEngine.execute(workflow, { userId: '123' })
```

## 📋 临时参考

在详细文档完善之前，请参考原始设计文档：[workflow.md.backup](../workflow.md.backup)