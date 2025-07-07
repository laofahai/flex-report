# LinchKit 项目脚本

## 📋 可用脚本

### 🤖 AI 上下文工具
位置：`ai-context/`

- **ai-context-cli-fast.js** - 快速AI上下文查询工具（推荐）
- **ai-context-cli.js** - 通用AI上下文查询工具
- **ai-context-cli-v2.js** - 简化版AI上下文查询工具

详见：[AI Context 工具文档](./ai-context/README.md)

### 🔧 开发工具

#### graph-data-extractor.ts
**用途**: Neo4j图谱数据提取和更新
**运行**: `bun scripts/graph-data-extractor.ts`
**功能**: 
- 扫描项目代码结构
- 提取节点和关系数据
- 更新Neo4j知识图谱
- 支持增量更新

#### deps-graph.js  
**用途**: 包依赖关系分析
**运行**: `node scripts/deps-graph.js`
**功能**:
- 分析monorepo包依赖关系
- 生成依赖图谱
- 检测循环依赖

#### dev-tools.js
**用途**: 开发工具集合
**运行**: `node scripts/dev-tools.js`
**功能**:
- 开发环境设置
- 工具链验证

#### release.js
**用途**: 版本发布工具
**运行**: `node scripts/release.js` 
**功能**:
- 自动化版本发布流程
- 生成变更日志

## 🔄 数据维护工作流

### 定期更新Neo4j数据
```bash
# 重新提取项目图谱数据
bun scripts/graph-data-extractor.ts

# 验证图谱数据质量  
bun scripts/ai-context/ai-context-cli-fast.js --find-entity "User" --include-related
```

### 包依赖分析
```bash
# 生成依赖关系图
node scripts/deps-graph.js

# 检查依赖一致性
bun validate
```

## 🚮 已清理的脚本

以下脚本已删除（原因）：
- `architecture-analysis.js` - 生成静态报告，输出已过时
- `complexity-analysis.js` - 功能与其他工具重复 
- `performance-benchmark.js` - 基准测试结果过时
- `generate-architecture-diagram.js` - 图表生成需求变更
- `release.cjs` - 重复的发布脚本

## ⚠️ 使用说明

1. **环境依赖**: 确保安装了必要的依赖 (Neo4j, bun, node)
2. **配置检查**: 运行前检查 `.env.local` 中的数据库配置
3. **定期维护**: 建议每次重大代码变更后运行数据提取脚本