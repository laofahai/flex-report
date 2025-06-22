# Linch Kit AI 工作流入口

**最后更新**: 2025-06-21
**文档版本**: v3.2 (重构为纯入口点)
**原始来源**: AI工作流程统一入口点
**维护责任**: AI 助手 + 开发团队
**更新内容**: 重构为纯入口点，删除重复内容，强化引用关系

---

## 🎯 AI 助手工作流程

### 第一步：理解项目现状
**必须按顺序阅读**：
1. **[项目核心要点](../core/project-essentials.md)** - 项目定位、技术栈、当前状态
2. **[包架构设计](../core/package-architecture.md)** - 包结构、依赖关系、架构决策
3. **[当前开发进度](./current-progress.md)** - 最新完成状态和正在进行的任务

### 第二步：查看任务规划
**了解工作优先级**：
- **[任务优先级规划](./task-priorities.md)** - 4阶段开发路线图和详细时间线

### 第三步：严格遵循开发标准
**强制遵循要求**：
- **[开发规范](../standards/development-standards.md)** - 永久性开发标准，不可违背
- **[文档标准](../standards/documentation-standards.md)** - 文档编写和维护标准
- **[工作流程标准](../standards/workflow-standards.md)** - Git工作流、测试、发布流程
- **[UI组件标准](../standards/ui-standards.md)** - UI开发和设计规范

### 第四步：定位代码位置
**快速定位工具**：
- **[代码位置索引](../core/code-locations.md)** - 关键文件和功能位置索引

## 🚀 当前工作状态

### 项目状态概览
详细信息请查看 **[当前开发进度](./current-progress.md#当前主要任务)**

### 下一步任务
详细规划请查看 **[任务优先级规划](./task-priorities.md#阶段1-全面项目测试和bug修复-当前阶段)**

## 🔧 开发环境验证

**环境检查流程**：
详细的环境验证步骤请查看 **[工作流程标准](../standards/workflow-standards.md#开发环境设置)**

**快速验证命令**：
```bash
# 设置Node.js环境并验证核心功能
export PATH="/home/laofahai/.nvm/versions/node/v20.19.2/bin:$PATH"
pnpm linch --help && pnpm linch plugin:list && pnpm dev
```

## 📋 开发任务执行

**标准开发流程**：
详细的开发任务模板请查看 **[工作流程标准](../standards/workflow-standards.md#开发流程)**

**核心执行原则**：
1. 使用 `codebase-retrieval` 工具了解相关代码
2. 严格遵循 **[开发规范](../standards/development-standards.md)** 中的所有强制要求
3. 每次修改后运行 `npx eslint --fix`
4. 同步更新相关文档

## ⚠️ 强制遵循要求

**开发标准**：
所有强制要求详见 **[开发规范](../standards/development-standards.md)**，包括：
- TypeScript文件要求、ESLint修复、JSDoc注释、包管理器使用等

**架构原则**：
详细原则请查看 **[包架构设计](../core/package-architecture.md#架构设计原则)**

**质量检查**：
完整的检查清单请查看 **[工作流程标准](../standards/workflow-standards.md#质量检查清单)**

## 🆘 问题处理指南

**技术问题**：
- 使用 **[代码位置索引](../core/code-locations.md)** 定位代码
- 参考 **[工作流程标准](../standards/workflow-standards.md#常见问题解决)**

**架构问题**：
- 查看 **[包架构设计](../core/package-architecture.md#关键架构决策-adr)**
- 遵循 **[开发规范](../standards/development-standards.md#架构一致性要求)**

---

## 🚀 开始工作

**工作流程检查清单**：
- [ ] 已阅读 [项目核心要点](../core/project-essentials.md)
- [ ] 已了解 [当前开发进度](./current-progress.md)
- [ ] 已查看 [任务优先级规划](./task-priorities.md)
- [ ] 已熟悉 [开发规范](../standards/development-standards.md)
- [ ] 已验证开发环境正常工作

**开始执行当前阶段任务**：
按照 **[任务优先级规划](./task-priorities.md#阶段1-全面项目测试和bug修复-当前阶段)** 执行具体任务。

**记住**：质量比速度更重要，架构一致性比临时解决方案更重要！
