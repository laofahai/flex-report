# LinchKit 下次 Session 恢复提示

**创建时间**: 2025-06-21 16:00
**会话状态**: 已完成暂停流程

## 🎯 立即执行任务

### 主要任务: 架构文档全面更新
**优先级**: P0 (最高优先级)
**预计时间**: 1-2 小时

### 任务背景
LinchKit 架构已发生重要变更：
- ❌ **@linch-kit/crud-ui** 包已废弃
- ❌ **@linch-kit/auth-ui** 包已废弃  
- ✅ **@linch-kit/ui** 包统一承担所有 UI 组件功能

### 具体执行步骤

#### 第一步: 全面审查 ai-context 文档 (30分钟)
```bash
# 搜索所有对废弃包的引用
grep -r "crud-ui" ai-context/
grep -r "auth-ui" ai-context/
```

**需要更新的文档类别**:
1. **架构文档** (`ai-context/zh/architecture/`)
2. **项目计划** (`ai-context/zh/planning/`)
3. **开发标准** (`ai-context/zh/standards/`)
4. **管理文档** (`ai-context/zh/management/`)

#### 第二步: 系统性更新文档内容 (45分钟)
**更新规则**:
- `@linch-kit/crud-ui` → `@linch-kit/ui/crud`
- `@linch-kit/auth-ui` → `@linch-kit/ui/blocks` (认证表单)
- 移除独立包的描述，更新为子模块说明

**重点更新文件**:
1. `ai-context/zh/architecture/system-architecture.md`
2. `ai-context/zh/planning/project-roadmap.md`
3. `ai-context/zh/standards/ui-component-best-practices.md`
4. `ai-context/zh/management/task-priorities.md`

#### 第三步: 验证架构一致性 (15分钟)
- 检查所有文档中的包引用是否一致
- 确保导出结构说明正确
- 验证依赖关系图准确性

## 📁 当前代码状态

### 已实现的组件 (可直接使用)
```
packages/ui/src/components/
├── crud/
│   ├── data-table.tsx          # 完整实现
│   ├── form-builder.tsx        # 完整实现
│   ├── searchable-select.tsx   # 完整实现
│   └── index.ts                # 导出配置
├── blocks/
│   ├── dashboard-layout.tsx    # 完整实现
│   ├── auth-forms.tsx          # 完整实现
│   ├── data-display.tsx        # 完整实现
│   └── index.ts                # 导出配置
└── ui/                         # 20+ shadcn/ui 组件
```

### 包导出结构 (已配置)
```typescript
// 基础组件
import { Button, Input } from '@linch-kit/ui'

// CRUD 组件  
import { DataTable, FormBuilder } from '@linch-kit/ui/crud'

// UI Blocks
import { DashboardLayout, LoginForm } from '@linch-kit/ui/blocks'
```

### 测试页面 (可验证功能)
- http://localhost:3002/test-crud - CRUD 组件演示
- http://localhost:3002/test-blocks - UI Blocks 演示

## 🔧 后续开发任务 (架构更新完成后)

### UI 包核心改进 (P0 优先级)
详见 `ai-context/zh/management/work-resume-prompt.md`

1. **国际化支持** (1-2 天)
2. **第三方组件封装策略优化** (1-2 天)  
3. **Schema 驱动的深度集成** (2-3 天)

### 需要同步更新的包
1. **@linch-kit/schema** - 扩展 UI 配置类型
2. **@linch-kit/auth-core** - 复用 i18n 模式
3. **apps/linch-starter** - 验证新特性

## 🚨 重要提醒

### 必须遵循的原则
1. **所有文档使用中文**
2. **确保架构一致性** - 文档必须与实际实现匹配
3. **保持向后兼容** - 不破坏现有功能
4. **完整性检查** - 每个更新都要验证影响范围

### 验证检查清单
- [ ] 所有 ai-context 文档已更新
- [ ] 包引用全部正确
- [ ] 导出结构说明准确
- [ ] 依赖关系图更新
- [ ] 项目计划反映新架构
- [ ] 开发标准文档一致

## 📋 Session 开始命令

```bash
# 1. 检查当前状态
cd /home/laofahai/workspace/linch-kit
git status

# 2. 搜索需要更新的文档
grep -r "crud-ui\|auth-ui" ai-context/ --include="*.md"

# 3. 开始系统性更新
# 按照上述步骤逐一更新文档
```

## 🎯 成功标准

### 完成标志
- [ ] 所有 ai-context 文档不再包含对废弃包的引用
- [ ] 架构图和依赖关系准确反映当前状态
- [ ] 项目计划和任务优先级更新完成
- [ ] 开发指南和最佳实践文档一致

### 输出要求
- 提供清晰的变更摘要
- 列出具体更新的文件清单
- 确认架构一致性验证结果

---

**重要**: 这是一个架构清理任务，必须确保文档与实际代码实现完全一致，为后续的 UI 包核心改进奠定准确的文档基础。
