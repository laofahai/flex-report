# LinchKit 常见问题 (FAQ)

## 🚀 快速开始

### Q: 如何开始使用LinchKit？

A: 请参考[快速开始指南](../ai-context/00_Getting_Started/02_Quick_Start.md)。

### Q: 需要什么前置条件？

A:

- Node.js 18+
- Bun 包管理器
- 基础的TypeScript知识

## 🏗️ 架构相关

### Q: LinchKit的核心架构是什么？

A: LinchKit采用6+1架构设计，详见[系统架构文档](../ai-context/01_Architecture/02_System_Architecture.md)。

### Q: 如何理解包依赖关系？

A: 请查看[包架构设计](../ai-context/01_Architecture/03_Package_Architecture.md)。

## 🔧 开发问题

### Q: 如何贡献代码？

A: 请查看[贡献指南](../CONTRIBUTING.md)了解详细流程。

### Q: 有什么开发约束？

A: 请务必阅读[核心开发约束](../ai-context/00_Getting_Started/03_Essential_Rules.md)。

## 📦 包管理

### Q: 为什么只能使用bun？

A: 为了确保依赖一致性和构建速度，LinchKit强制使用bun作为包管理器。

### Q: 如何检查包复用？

A: 使用`bun run deps:check [关键词]`命令检查现有实现。

## 🧪 测试相关

### Q: 使用什么测试框架？

A: LinchKit强制使用`bun:test`，禁止使用vitest/jest。

### Q: 测试覆盖率要求？

A: 核心包98%+，关键包95%+，UI组件包90%+，应用层85%+。

## 🤖 AI集成

### Q: 如何使用AI Session工具？

A: 请参考[AI工具使用指南](../ai-context/02_Guides/02_AI_Tools_Usage.md)。

### Q: Graph RAG查询如何使用？

A: 任何代码相关任务前必须执行`bun run ai:session query`。

## 🔍 更多帮助

- [项目文档](../ai-context/README.md)
- [GitHub Issues](https://github.com/laofahai/linch-kit/issues)
- [开发指南](../ai-context/02_Guides/01_Development_Workflow.md)

---

**更新时间**: 2025-07-11  
**维护者**: LinchKit Team
