# Linch Kit AI 上下文文档

这个目录用于记录 AI 对项目的分析、当前进度、架构设计和未来规划，方便在切换环境或重新开始时快速理清项目状况。

## 📁 文档结构

```
ai-context/
├── README.md                           # 本文件，文档索引
├── project-overview.md                 # 项目总览和当前状态
├── QUICK-START.md                     # 快速开始指南
├── architecture/                      # 架构设计文档
│   ├── schema-system.md               # Schema 系统设计
│   └── plugin-system-core.md          # 插件系统核心设计 ⭐ 重点
├── principles/                        # 开发原则 ⭐ 新增
│   └── development-principles.md      # 核心开发原则
├── progress/                          # 开发进度记录
│   ├── current-status.md             # 当前开发状态
│   └── implementation-roadmap.md      # 实施路线图
├── decisions/                         # 技术决策记录
│   ├── tech-stack.md                 # 技术栈选择 (已更新原则)
│   ├── publishing-strategy.md         # 发布策略
│   └── plugin-system-architecture.md  # 插件系统架构决策 (已更新原则)
└── templates/                         # 模板和规范
    └── ai-first-best-practices.md    # AI-First 开发最佳实践
```

## 🎯 使用指南

### 新环境快速上手
1. 阅读 `project-overview.md` 了解项目整体情况
2. 查看 `progress/current-status.md` 了解当前进度
3. 参考 `architecture/overview.md` 理解系统架构

### 开发过程中
1. 更新 `progress/current-status.md` 记录当前工作
2. 在 `decisions/` 下记录重要技术决策
3. 完成功能后更新 `progress/completed-features.md`

### 规划新功能
1. 在 `progress/next-steps.md` 中记录计划
2. 在 `architecture/` 下添加相关设计文档
3. 使用 `templates/` 下的模板创建新包或插件

## 📝 文档维护原则

1. **及时更新**: 每次重要进展都要更新相关文档
2. **简洁明了**: 重点记录关键信息，避免冗余
3. **结构化**: 使用统一的格式和结构
4. **面向 AI**: 文档应该便于 AI 理解和处理
5. **版本控制**: 重要变更要记录时间和原因
