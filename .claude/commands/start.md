🚨 开始开发 session - 必须严格遵循所有约束

**强制要求:**

- 阅读并遵守 @CLAUDE.md 中的所有约束
- 遵守 @ai-context/02_Guides/01_Development_Workflow.md 中的开发流程
- 完成 Graph RAG 强制查询（零容忍违规）

任务: $ARGUMENTS

!echo "🔍 [$(date '+%H:%M:%S')] 输入验证和安全检查..."
!if [[-z "$ARGUMENTS"]]; then
echo "❌ 错误：请提供任务描述"
exit 1
fi

!echo "🔍 [$(date '+%H:%M:%S')] 检查当前分支状态..."
!CURRENT_BRANCH=$(git branch --show-current)
!if [[ "$CURRENT_BRANCH" == "main" ]] || [["$CURRENT_BRANCH" == "master"]] || [["$CURRENT_BRANCH" == "develop"]]; then
echo "❌ 错误：不能在保护分支 $CURRENT_BRANCH 上工作"
echo "💡 建议：运行 /new-branch [功能名] 创建功能分支"
exit 1
fi

!echo "🧠 [$(date '+%H:%M:%S')] 开始 Claude 智能任务复杂度评估..."
!echo "📋 将基于 Graph RAG 查询结果和任务语义进行智能分析"
!echo "🎯 评估将在 Graph RAG 查询完成后进行"

!echo "🏗️ [$(date '+%H:%M:%S')] 开始 Claude 综合架构分析..."

!echo "📋 步骤1: 执行 Graph RAG 现有实现查询..."
!GRAPH_RAG_RESULT=$(bun run ai:session query "$ARGUMENTS" 2>&1)
!if [[$? -ne 0]]; then
echo "🚨 FATAL: Graph RAG 查询失败 - 这是零容忍违规"
echo "📋 错误详情: $GRAPH_RAG_RESULT"
echo "🛑 Claude 必须基于项目上下文进行开发，查询失败则停止"
exit 1
fi
!echo "✅ Graph RAG 查询完成，找到相关实现"

!echo "🧠 [$(date '+%H:%M:%S')] 执行 Claude 智能任务复杂度评估..."

!cat > .claude/temp-assessment-prompt.txt << EOF

# LinchKit 任务复杂度智能评估 Prompt

## 角色定义

你是一个资深的 LinchKit 软件架构师，专门负责评估开发任务的复杂度。你的判断将直接影响后续的设计流程选择和开发策略。

## 任务级别标准

### T1 级别：豁免级 (Exempt Level)

- **影响范围**：1-3 个文件
- **预计时间**：< 2 小时
- **架构影响**：无架构变更
- **设计需求**：无需设计，有清晰的实现路径
- **典型示例**：修复拼写、调整样式、增加注释、简单bug修复

### T2 级别：轻量级 (Lite Level)

- **影响范围**：单个包内多个文件，或跨包少量文件
- **预计时间**：2-8 小时
- **架构影响**：局部架构调整，不涉及核心设计变更
- **设计需求**：需要简要设计规划
- **典型示例**：功能增强、局部重构、复杂bug修复、性能优化

### T3 级别：强制级 (Full Level)

- **影响范围**：跨多个核心包，或引入新依赖/模块
- **预计时间**：> 1 天（8+ 小时）
- **架构影响**：涉及核心架构变更、新模块设计或重大重构
- **设计需求**：必须进行完整方案设计
- **典型示例**：新功能模块、新页面、API集成、架构重构

## 评估任务

**用户任务描述**：$ARGUMENTS

**Graph RAG 查询结果**：
$GRAPH_RAG_RESULT

**请基于上述信息进行智能评估，并严格按照以下JSON格式输出结果：**

{
"taskLevel": "T1|T2|T3",
"confidence": "high|medium|low",
"reasoning": "详细的判断理由，包括考虑的关键因素和决策逻辑",
"estimatedFilesToChange": 数字,
"estimatedTimeHours": 数字,
"potentialRisks": [
"具体风险描述1",
"具体风险描述2"
],
"recommendedActions": [
"建议的具体行动1",
"建议的具体行动2"
],
"graphRagFindings": "基于Graph RAG查询的关键发现总结",
"architectureImpact": "对LinchKit架构的具体影响分析"
}
EOF

!echo "🚨 正在进行 Claude 智能评估，请等待..."
!echo "📝 Claude 正在分析任务语义和 Graph RAG 结果..."
!echo "⏱️ 预计需要 10-15 秒完成评估"

!echo "📋 步骤2: 查询项目架构文档..."
!if [[-d "ai-context"]]; then
echo "✅ ai-context 文档可用，Claude 将分析架构约束"
echo "📄 关键文档:"
echo " • ai-context/01_Architecture/03_Package_Architecture.md (critical)"
echo " • ai-context/01_Architecture/07_Strategic_Architecture_Evolution.md (critical)"
echo " • ai-context/02_Guides/01_Development_Workflow.md (constraints)"
else
echo "⚠️ ai-context 目录不存在，架构分析受限"
fi

!echo "📋 步骤3: 准备智能代码模式分析..."
!echo "🧠 Claude 将基于 Graph RAG 查询结果智能分析现有代码模式"
!echo "🔍 Claude 将自动识别可复用的 LinchKit 包和组件"

!echo "📋 步骤4: Claude 架构分析承诺激活..."
!cat > .claude/current-session-analysis.md << EOF

# Claude 架构分析报告 - $(date '+%Y-%m-%d %H:%M:%S')

## 任务: $ARGUMENTS

## Graph RAG 查询结果

已完成项目上下文查询，发现相关现有实现

## 架构文档分析

- ai-context 文档可用
- 将遵循 LinchKit 当前架构原则
- 避免重复实现现有功能

## Claude 强制承诺

我承诺在本次开发中：

1. ✅ 基于 Graph RAG 查询结果复用现有实现
2. ✅ 遵循 ai-context 中的架构约束
3. ✅ 分析现有代码模式后再编码
4. ✅ 优先使用 LinchKit 核心包功能
5. ✅ 发现违规时立即停止并纠正

## 分析状态: 已完成 ✓

现在可以基于完整项目上下文开始智能开发
EOF

!echo "📚 [$(date '+%H:%M:%S')] 执行补充 Context7 查询..."
!if command -v context7 &> /dev/null; then
context7 "$ARGUMENTS" || echo "⚠️ Context7 查询失败，继续使用 Graph RAG 结果"
else
echo "⚠️ Context7 未安装，跳过查询"
fi

!echo "🤝 [$(date '+%H:%M:%S')] 检查是否需要 Gemini 协商..."
!if [[$ARGUMENTS =~ (设计|架构|技术选型|方案|复杂)]]; then
echo "💡 建议与Gemini协商设计最佳实践"
echo " 使用命令：与Gemini协商 $ARGUMENTS"
fi

!echo "📋 [$(date '+%H:%M:%S')] 检查包复用情况..."
!if [[-f "tools/dev/check-reuse.mjs"]]; then
bun run deps:check "$ARGUMENTS" || echo "⚠️ 包复用检查失败"
else
echo "⚠️ 包复用检查脚本不存在"
fi

!echo "🤖 [$(date '+%H:%M:%S')] 激活 Claude 自我监督机制..."
!cat > .claude/claude-session-monitor.md << EOF

# Claude 自我监督 - 当前会话强制约束

## 零容忍约束 (违反即终止)

1. 🚫 任何编码前必须先基于 Graph RAG 查询结果分析现有实现
2. 🚫 禁止重复实现已存在的 LinchKit 功能
3. 🚫 禁止使用 console.log/console.error，必须用 @linch-kit/core logger
4. 🚫 禁止跳过 ai-context 架构文档分析
5. 🚫 禁止在保护分支直接工作

## 自我检查机制

编码前自问：

- "我是否已查询并分析了现有相关实现？"
- "我是否确认没有重复实现现有功能？"
- "我是否遵循了当前 LinchKit 架构原则？"
- "我是否使用了正确的 LinchKit 核心包？"

## 违规处理

发现违规时必须：

1. 立即停止当前任务
2. 公开承认违规行为
3. 解释违规原因
4. 重新执行正确的分析流程

## 会话状态: 架构分析已完成 ✓

EOF

!echo "🎨 [$(date '+%H:%M:%S')] Claude 智能评估完成，准备启动相应设计流程..."

!echo "📋 提示：Claude 将基于智能评估结果自动选择最适合的设计流程"
!echo "🧠 Claude 现在拥有完整的项目上下文和任务复杂度分析"
!echo "🚀 请 Claude 继续基于评估结果进行后续开发流程"

!echo "📊 可选：Claude 可以现在就展示评估结果和建议的设计流程"

!echo "💾 [$(date '+%H:%M:%S')] 准备记录用户反馈和评估结果..."
!mkdir -p .claude/feedback-logs
!echo "🗂️ 反馈日志目录已准备：.claude/feedback-logs/"

!echo ""
!echo "✅ [$(date '+%H:%M:%S')] Claude 综合分析完成，设计流程已启动！"
!echo "🚨 提醒: Claude 已承诺遵循所有架构约束，基于完整项目上下文进行开发"
!echo "📋 下一步：Claude 将展示智能评估结果并等待您的确认"
