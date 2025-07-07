# AI 开发 Session 标准模板

## 🚨 Phase 1: 强制性初始化检查 (必须完成)

### 1. 任务状态检查
```bash
# 检查待办事项
TodoRead
```

### 2. 分支安全检查 (🔴 最高优先级)
```bash
# 检查当前分支
git branch --show-current

# 如果在受限分支 (main/master/develop/release/*), 立即创建新分支
git checkout -b feature/[task-description]
```

### 3. 工作目录检查
```bash
# 检查工作目录状态
git status --porcelain

# 确保工作目录干净
```

### 4. 任务明确性检查
- [ ] 任务描述是否具体且可执行？
- [ ] 是否需要拆分为多个子任务？
- [ ] 预估复杂度和所需时间？

### 5. 上下文获取策略
```bash
# 优先读取索引文件
Read ai-context/manifest.json

# 按需获取相关文档
# 使用 Grep/Glob 搜索而非全文读取
```

## 🚨 Phase 2: 任务规划与分解

### 范围分析
```bash
# 搜索相关文件
Grep "关键词" --include="*.ts,*.tsx"
Glob "相关目录/**/*.ts"
```

### 任务计划生成
```markdown
## 开发计划：[功能名称]

**预估复杂度**: 🟢 简单 / 🟡 中等 / 🔴 复杂
**建议 Session 数**: X 个
**预估时间**: X 小时

### 任务分解
- [ ] 1. 创建功能分支 feature/[task-name]
- [ ] 2. [具体实现步骤1]
- [ ] 3. [具体实现步骤2]
- [ ] 4. 编写/更新测试用例
- [ ] 5. 运行 bun validate 验证
- [ ] 6. 更新文档 (changelog/roadmap)
- [ ] 7. 提交符合规范的 commit
- [ ] 8. 提醒用户创建 PR

### Session 分配
- **Session 1**: 任务 1-2 (基础架构)
- **Session 2**: 任务 3-4 (核心功能)
- **Session 3**: 任务 5-8 (测试与文档)
```

### 用户确认
> 📋 **计划确认**: 请确认以上计划是否符合您的期望，是否需要调整？

## 🚨 Phase 3: 实施与验证

### 开发执行
```bash
# 使用 TodoWrite 创建任务清单
TodoWrite

# 按计划逐步执行
# 每完成一个任务立即标记为 completed
```

### 完成定义检查
- [ ] 代码完成 - 功能代码已实现
- [ ] 类型安全 - 通过 TypeScript 检查
- [ ] 代码质量 - 运行 `bun lint` 无错误
- [ ] 测试通过 - 运行 `bun test` 全部通过
- [ ] 构建验证 - 运行 `bun build` 成功
- [ ] 文档更新 - 更新相关文档
- [ ] 规范提交 - 遵循 Conventional Commits
- [ ] 分支整洁 - 相对于目标分支干净

### Session 结束检查
```bash
# 运行完整验证
bun validate

# 提交更改
git add .
git commit -m "feat: [描述] 🤖 Generated with Claude Code"

# 更新待办事项
TodoWrite # 标记已完成任务
```

## 🎯 Session 结束模板

### 完成总结
```markdown
## ✅ Session 完成总结

### 已完成任务
- [x] 任务1: 描述
- [x] 任务2: 描述

### 下一步计划
- [ ] 后续任务1: 描述
- [ ] 后续任务2: 描述

### 文件变更
- 新增: `path/to/new/file.ts`
- 修改: `path/to/modified/file.ts`

### 验证状态
- [ ] 构建通过
- [ ] 测试通过
- [ ] 文档更新

### 建议
- 建议下一个 Session 继续处理: [具体任务]
- 或者可以结束当前功能开发，进行 PR 创建
```

### 用户选择
> 🚀 **下一步**: 
> - A. 继续下一个 Session 开发
> - B. 结束当前功能，创建 PR
> - C. 暂停开发，稍后继续

---

## 📋 违规检查清单

### 自动检查项
- [ ] 是否在受限分支工作？
- [ ] 是否创建了不必要的文件？
- [ ] 是否违反了 LinchKit 约束？
- [ ] 是否完成了所有必需步骤？

### 违规处理
```bash
# 如发现违规，立即回滚
git restore .
git checkout main
git checkout -b feature/correct-implementation

# 重新按正确流程执行
```

---

## 🔗 快速参考链接

- [约束文档](./workflow_and_constraints.md)
- [架构概览](./system_architecture/overview.md)
- [开发指南](./development_guides/)
- [上下文索引](./manifest.json)