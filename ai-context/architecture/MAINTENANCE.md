# Architecture 目录维护指南

**文档版本**: v1.0.0  
**创建日期**: 2025-06-23  
**维护责任**: 架构团队  
**用途**: AI Agent 架构文档维护指导  

---

## 📋 目录结构说明

### 核心文档 (必须维护)
```
ai-context/architecture/
├── README.md                    # 架构文档入口和导航
├── system-architecture.md       # 系统整体架构设计
├── dependency-graph.md          # 包依赖关系图
├── development-constraints.md   # 开发约束和技术限制
├── development-priorities.md    # 开发优先级指南
├── packages-overview.md         # 包架构总览
├── packages/                    # 各包详细设计文档
│   ├── core.md                  # 核心包设计
│   ├── schema.md                # Schema包设计
│   ├── auth.md                  # 认证包设计
│   ├── crud.md                  # CRUD包设计
│   ├── trpc.md                  # tRPC包设计
│   ├── ui.md                    # UI包设计
│   ├── ai-integration.md        # AI集成插件设计
│   ├── workflow.md              # 工作流插件设计
│   └── starter-app.md           # 示例应用设计
└── MAINTENANCE.md               # 本维护指南
```

### 已合并文档 (内容已整合)
- `feature-inventory.md` → 内容合并到 `packages-overview.md`
- `tech-stack.md` → 内容合并到 `system-architecture.md`

---

## 🔄 文档同步更新要求

### 当修改包设计时 (packages/*.md)

#### 1. 更新依赖关系
如果修改了包的依赖关系，必须同步更新：
- `dependency-graph.md` - 更新依赖关系图
- `packages-overview.md` - 更新包状态表格
- `development-priorities.md` - 调整开发优先级

#### 2. 更新架构状态
如果修改了包的架构设计，必须同步更新：
- `packages-overview.md` - 更新设计状态
- `system-architecture.md` - 更新系统架构图
- `README.md` - 更新导航链接

#### 3. 更新开发约束
如果修改了技术实现方案，必须检查：
- `development-constraints.md` - 确认技术约束仍然适用
- `development-priorities.md` - 调整性能要求和验收标准

### 当添加新包时

#### 1. 创建包设计文档
```bash
# 在 packages/ 目录下创建新包文档
touch ai-context/architecture/packages/new-package.md
```

#### 2. 必须更新的文档
- `packages-overview.md` - 添加新包到状态表格和架构图
- `dependency-graph.md` - 更新依赖关系图
- `development-priorities.md` - 添加开发优先级
- `README.md` - 添加导航链接

#### 3. 可能需要更新的文档
- `system-architecture.md` - 如果影响系统架构
- `development-constraints.md` - 如果引入新的技术约束

### 当删除包时

#### 1. 移除包设计文档
```bash
# 移除包文档
rm ai-context/architecture/packages/old-package.md
```

#### 2. 必须更新的文档
- `packages-overview.md` - 从状态表格中移除
- `dependency-graph.md` - 更新依赖关系图
- `development-priorities.md` - 移除相关优先级
- `README.md` - 移除导航链接

---

## 📝 文档编写规范

### 包设计文档标准结构
每个包设计文档 (`packages/*.md`) 必须包含以下章节：

```markdown
# @linch-kit/package-name 包详细规划

**包版本**: v1.0.0  
**创建日期**: YYYY-MM-DD  
**开发优先级**: P0/P1/P2/P3  
**依赖**: 列出依赖的包  

## 📋 包概述
### 功能定位
### 职责边界
### 技术特色

## 🏗️ 架构设计
### 目录结构
### 核心类设计

## 🔧 技术实现
### 具体实现方案

## 📊 性能约束
### 构建性能
### 运行时性能

## 🧪 测试要求
### 测试覆盖率
### 测试示例

## 🚀 开发指南
### 开发优先级
### 验收标准
```

### 优先级标准
- **P0**: 最高优先级，核心基础设施
- **P1**: 高优先级，核心业务功能
- **P2**: 中优先级，扩展功能
- **P3**: 低优先级，优化和完善

### 依赖关系原则
- 严格遵循单向依赖：core → schema → auth → crud → trpc → ui
- 禁止循环依赖
- 插件包可以依赖多个核心包

---

## 🔍 文档一致性检查

### 定期检查项目
1. **依赖关系一致性**
   - `dependency-graph.md` 与各包文档的依赖声明一致
   - `packages-overview.md` 的依赖关系图正确

2. **优先级一致性**
   - `development-priorities.md` 与各包的优先级声明一致
   - 优先级符合依赖关系（被依赖的包优先级更高）

3. **架构状态一致性**
   - `packages-overview.md` 的状态表格反映实际设计进度
   - `README.md` 的导航链接完整有效

4. **技术约束一致性**
   - 各包的性能约束符合 `development-constraints.md`
   - 测试覆盖率要求统一

### 自动化检查脚本 (建议)
```bash
#!/bin/bash
# 检查所有包文档是否存在
for package in core schema auth crud trpc ui ai-integration workflow starter-app; do
  if [ ! -f "ai-context/architecture/packages/$package.md" ]; then
    echo "Missing package documentation: $package.md"
  fi
done

# 检查 README.md 中的链接
grep -o '\[.*\](.*\.md)' ai-context/architecture/README.md | while read link; do
  file=$(echo $link | sed 's/.*(\(.*\))/\1/')
  if [ ! -f "ai-context/architecture/$file" ]; then
    echo "Broken link in README.md: $file"
  fi
done
```

---

## 🚨 重要提醒

### 对 AI Agent 的要求
1. **修改任何包文档前**，必须先阅读本维护指南
2. **每次修改后**，必须检查并更新相关的其他文档
3. **添加新包时**，必须遵循标准文档结构
4. **删除包时**，必须清理所有相关引用

### 文档质量要求
- 所有文档必须保持最新状态
- 技术细节必须准确可执行
- 示例代码必须符合实际设计
- 性能约束必须可测量验证

### 版本控制
- 重大架构变更时更新文档版本号
- 在文档头部记录修改日期
- 保持变更历史的可追溯性

---

**维护责任**: 任何修改 architecture 目录的 AI Agent 都有责任确保文档的一致性和完整性。
