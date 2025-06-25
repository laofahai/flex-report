# @linch-kit/ui

> **UI组件包** | **P1优先级** | **依赖**: core, schema

## 🎯 包概览

@linch-kit/ui 提供Schema驱动的UI组件库，支持自动表单生成、数据表格、设计系统、主题管理和国际化。

### 核心功能
- **Schema驱动UI**: 基于Schema自动生成表单和表格
- **设计系统**: 完整的设计令牌和组件规范
- **主题管理**: 深色/浅色模式切换和自定义主题
- **国际化**: 多语言支持和RTL布局
- **高级过滤**: 智能搜索和复杂过滤器
- **数据可视化**: 图表和仪表板组件

### 技术特色
- 基于shadcn/ui的现代化组件
- 完全的TypeScript类型安全
- 可访问性(a11y)优先设计
- 响应式和移动端优化

## 📁 文档导航

> **状态**: 🔄 待完善 - 原始文档已备份为 [ui.md.backup](../ui.md.backup)

| 文档 | 状态 | 描述 |
|------|------|------|
| [API参考](./api-reference.md) | ⏳ 待创建 | UI组件API和Props |
| [实现指南](./implementation-guide.md) | ⏳ 待创建 | 组件架构和样式系统 |
| [集成示例](./integration-examples.md) | ⏳ 待创建 | Schema集成和使用示例 |
| [高级特性](./advanced-features.md) | ⏳ 待创建 | 主题定制和扩展开发 |

## 🚀 快速开始

```typescript
import { SchemaForm, SchemaTable } from '@linch-kit/ui'

// Schema驱动表单
<SchemaForm
  schema={UserSchema}
  onSubmit={handleSubmit}
  initialValues={userData}
/>

// Schema驱动表格
<SchemaTable
  schema={UserSchema}
  data={users}
  permissions={userPermissions}
/>
```

## 📋 临时参考

在详细文档完善之前，请参考原始设计文档：[ui.md.backup](../ui.md.backup)