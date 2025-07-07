# LinchKit AI 助手快速启动指南

**版本**: v8.0  
**更新**: 2025-07-07  
**目标**: 简化 AI 助手工作流程，提供智能分层处理

## 🚀 快速启动（2分钟上手）

### 📋 每次 Session 必须执行的检查

**⚠️ 在开始任何任务前，AI 助手必须自动完成以下检查：**

1. **环境检查**
   ```bash
   pwd                           # 确认工作目录
   export PATH="/home/laofahai/.nvm/versions/node/v20.19.2/bin:$PATH"
   ```

2. **分支安全检查**
   ```bash
   git branch --show-current     # 检查当前分支
   git status                   # 查看工作目录状态
   ```

3. **自动分支创建**（如果在 main/master 分支）
   ```bash
   git checkout -b feature/[task-description]
   ```

4. **待办事项检查**
   ```bash
   # 使用 TodoRead 工具检查是否有未完成任务
   ```

## 🎯 智能任务分层处理

根据任务复杂度，AI 助手将自动选择合适的工作流程：

### 🟢 层级 1: 快速通道
**适用**: 简单、原子化任务（< 5分钟）
- 代码格式化、修复拼写、运行命令
- 简单的文件修改、查询信息

**流程**: 直接执行 → 快速验证 → 完成

### 🟡 层级 2: 标准开发  
**适用**: 常规开发任务（5-30分钟）
- 添加功能、创建组件、修改API
- 编写测试、重构代码

**流程**: 规划 → 上下文查询 → 实现 → 测试 → 验证

### 🔴 层级 3: 复杂探索
**适用**: 架构级任务（> 30分钟）
- 系统设计、性能优化、模块设计
- 技术选型、架构重构

**流程**: 深度分析 → Gemini协作 → 方案设计 → 分步实施

## 🤖 AI 助手行为规范

### ✅ 必须遵循的约束
- **使用 bun**（禁止 npm/yarn）
- **功能分支开发**（禁止在 main 分支工作）
- **LinchKit 包复用**（禁止重复实现）
- **测试同步**（功能与测试同步开发）
- **文档更新**（完成后更新相关文档）

### 🔄 自动化处理
- **分支检查**: 自动检测并创建功能分支
- **环境设置**: 自动设置必要的环境变量
- **质量验证**: 自动运行 linter、测试、构建
- **文档同步**: 提醒更新相关文档

## 📚 核心参考文档

### 🎯 必读约束
- **[workflow_and_constraints.md](./01_strategy_and_architecture/workflow_and_constraints.md)** - 完整的开发约束和规范

### 🏗️ 架构参考
- **[architecture/overview.md](./01_strategy_and_architecture/overview.md)** - 系统架构总览
- **[architecture/core_packages.md](./01_strategy_and_architecture/core_packages.md)** - 核心包设计

### 📈 项目状态
- **[development-status.md](./03_planning/development-status.md)** - 当前开发状态
- **[roadmap.md](./03_planning/roadmap.md)** - 项目路线图

## 🔧 常用工具

### 📊 上下文查询
```bash
# Neo4j 图谱查询（复杂任务必须使用）
bun scripts/ai-context/ai-context-cli.js --find-entity "User" --include-related
bun scripts/ai-context/ai-context-cli.js --find-symbol "createUser"
bun scripts/ai-context/ai-context-cli.js --find-pattern "add_field" --for-entity "User"
```

### 🛠️ 开发命令
```bash
bun dev          # 开发模式
bun build        # 构建验证
bun test         # 运行测试
bun validate     # 完整验证
bun lint:fix     # 修复代码规范
```

### 🎨 UI 组件
```bash
bun dlx shadcn@latest add [component]  # 添加 shadcn/ui 组件
```

## 🤝 Gemini 协作模式

### 触发条件
使用以下关键词时自动启用 Claude-Gemini 协作：
- "与Gemini商讨后推进" / "和Gemini探讨"
- "让Gemini分析" / "请Gemini协助"

### 协作流程
1. **Gemini**: 执行具体操作、收集信息
2. **Claude**: 提供架构建议、设计方案
3. **整合**: 融合两个AI的见解，提供综合方案

## ⚠️ 重要提醒

### 🚫 严格禁止
- 在 main/master 分支直接开发
- 使用 npm/yarn 代替 bun
- 重复实现 LinchKit 已有功能
- 跳过测试编写
- 硬编码敏感信息

### ✅ 强制要求
- 每次开发前检查分支
- 功能完成后立即更新测试
- 完成任务后更新文档
- 提交前运行完整验证

---

**💡 用户简化提示语**：
```
开始开发：[具体任务描述]
```
AI 将自动执行完整的初始化检查并选择合适的工作流程。

**📋 详细工作流程**: 参见 [AI_WORKFLOWS.md](./00_ai_collaboration/AI_WORKFLOWS.md)