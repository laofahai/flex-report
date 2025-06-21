# LinchKit UI 包架构改进 - 工作恢复提示

**创建时间**: 2025-06-21 15:30
**任务状态**: 已暂停，等待架构改进指导

## 🎯 当前任务上下文

### 主要任务: LinchKit UI 包核心改进
**优先级**: 高
**依赖关系**: UI 包改进 → schema 扩展 → 其他包适配

### 背景说明
LinchKit UI 组件库阶段 2 开发已完成 70%，包括 CRUD 组件和 UI Blocks 的基础实现。现需要根据新的架构要求进行核心改进，重点关注国际化支持、第三方组件封装策略优化、schema 驱动的深度集成。

## 📁 代码状态

### 已实现的核心组件
```
packages/ui/src/components/
├── crud/
│   ├── data-table.tsx          # TanStack Table 封装，需要 schema 集成
│   ├── form-builder.tsx        # React Hook Form 封装，需要 i18n 支持
│   ├── searchable-select.tsx   # 搜索选择器，需要优化封装策略
│   └── index.ts                # CRUD 组件导出
├── blocks/
│   ├── dashboard-layout.tsx    # 仪表板布局，需要 i18n 支持
│   ├── auth-forms.tsx          # 认证表单，需要 i18n 集成
│   ├── data-display.tsx        # 数据展示组件
│   └── index.ts                # Blocks 组件导出
└── ui/                         # 基础 shadcn/ui 组件 (20+ 组件)
```

### 关键代码位置
1. **DataTable 组件** (`packages/ui/src/components/crud/data-table.tsx`)
   - 第 295-301 行: 搜索功能实现，需要 schema 字段配置
   - 第 401-407 行: 分页配置，需要国际化文本
   - 需要添加基于 schema 的高级筛选功能

2. **FormBuilder 组件** (`packages/ui/src/components/crud/form-builder.tsx`)
   - 第 175-190 行: 表单初始化，需要 i18n 集成
   - 第 233-237 行: 字段渲染，需要 schema 驱动配置
   - 需要参考 `packages/auth-core/src/i18n/` 的实现模式

3. **包导出配置** (`packages/ui/package.json`)
   - 第 6-14 行: 导出配置，已支持子模块
   - 需要添加 i18n 相关依赖

### 测试页面状态
- `/test-crud` - CRUD 组件演示 (http://localhost:3002/test-crud)
- `/test-blocks` - UI Blocks 演示 (http://localhost:3002/test-blocks)
- 当前可正常运行，可作为改进验证基础

## 🔧 下一步操作 (精确到函数/组件级别)

### 第一阶段: 国际化支持集成 (1-2 天)

#### 1.1 研究 auth-core 的 i18n 实现模式
```bash
# 分析现有 i18n 实现
cd packages/auth-core/src/i18n/
# 查看 index.ts, locales/, types.ts 的实现模式
```

#### 1.2 在 UI 包中实现 i18n 基础设施
**新增文件**:
- `packages/ui/src/i18n/index.ts` - i18n 主入口
- `packages/ui/src/i18n/types.ts` - i18n 类型定义
- `packages/ui/src/i18n/locales/zh.ts` - 中文语言包
- `packages/ui/src/i18n/locales/en.ts` - 英文语言包

**修改文件**:
- `packages/ui/src/components/crud/form-builder.tsx`
  - 在 `FormBuilder` 函数开头添加 `const { t } = useTranslation('ui')`
  - 替换硬编码文本为 `t('form.submit')` 等
- `packages/ui/src/components/crud/data-table.tsx`
  - 在 `DataTable` 函数开头添加 i18n hook
  - 替换 "Search...", "No results found." 等文本

#### 1.3 更新包依赖
**修改文件**: `packages/ui/package.json`
```json
{
  "dependencies": {
    "react-i18next": "^13.x.x",
    "i18next": "^23.x.x"
  }
}
```

### 第二阶段: 第三方组件封装策略优化 (1-2 天)

#### 2.1 优化 DataTable 组件封装
**修改文件**: `packages/ui/src/components/crud/data-table.tsx`
- 第 77-95 行: 添加 `tableProps?: Partial<TableOptions<TData>>` 参数
- 第 220-250 行: 在 `useReactTable` 调用中合并 `tableProps`
- 添加 `...tableProps` 透传机制，保留 TanStack Table 原生 API 访问

#### 2.2 优化 FormBuilder 组件封装
**修改文件**: `packages/ui/src/components/crud/form-builder.tsx`
- 第 85-105 行: 添加 `formProps?: UseFormProps<TFormData>` 参数
- 第 175-190 行: 在 `useForm` 调用中合并 `formProps`
- 确保用户可以直接使用 React Hook Form 的高级特性

#### 2.3 优化 SearchableSelect 组件封装
**修改文件**: `packages/ui/src/components/crud/searchable-select.tsx`
- 第 50-80 行: 添加 `commandProps?: ComponentProps<typeof Command>` 参数
- 保留对 Command 组件原生 API 的访问能力

### 第三阶段: Schema 驱动的深度集成 (2-3 天)

#### 3.1 扩展 schema 定义以支持 UI 配置
**修改文件**: `packages/schema/src/types.ts`
- 添加 UI 相关的字段配置选项
- 定义表格列配置、表单字段配置等类型

#### 3.2 实现 DataTable 的 schema 集成
**修改文件**: `packages/ui/src/components/crud/data-table.tsx`
- 添加 `generateColumnsFromSchema` 函数
- 实现基于 schema 的高级筛选功能
- 添加 `schemaConfig?: SchemaTableConfig` 参数

#### 3.3 实现 FormBuilder 的 schema 集成
**修改文件**: `packages/ui/src/components/crud/form-builder.tsx`
- 增强 `useFormFields` hook，支持从 schema 自动生成字段配置
- 添加 schema 验证规则的自动映射

## 🔗 依赖关系

### 包间依赖影响分析
1. **UI 包改进** → **schema 包扩展**
   - UI 组件需要 schema 包提供 UI 配置类型
   - 需要同步更新 schema 包的类型定义

2. **UI 包改进** → **auth-core 包**
   - 需要复用 auth-core 的 i18n 实现模式
   - 可能需要提取共享的 i18n 工具到 core 包

3. **UI 包改进** → **其他包适配**
   - crud 包可能需要更新以适配新的 UI 组件 API
   - starter 应用需要更新以使用新的组件特性

### 版本兼容性要求
- 确保所有包的 TypeScript 类型兼容
- 维护向后兼容性，避免破坏性变更
- 同步更新相关包的版本号

## 🧪 测试要求

### 必须运行的测试命令
```bash
# 类型检查
cd packages/ui && pnpm check-types
cd packages/schema && pnpm check-types
cd apps/linch-starter && pnpm type-check

# 构建验证
cd packages/ui && pnpm build
cd packages/schema && pnpm build

# 功能验证
cd apps/linch-starter && pnpm dev --port 3002
# 访问 http://localhost:3002/test-crud
# 访问 http://localhost:3002/test-blocks
```

### 验证步骤
1. **国际化验证**: 切换语言，确保所有文本正确翻译
2. **封装策略验证**: 测试原生 API 透传功能
3. **Schema 集成验证**: 测试基于 schema 的自动配置生成
4. **类型安全验证**: 确保所有 TypeScript 类型正确
5. **向后兼容验证**: 确保现有代码不受影响

## 📋 里程碑和验收标准

### 里程碑 1: 国际化支持完成
- [ ] 所有 UI 组件支持多语言
- [ ] 提供完整的中英文语言包
- [ ] 与 auth-core 的 i18n 系统保持一致

### 里程碑 2: 封装策略优化完成
- [ ] 所有第三方组件保留原生 API 访问
- [ ] 提供 `...props` 透传机制
- [ ] 文档说明高级用法

### 里程碑 3: Schema 集成完成
- [ ] DataTable 支持基于 schema 的列配置
- [ ] FormBuilder 支持 schema 驱动的字段生成
- [ ] 提供完整的类型安全保障

### 最终验收标准
- [ ] 所有测试命令通过
- [ ] 功能演示页面正常工作
- [ ] 文档更新完成
- [ ] 向后兼容性保持
- [ ] 性能无明显下降

## 🚨 注意事项

1. **包重命名评估**: 考虑将 `auth-core` 重命名为 `auth`
2. **整体架构观察**: 修改任何包时必须分析对其他包的影响
3. **渐进式改进**: 优先保证现有功能不受影响
4. **文档同步**: 每个改进都要同步更新相关文档
