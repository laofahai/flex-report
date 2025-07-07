# LinchKit 文档架构重新梳理设计

**版本**: 1.0  
**创建**: 2025-07-07  
**分支**: feature/docs-restructure-and-standardization  
**状态**: 实施中  

## 🎯 重新梳理目标

基于与 Gemini 的协商和 CLAUDE.md 约束，实现以下目标：
1. **统一文档结构** - 消除 CLAUDE.md 与实际 ai-context 结构的不一致
2. **建立单一信息源** - 消除开发约束、AI 工具等信息的重复
3. **同步计划现状** - 让路线图与实际开发进展保持一致
4. **提升 AI 友好性** - 通过 manifest.json 让 AI 更好理解项目结构

## 🚨 遵循的核心约束

### 分支管理约束
- ✅ 已创建功能分支：`feature/docs-restructure-and-standardization`
- ✅ 禁止在主分支直接工作
- ✅ 遵循分支命名规范：`feature/[descriptive-name]`

### 开发流程约束
- ✅ 必须使用 bun 包管理
- ✅ 强制使用 TodoWrite 跟踪复杂任务
- ✅ 禁止 eslint-disable 滥用
- ✅ 确保构建成功和测试通过

## 🔍 发现的问题

### 1. 文档结构不一致
- CLAUDE.md 引用路径：`core/`, `architecture/`, `history/`
- 实际 ai-context 结构：`00-core/`, `02-architecture/`, `99-archive/`

### 2. 信息重复冗余
- 开发约束在 CLAUDE.md 和 development-workflow.md 中重复
- AI Session 工具信息分散在多个文档中
- 违反了"单一信息源"原则

### 3. 计划与现状脱节
- roadmap.md 中的计划与实际开发进展不符
- Neo4j 图谱功能已实现但文档未同步

## 🏗️ Gemini 协商的新架构设计

### 标准化结构
```
ai-context/
├── manifest.json                    # [新增] AI 主要入口
├── 00_Overview/
│   ├── 01_LinchKit_Intro.md         # 项目简介
│   └── 02_Quick_Start.md            # 快速上手
├── 01_Concepts/
│   ├── 01_Core_Principles.md        # 核心设计原则
│   └── 02_System_Architecture.md    # 系统架构概述
├── 02_Guides/
│   ├── 01_Development_Workflow.md   # [整合] 唯一的开发流程
│   ├── 02_AI_Tools_Usage.md         # [整合] 所有AI工具指南
│   └── 03_Console_Usage.md          # 管理平台使用
├── 03_Reference/
│   ├── 01_Packages_API/             # 包 API 文档
│   └── 02_Configuration.md          # 配置参考
├── 04_Project_Management/
│   ├── 01_Roadmap.md                # [同步] 统一路线图
│   ├── 02_Development_Status.md     # 开发状态
│   └── 03_Contribution_Guide.md     # 贡献指南
└── 99_Archive/                      # 历史归档
```

### CLAUDE.md 简化设计
只保留：
1. AI 助手的核心要求和角色定义
2. 指向 manifest.json 的明确指令
3. 高频任务的快速指令模板

## 🔄 实施计划

### 阶段 1：结构重组与内容合并
- [ ] 创建新目录结构
- [ ] 移动现有文档到新位置
- [ ] 合并重复信息到单一文档
- [ ] 整合 AI 工具信息

### 阶段 2：内容更新与同步
- [ ] 更新路线图反映实际进展
- [ ] 同步架构文档
- [ ] 创建 manifest.json

### 阶段 3：自动化与优化
- [ ] 创建文档同步脚本
- [ ] 配置 Git Hooks
- [ ] 简化 CLAUDE.md

## 📊 成功标准

- [ ] 所有文档链接有效
- [ ] 无信息重复和冲突
- [ ] AI 能正确理解和使用文档
- [ ] 路线图与实际进展一致
- [ ] 构建和测试通过

## 🔧 技术实现

### manifest.json 结构
```json
{
  "version": "1.0",
  "description": "LinchKit Knowledge Base Manifest",
  "aiInstructions": {
    "primaryEntry": "Always start by reading this manifest.json",
    "criticalDocuments": ["ai-context/02_Guides/01_Development_Workflow.md"]
  }
}
```

### 自动化脚本
- `scripts/sync-docs-manifest.mjs` - 自动更新 manifest.json
- Pre-commit Hook - 确保文档同步
- CI 校验 - 验证链接有效性

---

**实施负责人**: Claude AI  
**协商伙伴**: Gemini  
**预计完成**: 1-2 周  
**当前分支**: feature/docs-restructure-and-standardization