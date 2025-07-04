# LinchKit 架构重构实施路线图

**版本**: v1.0  
**更新日期**: 2025-07-04  
**目标**: 实现 Starter 轻量化 + Console 平台化 + 混合开发模式

## 🎯 总体目标

基于与 Gemini 的协商结果，将 LinchKit 从"功能固定的产品"转变为"可扩展的平台"，实现：

1. **Starter 轻量化**：从重型应用变为轻量脚手架
2. **Console 平台化**：从演示应用升级为基础设施平台
3. **混合开发模式**：支持 Console + 自定义功能的渐进式开发
4. **完整包生态**：确保每个包都功能完整且可独立使用

## 📅 实施阶段规划

### **Phase 1: 包完整性验证与增强**（1-2周）

#### 目标
确保每个 package 都是功能完整的独立库，可单独使用

#### 具体任务
1. **包依赖关系梳理**
   - [ ] 审查当前包的依赖关系，确保符合架构约束
   - [ ] 移除不必要的循环依赖
   - [ ] 验证 core → schema → auth → crud → trpc → ui 的依赖顺序

2. **API 完整性检查**
   - [ ] 审核 @linch-kit/core 的配置管理、日志、插件系统 API
   - [ ] 补充 @linch-kit/auth 的独立认证能力和权限检查 API
   - [ ] 完善 @linch-kit/crud 的查询构建器和批量操作
   - [ ] 增强 @linch-kit/ui 的 Schema 驱动组件

3. **独立使用文档**
   - [ ] 为每个包编写独立的 README 和使用示例
   - [ ] 创建"不使用 Console"的纯包集成示例
   - [ ] 验证每个包在现有项目中的集成能力

#### 验收标准
- 每个包都可以独立安装和使用
- 完整的 TypeScript 类型定义
- 独立的文档和示例代码
- 单元测试覆盖率 > 80%（core > 90%）

### **Phase 2: Console 平台化重构**（2-3周）

#### 目标
将 Console 重构为纯集成器和平台基础设施

#### 具体任务
1. **Console 核心架构重构**
   - [ ] 创建 `LinchKitConsole` 主组件
   - [ ] 实现配置驱动的功能启用机制
   - [ ] 建立统一的 Context 和 Provider 系统
   - [ ] 实现动态路由注册机制

2. **移除业务逻辑实现**
   - [ ] 将所有用户管理逻辑移到 @linch-kit/crud + @linch-kit/ui
   - [ ] 将认证逻辑完全委托给 @linch-kit/auth
   - [ ] 确保 Console 只做集成，不做实现

3. **共享服务设计**
   - [ ] 实现 `useLinchKit()`, `useCurrentUser()` 等核心 Hooks
   - [ ] 建立统一的主题、权限、导航系统
   - [ ] 创建组件覆盖和扩展机制

#### 技术要点
```typescript
// Console 主入口设计
export const LinchKitConsole: React.FC<{
  config: LinchKitConfig
}> = ({ config }) => {
  return (
    <LinchKitProvider config={config}>
      <ConsoleShell>
        <DynamicRouter routes={config.routes} />
      </ConsoleShell>
    </LinchKitProvider>
  )
}
```

#### 验收标准
- Console 完全基于 packages 构建
- 支持功能模块的启用/禁用
- 提供清晰的扩展 API
- 统一的导航、权限、主题系统

### **Phase 3: Starter 精简与配置系统**（1周）

#### 目标
将 Starter 精简为最小化的应用启动器

#### 具体任务
1. **依赖精简**
   - [ ] 移除所有 UI 组件依赖（shadcn/ui 相关）
   - [ ] 移除直接业务逻辑包（auth, crud, trpc, ui）
   - [ ] 保留最小运行时依赖：core, console, next, react

2. **配置文件系统**
   - [ ] 设计 `LinchKitConfig` 接口
   - [ ] 实现配置文件解析和验证
   - [ ] 支持环境变量注入和默认值

3. **多模式支持**
   - [ ] 实现 `console` 模式（纯 Console）
   - [ ] 实现 `hybrid` 模式（Console + 自定义）
   - [ ] 实现 `packages-only` 模式（纯包集成）

#### 文件结构目标
```
apps/starter/
├── app/
│   ├── layout.tsx              # 全局布局
│   ├── page.tsx               # 入口页面
│   └── dashboard/
│       └── [[...slug]]/
│           └── page.tsx       # 动态挂载点
├── src/
│   └── extensions/            # 用户自定义代码区域
├── linchkit.config.ts         # 核心配置文件
├── package.json              # 最小依赖
└── .env.example              # 环境变量模板
```

#### 验收标准
- 包体积减少 80% 以上
- 支持三种使用模式
- 配置文件驱动的功能控制
- 清晰的自定义代码组织结构

### **Phase 4: 混合开发模式实现**（2周）

#### 目标
实现 Console + 自定义功能的混合开发模式

#### 具体任务
1. **动态路由系统**
   - [ ] 实现自定义路由注册机制
   - [ ] 支持路由级权限控制
   - [ ] 实现代码分割和懒加载

2. **导航集成**
   - [ ] 自定义导航项集成到 Console 导航
   - [ ] 支持图标、权限、分组等配置
   - [ ] 实现导航的动态显示/隐藏

3. **开发者体验优化**
   - [ ] 创建 CLI 工具支持路由和导航的快速添加
   - [ ] 提供官方的 hybrid 模式模板
   - [ ] 编写详细的混合开发指南

#### 配置示例
```typescript
const hybridConfig: LinchKitConfig = {
  mode: 'hybrid',
  console: {
    features: ['user-management', 'tenant-management']
  },
  hybrid: {
    customRoutes: [
      {
        path: '/inventory',
        component: './src/extensions/inventory/InventoryPage',
        name: '库存管理',
        permissions: ['inventory:read']
      }
    ],
    customNavigation: [
      {
        label: '库存管理',
        path: '/inventory',
        icon: 'Package',
        permissions: ['inventory:read']
      }
    ]
  }
}
```

#### 验收标准
- 自定义路由无缝集成到 Console
- 统一的权限和主题系统
- 良好的代码分割和性能
- 完整的开发工具支持

### **Phase 5: 插件系统与生态建设**（2-3周）

#### 目标
建立完整的插件生态系统

#### 具体任务
1. **插件系统核心**
   - [ ] 在 @linch-kit/core 中实现插件管理器
   - [ ] 定义 `LinchKitPlugin` 接口规范
   - [ ] 实现插件生命周期管理

2. **官方插件开发**
   - [ ] @linch-kit/plugin-user-management
   - [ ] @linch-kit/plugin-tenant-management
   - [ ] @linch-kit/plugin-analytics
   - [ ] @linch-kit/plugin-monitoring

3. **插件开发工具**
   - [ ] 创建插件开发模板
   - [ ] 编写插件开发指南
   - [ ] 实现插件热重载开发模式

#### 插件接口设计
```typescript
export interface LinchKitPlugin {
  name: string
  version: string
  components?: Record<string, React.ComponentType>
  routes?: Array<RouteConfig>
  services?: Record<string, ServiceExtension>
  hooks?: LifecycleHooks
  config?: {
    schema: z.ZodSchema
    defaults: Record<string, any>
  }
}
```

#### 验收标准
- 完整的插件系统架构
- 至少 4 个官方插件
- 插件开发工具和文档
- 第三方插件开发示例

### **Phase 6: 文档、测试与优化**（1-2周）

#### 目标
完善文档、测试覆盖率和性能优化

#### 具体任务
1. **文档体系完善**
   - [ ] 更新架构设计文档
   - [ ] 编写三种使用模式的完整指南
   - [ ] 创建最佳实践和迁移指南
   - [ ] 建立插件开发者文档

2. **测试覆盖率提升**
   - [ ] 核心包单元测试覆盖率 > 90%
   - [ ] Console 集成测试覆盖率 > 80%
   - [ ] E2E 测试覆盖主要使用场景

3. **性能优化**
   - [ ] 代码分割优化
   - [ ] 构建时间优化（< 10秒）
   - [ ] 运行时性能监控

#### 验收标准
- 完整的文档体系
- 高测试覆盖率
- 优秀的性能指标
- 用户反馈验证

## 🛠️ 开发规范

### **分支策略**
- 主分支：`main`
- 功能分支：`feature/phase-{n}-{description}`
- 发布分支：`release/v{version}`

### **提交规范**
```bash
feat(core): 实现插件管理器核心功能
refactor(console): 重构 Console 为纯集成器架构
docs(architecture): 更新架构设计文档
test(crud): 增加 CRUD 操作的单元测试
```

### **代码审查**
- 每个 Phase 结束前进行架构审查
- 关键组件需要 2 人以上审查
- 性能敏感代码需要性能测试

### **质量标准**
- TypeScript 严格模式，禁用 `any`
- ESLint 规则严格执行
- 测试覆盖率达标
- 文档与代码同步更新

## 📋 风险管控

### **技术风险**
1. **依赖冲突风险**
   - 缓解措施：使用 peer dependencies 和版本锁定
   - 应急方案：提供依赖兼容性指南

2. **性能风险**
   - 缓解措施：代码分割和懒加载
   - 监控方案：性能基准测试和持续监控

3. **兼容性风险**
   - 缓解措施：向后兼容性测试
   - 迁移方案：提供自动化迁移工具

### **业务风险**
1. **用户学习成本**
   - 缓解措施：详细文档和示例代码
   - 支持方案：社区支持和问题反馈渠道

2. **生态建设风险**
   - 缓解措施：官方插件先行，建立标准
   - 推广方案：开发者社区建设

## 🎯 成功指标

### **技术指标**
- [ ] 所有包可独立使用，文档完整
- [ ] Starter 包体积减少 80%
- [ ] Console 完全基于 packages 构建
- [ ] 支持三种使用模式，配置驱动
- [ ] 插件系统完整可用

### **用户体验指标**
- [ ] 从零到运行 < 5 分钟（console 模式）
- [ ] 添加自定义功能 < 30 分钟（hybrid 模式）
- [ ] 现有项目集成 < 2 小时（packages-only 模式）

### **生态指标**
- [ ] 至少 4 个官方插件
- [ ] 插件开发文档完整
- [ ] 社区反馈积极

这个路线图确保了架构重构的系统性和可执行性，为 LinchKit 向企业级平台的转型提供了清晰的实施路径。