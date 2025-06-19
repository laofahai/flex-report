# CRUD 包架构决策

## 📋 决策概述

**决策日期**: 2024-12-18  
**决策者**: AI Assistant + User  
**状态**: 已确认  

## 🎯 核心决策

### 1. 包拆分策略 ✅

**决策**: 拆分为 `@linch-kit/crud` (核心) + `@linch-kit/crud-ui` (UI)

**理由**:
- **关注点分离**: 逻辑与 UI 解耦，提高代码质量
- **框架无关**: 核心包可支持多种 UI 框架 (React, Vue, Solid)
- **更好的树摇**: 用户可按需引入，减少包体积
- **灵活性**: 用户可以只使用逻辑层，自定义 UI

**替代方案**:
- 单一包方案：简单但不够灵活
- 更细粒度拆分：过于复杂，增加维护成本

### 2. 开发优先级 ✅

**决策**: 先开发 `@linch-kit/crud` 核心包，再开发 UI 包

**理由**:
- **渐进式开发**: 先建立稳固的基础，再构建上层
- **验证架构**: 在核心包中验证设计的合理性
- **并行开发**: 核心包稳定后，可以并行开发多个 UI 包

### 3. 核心架构模式 ✅

**决策**: 采用 Manager + Operations + State 的分层架构

```
CRUDManager (协调层)
├── CRUDOperations (操作层)
├── PermissionManager (权限层)
├── SchemaAdapter (适配层)
├── StateManager (状态层)
└── EventEmitter (事件层)
```

**理由**:
- **单一职责**: 每个组件职责明确
- **可测试性**: 各层可独立测试
- **可扩展性**: 易于添加新功能
- **可维护性**: 清晰的依赖关系

### 4. API 设计风格 ✅

**决策**: 采用链式 API + 工厂函数的设计

```typescript
const userCRUD = createCRUDFromSchema(UserEntity)
  .withPermissions(userPermissions)
  .withDataSource(userDataSource)
```

**理由**:
- **开发体验**: 链式 API 提供流畅的配置体验
- **类型安全**: TypeScript 可以很好地推导链式调用的类型
- **可读性**: 配置意图清晰明确
- **灵活性**: 支持渐进式配置

### 5. 权限集成策略 ✅

**决策**: 深度集成 @linch-kit/auth-core，支持三级权限控制

```typescript
interface CRUDPermissions {
  // 操作级权限
  operations: OperationPermissions
  
  // 字段级权限  
  fields: Record<string, FieldPermission>
  
  // 行级权限
  rowLevel?: RowPermissionChecker
}
```

**理由**:
- **细粒度控制**: 满足企业级应用的权限需求
- **声明式配置**: 权限配置清晰易懂
- **自动检查**: 操作前自动进行权限验证
- **UI 集成**: UI 组件自动根据权限显示/隐藏

### 6. Schema 集成方式 ✅

**决策**: 基于 @linch-kit/schema 的适配器模式

```typescript
class CRUDSchemaAdapter<T> {
  constructor(entity: EntityDefinition<T>)
  
  // 自动推导配置
  generateListConfig(): ListViewConfig
  generateFormConfig(): FormViewConfig
  generateDetailConfig(): DetailViewConfig
}
```

**理由**:
- **自动化**: 减少手动配置，提高开发效率
- **一致性**: 基于 Schema 确保 UI 与数据模型一致
- **可覆盖**: 自动配置可以被手动配置覆盖
- **类型安全**: 基于 Schema 的类型推导

### 7. 状态管理策略 ✅

**决策**: 内置轻量级状态管理，支持外部状态库集成

```typescript
class CRUDStateManager<T> {
  private state: CRUDState<T>
  private listeners: StateListener[]
  
  // 内置状态管理
  getState(): CRUDState<T>
  setState(updates: Partial<CRUDState<T>>): void
  subscribe(listener: StateListener): () => void
}
```

**理由**:
- **零依赖**: 核心包不依赖外部状态库
- **灵活集成**: 可以与 Redux、Zustand 等状态库集成
- **性能优化**: 内置状态管理针对 CRUD 场景优化
- **简单易用**: 对于简单场景，无需额外状态库

### 8. 事件系统设计 ✅

**决策**: 采用类型安全的事件系统

```typescript
interface CRUDEvents<T> {
  'before:create': { data: CreateInput<T> }
  'after:create': { data: T, result: T }
  'before:update': { id: string, data: UpdateInput<T> }
  'after:update': { id: string, data: UpdateInput<T>, result: T }
  // ...
}
```

**理由**:
- **扩展性**: 支持插件和自定义逻辑
- **类型安全**: 事件参数类型检查
- **调试友好**: 清晰的事件流程
- **集成便利**: 易于与外部系统集成

### 9. 数据源抽象 ✅

**决策**: 定义通用的 DataSource 接口，支持多种后端

```typescript
interface DataSource<T> {
  list(options: ListOptions): Promise<PaginatedResponse<T>>
  get(id: string): Promise<T | null>
  create(data: CreateInput<T>): Promise<T>
  update(id: string, data: UpdateInput<T>): Promise<T>
  delete(id: string): Promise<void>
}
```

**理由**:
- **后端无关**: 支持 REST、GraphQL、tRPC 等
- **可测试性**: 易于 mock 和测试
- **灵活性**: 用户可以自定义数据源实现
- **标准化**: 统一的数据操作接口

### 10. tRPC 深度集成 ✅

**决策**: 与 @linch-kit/trpc 深度集成，自动生成类型安全的 API

```typescript
const userRouter = generateCRUDRouter(userCRUD, {
  basePath: 'user',
  procedures: {
    list: true,
    get: true,
    create: true,
    update: true,
    delete: true
  },
  middleware: {
    auth: true,
    permissions: true,
    validation: true
  }
})
```

**理由**:
- **端到端类型安全**: 从数据库到前端的完整类型推导
- **自动化**: 减少手动编写 API 代码
- **一致性**: 统一的 API 设计模式
- **开发效率**: 大幅提升开发速度

### 11. UI 组件设计原则 ✅

**决策**: 采用组合式组件设计，支持高度自定义

```typescript
// 组合式使用
<CRUDProvider manager={userCRUD}>
  <CRUDList />
  <CRUDForm mode="create" />
</CRUDProvider>

// 细粒度控制
<CRUDList>
  <CRUDFilters />
  <CRUDTable>
    <CRUDColumn field="name" />
    <CRUDColumn field="email" />
    <CRUDActions />
  </CRUDTable>
  <CRUDPagination />
</CRUDList>
```

**理由**:
- **灵活性**: 支持从简单到复杂的各种使用场景
- **可组合**: 组件可以自由组合和嵌套
- **可定制**: 每个组件都支持深度定制
- **渐进式**: 可以从简单配置开始，逐步深度定制

## 🔄 未来考虑

### 1. 多框架支持
- `@linch-kit/crud-ui-vue` - Vue 3 组件包
- `@linch-kit/crud-ui-solid` - SolidJS 组件包
- `@linch-kit/crud-ui-svelte` - Svelte 组件包

### 2. 高级功能
- 实时数据同步 (WebSocket)
- 离线支持 (PWA)
- 数据可视化集成
- 工作流集成

### 3. 性能优化
- 虚拟滚动 (大数据集)
- 智能缓存策略
- 懒加载和代码分割
- 服务端渲染支持

## 📊 决策影响分析

### 正面影响
- ✅ **开发效率**: 大幅减少 CRUD 开发时间
- ✅ **代码质量**: 统一的架构和最佳实践
- ✅ **类型安全**: 端到端 TypeScript 支持
- ✅ **可维护性**: 清晰的架构和文档

### 潜在风险
- ⚠️ **学习成本**: 新的 API 和概念需要学习
- ⚠️ **复杂性**: 高度灵活性可能带来配置复杂性
- ⚠️ **性能**: 抽象层可能带来性能开销

### 风险缓解
- 📚 **完善文档**: 提供详细的使用指南和示例
- 🎯 **合理默认**: 提供开箱即用的默认配置
- ⚡ **性能优化**: 在关键路径进行性能优化
- 🧪 **充分测试**: 确保功能稳定性和性能

## 🎯 成功指标

### 开发体验指标
- 从 Schema 到可用 CRUD 界面 < 10 行代码
- 权限配置 < 5 行代码
- 自定义字段显示 < 3 行代码

### 性能指标
- 1000 条数据列表渲染 < 100ms
- 表单验证响应 < 50ms
- 权限检查开销 < 10ms

### 质量指标
- 测试覆盖率 > 80%
- TypeScript 严格模式 100% 通过
- 文档完整性 > 90%

这些架构决策为 CRUD 包的开发提供了明确的指导原则和技术方向。
