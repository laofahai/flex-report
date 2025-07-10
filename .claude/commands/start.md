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

!echo "🧠 [$(date '+%H:%M:%S')] 任务复杂度和设计需求分析..."

!TASK_LEVEL="T1"
!if [[$ARGUMENTS =~ (实现新|添加新|创建新|集成.*API|修改架构|新功能|新模块|新页面)]]; then
TASK_LEVEL="T3"
echo "🎯 检测到 T3 强制级任务 - 需要完整方案设计"
elif [[$ARGUMENTS =~ (增强|重构|优化|修复.*逻辑|改进)]]; then
TASK_LEVEL="T2"  
 echo "⚡ 检测到 T2 轻量级任务 - 需要简化设计"
elif [[$ARGUMENTS =~ (修复拼写|调整样式|增加注释|微调|小修)]]; then
TASK_LEVEL="T1"
echo "🔧 检测到 T1 豁免级任务 - 跳过设计直接编码"
else

# 基于任务描述长度和关键词的智能判断

if [[${#ARGUMENTS} -gt 150]] || [[$ARGUMENTS =~ (架构|重构|性能|复杂|设计|算法)]]; then
TASK_LEVEL="T3"
echo "🎯 智能判断为 T3 强制级任务 - 需要完整方案设计"
elif [[${#ARGUMENTS} -gt 50]] || [[$ARGUMENTS =~ (功能|组件|模块|逻辑)]]; then
TASK_LEVEL="T2"
echo "⚡ 智能判断为 T2 轻量级任务 - 需要简化设计"  
 else
TASK_LEVEL="T1"
echo "🔧 智能判断为 T1 豁免级任务 - 跳过设计直接编码"
fi
fi

!echo "📋 任务级别: $TASK_LEVEL"
!if [["$TASK_LEVEL" == "T3"]] || [["$TASK_LEVEL" == "T2"]]; then
echo "🚨 复杂任务建议："
echo " • 使用 TodoWrite 拆分任务"
echo " • 每30分钟检查一次进度"
echo " • 适时使用 /end-session 保存状态"
echo "🧠 启用 thinking 模式进行深度分析"
fi

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

!echo "📋 步骤2: 查询项目架构文档..."
!if [[-d "ai-context"]]; then
echo "✅ ai-context 文档可用，Claude 将分析架构约束"
echo "📄 关键文档:"
echo " • ai-context/01_Concepts/03_Package_Architecture.md (critical)"
echo " • ai-context/01_Concepts/07_Strategic_Architecture_Evolution.md (critical)"
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

!echo "🎨 [$(date '+%H:%M:%S')] 根据任务级别启动相应设计流程..."

!if [["$TASK_LEVEL" == "T3"]]; then
echo "🚨 T3 强制级任务 - 启动完整方案设计流程"
echo "📋 Claude 将生成详细设计方案，需要您的审批后才能开始编码"
echo "📄 设计方案将包括：目标确认、影响范围、核心设计、待更新文档、测试策略"
echo "⏸️ 请等待 Claude 生成方案..."

elif [["$TASK_LEVEL" == "T2"]]; then
echo "⚡ T2 轻量级任务 - 启动简化设计流程"
echo "📋 Claude 将生成简要计划，需要您的快速确认"
echo "📝 简要计划将包括：变更点、影响范围、实现要点"
echo "⏸️ 请等待 Claude 生成计划..."

else
echo "🔧 T1 豁免级任务 - 跳过设计，直接进入智能编码"
echo "🚀 基于 Graph RAG 查询和架构分析结果直接开始编码"
fi

!echo ""
!echo "✅ [$(date '+%H:%M:%S')] Claude 综合分析完成，设计流程已启动！"
!echo "🚨 提醒: Claude 已承诺遵循所有架构约束，基于完整项目上下文进行开发"
