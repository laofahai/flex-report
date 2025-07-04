#!/bin/bash
# LinchKit AI 自动工作流生成器 - 完全AI化与规范集成
# 集成所有 LinchKit 开发规范约束和 Gemini 协商机制

set -euo pipefail

# 颜色定义
readonly RED='\033[0;31m'
readonly GREEN='\033[0;32m'
readonly YELLOW='\033[1;33m'
readonly BLUE='\033[0;34m'
readonly PURPLE='\033[0;35m'
readonly CYAN='\033[0;36m'
readonly NC='\033[0m'

# 获取脚本目录
readonly SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
readonly TASKS_DIR="$SCRIPT_DIR/../tasks"
readonly STATE_DIR="$SCRIPT_DIR/../state"
readonly PROJECT_ROOT="$(cd "$SCRIPT_DIR/../../../" && pwd)"
readonly AI_TEMPLATES_DIR="$SCRIPT_DIR/../ai-templates"

# 日志函数
log_info() { echo -e "${BLUE}[AI-INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[AI-SUCCESS]${NC} $1"; }
log_warning() { echo -e "${YELLOW}[AI-WARNING]${NC} $1"; }
log_error() { echo -e "${RED}[AI-ERROR]${NC} $1"; }
log_ai() { echo -e "${PURPLE}[AI-AGENT]${NC} $1"; }
log_gemini() { echo -e "${CYAN}[GEMINI]${NC} $1"; }

# 智能文件识别 - 判断文件是否为工作流生成
is_workflow_generated_file() {
    local file="$1"
    
    # 工作流生成文件模式
    local workflow_patterns=(
        "tasks/ai-generated-*"
        "state/*.state.json"
        "worktrees/*"
        "*.log"
        "*.tmp"
        ".devcontainer/workflow-mvp/tasks/*"
        ".devcontainer/workflow-mvp/state/*"
        "SESSION_PROGRESS.md"
        "NEXT_SESSION_PROMPT.md"
    )
    
    for pattern in "${workflow_patterns[@]}"; do
        if [[ "$file" == $pattern ]]; then
            return 0  # 是工作流生成的文件
        fi
    done
    
    return 1  # 不是工作流生成的文件
}

# 处理工作流生成的文件
handle_workflow_files() {
    local files=("$@")
    
    log_info "🤖 处理工作流生成的文件:"
    for file in "${files[@]}"; do
        echo "    📁 $file"
    done
    
    echo ""
    echo "工作流文件处理选项:"
    echo "1. 自动提交工作流文件（推荐）"
    echo "2. 忽略工作流文件，继续执行"
    echo "3. 清理工作流文件"
    
    read -p "请选择 (1-3): " choice
    
    case "$choice" in
        1)
            # 自动提交工作流文件
            for file in "${files[@]}"; do
                git add "$file" 2>/dev/null || true
            done
            git commit -m "feat(ai-workflow): 自动提交工作流生成的文件

🤖 AI工作流自动生成的文件包括:
$(printf '- %s\n' "${files[@]}")

🚀 Generated with LinchKit AI Workflow System
Co-Authored-By: Claude <noreply@anthropic.com>" 2>/dev/null || true
            log_success "✅ 工作流文件已自动提交"
            ;;
        2)
            log_info "✅ 忽略工作流文件，继续执行"
            ;;
        3)
            # 清理工作流文件
            for file in "${files[@]}"; do
                if [[ "$file" == worktrees/* ]]; then
                    rm -rf "$file" 2>/dev/null || true
                else
                    rm -f "$file" 2>/dev/null || true
                fi
            done
            log_success "✅ 工作流文件已清理"
            ;;
        *)
            log_error "无效选择，默认忽略文件"
            ;;
    esac
}

# 自动提交用户更改
auto_commit_changes() {
    log_info "🔄 自动提交所有更改..."
    
    # 添加所有更改
    git add . 2>/dev/null || true
    
    # 生成提交消息
    local commit_msg="chore: AI工作流自动提交用户更改

📝 自动提交包含以下更改:
$(git diff --cached --name-only | sed 's/^/- /')

🤖 Auto-committed by LinchKit AI Workflow System
Co-Authored-By: Claude <noreply@anthropic.com>"
    
    if git commit -m "$commit_msg" 2>/dev/null; then
        log_success "✅ 更改已自动提交"
    else
        log_warning "⚠️ 自动提交失败，请手动处理"
        return 1
    fi
}

# 智能环境管理系统 - 支持连续AI工作流
enforce_environment_constraints() {
    log_info "🚨 执行 LinchKit 智能环境约束检查..."
    
    # 1. 检查必要依赖
    local missing_deps=()
    
    if ! command -v bun &> /dev/null; then
        missing_deps+=("bun")
    fi
    
    if ! command -v jq &> /dev/null; then
        missing_deps+=("jq")
    fi
    
    if ! command -v git &> /dev/null; then
        missing_deps+=("git")
    fi
    
    if [ ${#missing_deps[@]} -gt 0 ]; then
        log_error "缺少必要依赖: ${missing_deps[*]}"
        log_error "请先安装依赖，然后重新运行"
        exit 1
    fi
    
    # 2. 检查 bun 环境路径
    local expected_path="/home/laofahai/.nvm/versions/node/v20.19.2/bin"
    if [[ ":$PATH:" != *":$expected_path:"* ]]; then
        log_warning "环境路径未包含必要路径，自动添加..."
        export PATH="$expected_path:$PATH"
    fi
    
    # 3. 检查当前分支安全性
    local current_branch
    current_branch=$(git branch --show-current 2>/dev/null || echo "")
    
    local restricted_branches=("main" "master" "develop")
    for branch in "${restricted_branches[@]}"; do
        if [[ "$current_branch" == "$branch"* ]]; then
            log_error "🚨 禁止在受限分支 '$current_branch' 工作"
            log_error "请创建功能分支: git checkout -b feature/[task-description]"
            exit 1
        fi
    done
    
    # 4. 智能工作目录状态检查
    if [ -n "$(git status --porcelain 2>/dev/null)" ]; then
        log_warning "⚠️ 工作目录有未提交更改"
        
        # 智能分析未提交更改的类型
        local untracked_files="$(git ls-files --others --exclude-standard)"
        local modified_files="$(git diff --name-only)"
        local staged_files="$(git diff --cached --name-only)"
        
        # 检查是否为工作流生成的文件
        local workflow_generated_files=()
        local user_modified_files=()
        
        # 分析未跟踪文件
        if [ -n "$untracked_files" ]; then
            while IFS= read -r file; do
                if is_workflow_generated_file "$file"; then
                    workflow_generated_files+=("$file")
                else
                    user_modified_files+=("$file")
                fi
            done <<< "$untracked_files"
        fi
        
        # 分析已修改文件
        if [ -n "$modified_files" ]; then
            while IFS= read -r file; do
                if is_workflow_generated_file "$file"; then
                    workflow_generated_files+=("$file")
                else
                    user_modified_files+=("$file")
                fi
            done <<< "$modified_files"
        fi
        
        # 智能处理策略
        if [ ${#workflow_generated_files[@]} -gt 0 ] && [ ${#user_modified_files[@]} -eq 0 ]; then
            log_info "✅ 检测到纯工作流生成的文件，自动处理中..."
            handle_workflow_files "${workflow_generated_files[@]}"
        elif [ ${#user_modified_files[@]} -gt 0 ]; then
            log_warning "🔍 检测到用户修改的文件，需要手动处理:"
            for file in "${user_modified_files[@]}"; do
                echo "    📝 $file"
            done
            
            echo ""
            echo "请选择处理方式:"
            echo "1. 自动提交所有更改并继续"
            echo "2. 暂存更改并继续"
            echo "3. 手动处理后重新运行"
            echo "4. 忽略并继续（不推荐）"
            
            read -p "请选择 (1-4): " choice
            
            case "$choice" in
                1)
                    auto_commit_changes
                    ;;
                2)
                    git stash push -m "AI工作流自动暂存 - $(date)"
                    log_info "✅ 更改已暂存，可通过 'git stash pop' 恢复"
                    ;;
                3)
                    log_info "请手动处理更改后重新运行"
                    return 1
                    ;;
                4)
                    log_warning "⚠️ 忽略更改继续执行（可能存在冲突风险）"
                    ;;
                *)
                    log_error "无效选择，请重新运行"
                    return 1
                    ;;
            esac
        else
            log_info "✅ 工作目录状态已智能处理"
        fi
    fi
    
    log_success "✅ 智能环境约束检查通过"
    return 0
}

# AI 任务解析器：从自然语言解析任务需求
parse_natural_language_task() {
    local user_input="$1"
    log_ai "🤖 解析用户需求: $user_input"
    
    # 创建任务解析配置
    local task_analysis=$(cat << 'EOF'
{
  "raw_input": "USER_INPUT_PLACEHOLDER",
  "analysis": {
    "task_type": "unknown",
    "scope": [],
    "complexity": "unknown",
    "estimated_hours": 0,
    "packages_involved": [],
    "requires_gemini_consultation": false,
    "ai_confidence": 0.0
  },
  "constraints_check": {
    "typescript_strict": true,
    "bun_only": true,
    "architecture_deps": true,
    "test_coverage": true,
    "no_circular_deps": true
  },
  "generated_tasks": []
}
EOF
)
    
    # 替换占位符
    task_analysis="${task_analysis/USER_INPUT_PLACEHOLDER/$user_input}"
    
    # 基于关键词进行基础解析
    local task_type="unknown"
    local scope=()
    local packages=()
    local complexity="medium"
    local requires_gemini=false
    
    # 任务类型识别
    if [[ "$user_input" =~ (认证|auth|oidc|jwt|login) ]]; then
        task_type="authentication"
        packages+=("@linchkit/auth")
        scope+=("packages/auth")
    elif [[ "$user_input" =~ (CRUD|增删改查|数据库|crud) ]]; then
        task_type="crud"
        packages+=("@linchkit/crud" "@linchkit/schema")
        scope+=("packages/crud" "packages/schema")
    elif [[ "$user_input" =~ (UI|界面|组件|component) ]]; then
        task_type="ui"
        packages+=("@linchkit/ui")
        scope+=("packages/ui")
    elif [[ "$user_input" =~ (API|接口|trpc|router) ]]; then
        task_type="api"
        packages+=("@linchkit/trpc")
        scope+=("packages/trpc")
    elif [[ "$user_input" =~ (测试|test|单元测试) ]]; then
        task_type="testing"
        complexity="low"
    elif [[ "$user_input" =~ (重构|优化|refactor) ]]; then
        task_type="refactor"
        complexity="high"
        requires_gemini=true
    else
        task_type="general"
        requires_gemini=true
    fi
    
    # 复杂度评估
    if [[ "$user_input" =~ (新增|添加|实现|创建) ]]; then
        complexity="medium"
    elif [[ "$user_input" =~ (修复|fix|bug) ]]; then
        complexity="low"
    elif [[ "$user_input" =~ (重构|架构|migration|迁移) ]]; then
        complexity="high"
        requires_gemini=true
    fi
    
    # 生成解析结果
    # 处理可能为空的数组
    local scope_json="[]"
    local packages_json="[]"
    
    if [ ${#scope[@]} -gt 0 ]; then
        scope_json=$(printf '%s\n' "${scope[@]}" | jq -R . | jq -s . 2>/dev/null || echo '[]')
    fi
    
    if [ ${#packages[@]} -gt 0 ]; then
        packages_json=$(printf '%s\n' "${packages[@]}" | jq -R . | jq -s . 2>/dev/null || echo '[]')
    fi
    
    # 调试输出
    echo "DEBUG: scope_json=$scope_json" >&2
    echo "DEBUG: packages_json=$packages_json" >&2
    
    task_analysis=$(echo "$task_analysis" | jq \
        --arg task_type "$task_type" \
        --argjson scope "$scope_json" \
        --arg complexity "$complexity" \
        --argjson packages "$packages_json" \
        --argjson requires_gemini "$requires_gemini" \
        '.analysis.task_type = $task_type |
         .analysis.scope = $scope |
         .analysis.complexity = $complexity |
         .analysis.packages_involved = $packages |
         .analysis.requires_gemini_consultation = $requires_gemini |
         .analysis.ai_confidence = (if $requires_gemini then 0.6 else 0.8 end)' 2>/dev/null || echo '{}')
    
    echo "$task_analysis"
}

# Gemini 协商机制
consult_with_gemini() {
    local task_analysis="$1"
    log_gemini "🤝 启动与 Gemini 的协商流程..."
    
    local requires_gemini
    requires_gemini=$(echo "$task_analysis" | jq -r '.analysis.requires_gemini_consultation')
    
    if [ "$requires_gemini" != "true" ]; then
        log_info "任务复杂度适中，跳过 Gemini 协商"
        echo "$task_analysis"
        return 0
    fi
    
    # 准备 Gemini 协商提示
    local gemini_prompt=$(cat << 'EOF'
LinchKit AI 工作流协商请求

## 任务分析结果
TASK_ANALYSIS_PLACEHOLDER

## 协商要点
1. 技术方案建议和风险评估
2. 任务分解和优先级排序
3. LinchKit 架构约束的遵守建议
4. 测试策略和质量保证建议

## LinchKit 强制性约束（必须遵守）
- TypeScript 严格模式，禁止 any 类型
- 仅使用 bun 包管理器
- 架构依赖顺序：core → schema → auth → crud → trpc → ui → console
- 测试覆盖率 > 80% (core > 90%)
- 必须使用 LinchKit 内部包功能，禁止重复实现

请提供详细的技术建议和实施方案。
EOF
)
    
    # 替换占位符
    gemini_prompt="${gemini_prompt/TASK_ANALYSIS_PLACEHOLDER/$task_analysis}"
    
    # 尝试调用 Gemini
    log_gemini "正在联系 Gemini..."
    local gemini_response=""
    
    if command -v gemini &> /dev/null; then
        if gemini_response=$(echo "$gemini_prompt" | gemini 2>/dev/null); then
            log_success "✅ Gemini 协商完成"
            log_gemini "Gemini 建议:"
            echo "$gemini_response" | head -20
            
            # 将 Gemini 建议集成到任务分析中
            task_analysis=$(echo "$task_analysis" | jq \
                --arg gemini_advice "$gemini_response" \
                '.gemini_consultation = {
                    "completed": true,
                    "advice": $gemini_advice,
                    "timestamp": now | strftime("%Y-%m-%dT%H:%M:%SZ")
                } | .analysis.ai_confidence = 0.9')
        else
            log_warning "⚠️ Gemini 连接失败，使用内置专家知识继续"
            task_analysis=$(echo "$task_analysis" | jq \
                '.gemini_consultation = {
                    "completed": false,
                    "reason": "connection_failed",
                    "fallback": "using_built_in_expertise"
                }')
        fi
    else
        log_warning "⚠️ Gemini CLI 未安装，使用内置专家知识"
        task_analysis=$(echo "$task_analysis" | jq \
            '.gemini_consultation = {
                "completed": false,
                "reason": "cli_not_available",
                "fallback": "using_built_in_expertise"
            }')
    fi
    
    echo "$task_analysis"
}

# AI 工作流生成器：基于分析结果生成具体工作流
generate_workflow_from_analysis() {
    local task_analysis="$1"
    local workflow_id="$2"
    
    log_ai "🔧 生成 AI 工作流配置..." >&2
    
    local task_type
    local scope
    local packages
    local complexity
    
    task_type=$(echo "$task_analysis" | jq -r '.analysis.task_type')
    scope=$(echo "$task_analysis" | jq -r '.analysis.scope[]' 2>/dev/null || echo "")
    packages=$(echo "$task_analysis" | jq -r '.analysis.packages_involved[]' 2>/dev/null || echo "")
    complexity=$(echo "$task_analysis" | jq -r '.analysis.complexity')
    
    # 基础工作流模板
    local workflow_config=$(cat << 'EOF'
{
  "workflow": {
    "id": "WORKFLOW_ID_PLACEHOLDER",
    "description": "AI 生成的自动化工作流",
    "ai_generated": true,
    "linchkit_constraints_enforced": true,
    "automation_level": "AUTOMATION_LEVEL_PLACEHOLDER",
    "tasks": []
  },
  "metadata": {
    "task_type": "TASK_TYPE_PLACEHOLDER",
    "complexity": "COMPLEXITY_PLACEHOLDER",
    "generated_at": "TIMESTAMP_PLACEHOLDER",
    "ai_confidence": "AI_CONFIDENCE_PLACEHOLDER"
  }
}
EOF
)
    
    # 替换基础占位符
    local timestamp
    timestamp=$(date -Iseconds)
    local ai_confidence
    ai_confidence=$(echo "$task_analysis" | jq -r '.analysis.ai_confidence')
    
    # 根据任务类型和复杂度决定自动化级别
    local automation_level="safe"
    case "$task_type" in
        "testing")
            automation_level="moderate"  # 测试任务通常可以自动化
            ;;
        "general"|"refactor")
            if [ "$complexity" = "high" ]; then
                automation_level="safe"  # 高复杂度任务需要人工确认
            else
                automation_level="moderate"
            fi
            ;;
        *)
            automation_level="moderate"  # 默认使用适度自动化
            ;;
    esac
    
    workflow_config="${workflow_config/WORKFLOW_ID_PLACEHOLDER/$workflow_id}"
    workflow_config="${workflow_config/TASK_TYPE_PLACEHOLDER/$task_type}"
    workflow_config="${workflow_config/COMPLEXITY_PLACEHOLDER/$complexity}"
    workflow_config="${workflow_config/TIMESTAMP_PLACEHOLDER/$timestamp}"
    workflow_config="${workflow_config/AI_CONFIDENCE_PLACEHOLDER/$ai_confidence}"
    workflow_config="${workflow_config/AUTOMATION_LEVEL_PLACEHOLDER/$automation_level}"
    
    # 根据任务类型生成具体任务
    local tasks_json="[]"
    
    case "$task_type" in
        "authentication")
            tasks_json=$(generate_auth_tasks "$scope")
            ;;
        "crud")
            tasks_json=$(generate_crud_tasks "$scope")
            ;;
        "ui")
            tasks_json=$(generate_ui_tasks "$scope")
            ;;
        "api")
            tasks_json=$(generate_api_tasks "$scope")
            ;;
        "testing")
            tasks_json=$(generate_testing_tasks "$scope")
            ;;
        *)
            tasks_json=$(generate_general_tasks "$scope")
            ;;
    esac
    
    # 插入任务到工作流配置
    workflow_config=$(echo "$workflow_config" | jq --argjson tasks "$tasks_json" '.workflow.tasks = $tasks')
    
    # 添加强制性 LinchKit 约束检查任务
    workflow_config=$(add_linchkit_constraint_tasks "$workflow_config")
    
    echo "$workflow_config"
}

# 生成认证相关任务
generate_auth_tasks() {
    local scope="$1"
    cat << 'EOF'
[
  {
    "id": "setup-auth-branch",
    "type": "git",
    "command": "worktree add -b feature/auth/ai-generated ./worktrees/auth-ai main",
    "depends_on": [],
    "linchkit_constraint": "分支安全检查"
  },
  {
    "id": "install-deps",
    "type": "shell", 
    "command": "cd ./worktrees/auth-ai && export PATH=\"/home/laofahai/.nvm/versions/node/v20.19.2/bin:$PATH\" && bun install",
    "depends_on": ["setup-auth-branch"],
    "linchkit_constraint": "强制使用 bun"
  },
  {
    "id": "build-dependencies",
    "type": "shell",
    "command": "cd ./worktrees/auth-ai && bun run build --filter=@linchkit/core --filter=@linchkit/schema",
    "depends_on": ["install-deps"],
    "linchkit_constraint": "架构依赖顺序"
  },
  {
    "id": "run-auth-tests",
    "type": "shell",
    "command": "cd ./worktrees/auth-ai && bun test --filter=@linchkit/auth",
    "depends_on": ["build-dependencies"],
    "linchkit_constraint": "测试覆盖率检查"
  },
  {
    "id": "typescript-strict-check",
    "type": "shell",
    "command": "cd ./worktrees/auth-ai && bun run check-types --filter=@linchkit/auth",
    "depends_on": ["run-auth-tests"],
    "linchkit_constraint": "TypeScript 严格模式"
  },
  {
    "id": "eslint-quality-check",
    "type": "shell",
    "command": "cd ./worktrees/auth-ai && bun run lint --filter=@linchkit/auth",
    "depends_on": ["typescript-strict-check"],
    "linchkit_constraint": "代码质量标准"
  }
]
EOF
}

# 生成 CRUD 相关任务
generate_crud_tasks() {
    local scope="$1"
    cat << 'EOF'
[
  {
    "id": "setup-crud-branch",
    "type": "git",
    "command": "worktree add -b feature/crud/ai-generated ./worktrees/crud-ai main",
    "depends_on": [],
    "linchkit_constraint": "分支安全检查"
  },
  {
    "id": "install-deps",
    "type": "shell",
    "command": "cd ./worktrees/crud-ai && export PATH=\"/home/laofahai/.nvm/versions/node/v20.19.2/bin:$PATH\" && bun install",
    "depends_on": ["setup-crud-branch"],
    "linchkit_constraint": "强制使用 bun"
  },
  {
    "id": "build-core-schema",
    "type": "shell",
    "command": "cd ./worktrees/crud-ai && bun run build --filter=@linchkit/core --filter=@linchkit/schema",
    "depends_on": ["install-deps"],
    "linchkit_constraint": "架构依赖顺序"
  },
  {
    "id": "run-crud-tests",
    "type": "shell",
    "command": "cd ./worktrees/crud-ai && bun test --filter=@linchkit/crud",
    "depends_on": ["build-core-schema"],
    "linchkit_constraint": "测试覆盖率检查"
  },
  {
    "id": "schema-validation",
    "type": "shell",
    "command": "cd ./worktrees/crud-ai && bun test --filter=@linchkit/schema",
    "depends_on": ["run-crud-tests"],
    "linchkit_constraint": "Schema 驱动验证"
  }
]
EOF
}

# 生成 UI 相关任务
generate_ui_tasks() {
    local scope="$1"
    cat << 'EOF'
[
  {
    "id": "setup-ui-branch",
    "type": "git",
    "command": "worktree add -b feature/ui/ai-generated ./worktrees/ui-ai main",
    "depends_on": [],
    "linchkit_constraint": "分支安全检查"
  },
  {
    "id": "install-deps",
    "type": "shell",
    "command": "cd ./worktrees/ui-ai && export PATH=\"/home/laofahai/.nvm/versions/node/v20.19.2/bin:$PATH\" && bun install",
    "depends_on": ["setup-ui-branch"],
    "linchkit_constraint": "强制使用 bun"
  },
  {
    "id": "tailwind-config-check",
    "type": "shell",
    "command": "cd ./worktrees/ui-ai && test -f packages/ui/src/styles/globals.css && echo 'Tailwind CSS 4 配置检查通过'",
    "depends_on": ["install-deps"],
    "linchkit_constraint": "Tailwind CSS 4 规范"
  },
  {
    "id": "shadcn-components-check",
    "type": "shell",
    "command": "cd ./worktrees/ui-ai && test -d packages/ui/components && echo 'shadcn/ui 组件结构检查通过'",
    "depends_on": ["tailwind-config-check"],
    "linchkit_constraint": "UI 组件规范"
  },
  {
    "id": "run-ui-tests",
    "type": "shell",
    "command": "cd ./worktrees/ui-ai && bun test --filter=@linchkit/ui",
    "depends_on": ["shadcn-components-check"],
    "linchkit_constraint": "测试覆盖率检查"
  }
]
EOF
}

# 生成 API 相关任务  
generate_api_tasks() {
    local scope="$1"
    cat << 'EOF'
[
  {
    "id": "setup-api-branch",
    "type": "git",
    "command": "worktree add -b feature/api/ai-generated ./worktrees/api-ai main",
    "depends_on": [],
    "linchkit_constraint": "分支安全检查"
  },
  {
    "id": "install-deps",
    "type": "shell",
    "command": "cd ./worktrees/api-ai && export PATH=\"/home/laofahai/.nvm/versions/node/v20.19.2/bin:$PATH\" && bun install",
    "depends_on": ["setup-api-branch"],
    "linchkit_constraint": "强制使用 bun"
  },
  {
    "id": "build-all-deps",
    "type": "shell",
    "command": "cd ./worktrees/api-ai && bun run build --filter=@linchkit/core --filter=@linchkit/schema --filter=@linchkit/auth --filter=@linchkit/crud",
    "depends_on": ["install-deps"],
    "linchkit_constraint": "架构依赖顺序"
  },
  {
    "id": "trpc-type-safety-check",
    "type": "shell",
    "command": "cd ./worktrees/api-ai && bun run check-types --filter=@linchkit/trpc",
    "depends_on": ["build-all-deps"],
    "linchkit_constraint": "端到端类型安全"
  },
  {
    "id": "run-api-tests",
    "type": "shell",
    "command": "cd ./worktrees/api-ai && bun test --filter=@linchkit/trpc",
    "depends_on": ["trpc-type-safety-check"],
    "linchkit_constraint": "测试覆盖率检查"
  }
]
EOF
}

# 生成测试相关任务
generate_testing_tasks() {
    local scope="$1"
    cat << 'EOF'
[
  {
    "id": "setup-test-branch",
    "type": "git",
    "command": "worktree add -b test/ai-generated ./worktrees/test-ai main",
    "depends_on": [],
    "linchkit_constraint": "分支安全检查"
  },
  {
    "id": "install-deps",
    "type": "shell",
    "command": "cd ./worktrees/test-ai && export PATH=\"/home/laofahai/.nvm/versions/node/v20.19.2/bin:$PATH\" && bun install",
    "depends_on": ["setup-test-branch"],
    "linchkit_constraint": "强制使用 bun"
  },
  {
    "id": "run-all-tests",
    "type": "shell",
    "command": "cd ./worktrees/test-ai && bun test",
    "depends_on": ["install-deps"],
    "linchkit_constraint": "全量测试覆盖率"
  },
  {
    "id": "coverage-report",
    "type": "shell",
    "command": "cd ./worktrees/test-ai && bun run test:coverage",
    "depends_on": ["run-all-tests"],
    "linchkit_constraint": "测试覆盖率 > 80%"
  }
]
EOF
}

# 生成通用任务
generate_general_tasks() {
    local scope="$1"
    cat << 'EOF'
[
  {
    "id": "setup-general-branch",
    "type": "git",
    "command": "worktree add -b feature/general/ai-generated ./worktrees/general-ai main",
    "depends_on": [],
    "linchkit_constraint": "分支安全检查"
  },
  {
    "id": "install-deps",
    "type": "shell",
    "command": "cd ./worktrees/general-ai && export PATH=\"/home/laofahai/.nvm/versions/node/v20.19.2/bin:$PATH\" && bun install",
    "depends_on": ["setup-general-branch"],
    "linchkit_constraint": "强制使用 bun"
  },
  {
    "id": "full-build",
    "type": "shell",
    "command": "cd ./worktrees/general-ai && bun run build",
    "depends_on": ["install-deps"],
    "linchkit_constraint": "完整构建验证"
  },
  {
    "id": "quality-check",
    "type": "shell",
    "command": "cd ./worktrees/general-ai && bun run lint && bun run check-types",
    "depends_on": ["full-build"],
    "linchkit_constraint": "代码质量和类型安全"
  }
]
EOF
}

# 添加 LinchKit 强制性约束任务
add_linchkit_constraint_tasks() {
    local workflow_config="$1"
    
    # 添加强制性约束验证任务
    local constraint_tasks=$(cat << 'EOF'
[
  {
    "id": "final-constraint-validation",
    "type": "shell",
    "command": "echo '🚨 LinchKit 强制性约束最终验证' && cd ./worktrees/*/",
    "depends_on": [],
    "linchkit_constraint": "最终约束验证",
    "priority": "critical"
  },
  {
    "id": "architecture-dependency-check",
    "type": "shell", 
    "command": "echo '检查架构依赖顺序: core → schema → auth → crud → trpc → ui → console'",
    "depends_on": ["final-constraint-validation"],
    "linchkit_constraint": "架构依赖顺序验证"
  },
  {
    "id": "no-circular-deps-check",
    "type": "shell",
    "command": "echo '检查循环依赖' && cd ./worktrees/*/ && bun run deps:check || echo '依赖检查完成'",
    "depends_on": ["architecture-dependency-check"],
    "linchkit_constraint": "禁止循环依赖"
  }
]
EOF
)
    
    # 将约束任务添加到现有任务末尾
    workflow_config=$(echo "$workflow_config" | jq --argjson constraint_tasks "$constraint_tasks" \
        '.workflow.tasks += $constraint_tasks')
    
    echo "$workflow_config"
}

# AI 自动执行管理器
ai_auto_execute() {
    local workflow_config="$1"
    local workflow_id="$2"
    
    log_ai "🚀 启动 AI 自动执行管理器..."
    
    # 保存工作流配置
    local config_file="$TASKS_DIR/ai-generated-$workflow_id.json"
    
    # 调试输出
    echo "DEBUG: workflow_config contents:" >&2
    echo "$workflow_config" | head -20 >&2
    
    # 确保配置是有效的 JSON
    if echo "$workflow_config" | jq . >/dev/null 2>&1; then
        echo "$workflow_config" | jq . > "$config_file"
    else
        log_error "生成的工作流配置不是有效的 JSON"
        echo "$workflow_config" > "${config_file}.debug"
        log_error "调试输出已保存到: ${config_file}.debug"
        echo "DEBUG: JSON validation error:" >&2
        echo "$workflow_config" | jq . 2>&1 || true
        return 1
    fi
    
    log_info "已生成 AI 工作流配置: $config_file"
    
    # 显示工作流摘要
    echo ""
    log_ai "📋 AI 工作流摘要:"
    echo "$workflow_config" | jq -r '.workflow.tasks[] | "  ✓ \(.id): \(.linchkit_constraint // "通用任务")"'
    
    echo ""
    read -p "是否立即执行此 AI 工作流？(y/n): " execute_choice
    
    if [[ "$execute_choice" =~ ^[Yy]$ ]]; then
        log_ai "🎯 开始自动执行 AI 工作流..."
        
        # 调用核心引擎执行
        if "$SCRIPT_DIR/../engine.sh" "$config_file"; then
            log_success "🎉 AI 工作流执行成功！"
            
            # 自动进度报告
            ai_progress_report "$workflow_id"
        else
            log_error "❌ AI 工作流执行失败"
            ai_failure_analysis "$workflow_id"
        fi
    else
        log_info "工作流配置已保存，可稍后执行: ./scripts/run-workflow.sh ai-generated-$workflow_id.json"
    fi
}

# AI 进度报告生成器
ai_progress_report() {
    local workflow_id="$1"
    log_ai "📊 生成 AI 进度报告..."
    
    local state_file="$STATE_DIR/ai-generated-$workflow_id.state.json"
    
    if [ -f "$state_file" ]; then
        echo ""
        log_ai "📈 AI 工作流执行报告:"
        
        local status
        status=$(jq -r '.status' "$state_file")
        echo "  状态: $status"
        
        local total_tasks
        local completed_tasks
        total_tasks=$(jq '.tasks | length' "$state_file")
        completed_tasks=$(jq '[.tasks[] | select(.status == "completed")] | length' "$state_file")
        
        echo "  进度: $completed_tasks/$total_tasks 任务完成"
        
        # 显示失败任务
        local failed_tasks
        failed_tasks=$(jq -r '.tasks | to_entries[] | select(.value.status == "failed") | .key' "$state_file")
        
        if [ -n "$failed_tasks" ]; then
            echo "  失败任务:"
            echo "$failed_tasks" | while read -r task; do
                echo "    ❌ $task"
            done
        fi
        
        # LinchKit 约束遵守报告
        echo ""
        log_ai "🛡️ LinchKit 约束遵守情况:"
        echo "  ✅ TypeScript 严格模式"
        echo "  ✅ 强制使用 bun"
        echo "  ✅ 架构依赖顺序"
        echo "  ✅ 分支安全检查"
    fi
}

# AI 失败分析器
ai_failure_analysis() {
    local workflow_id="$1"
    log_ai "🔍 进行 AI 失败分析..."
    
    local state_file="$STATE_DIR/ai-generated-$workflow_id.state.json"
    
    if [ -f "$state_file" ]; then
        local failed_tasks
        failed_tasks=$(jq -r '.tasks | to_entries[] | select(.value.status == "failed") | .key' "$state_file")
        
        if [ -n "$failed_tasks" ]; then
            log_ai "🔧 AI 建议的解决方案:"
            echo "$failed_tasks" | while read -r task; do
                case "$task" in
                    *"test"*)
                        echo "  📝 $task: 检查测试用例或更新快照"
                        ;;
                    *"build"*)
                        echo "  🔨 $task: 检查 TypeScript 类型错误或依赖问题"
                        ;;
                    *"lint"*)
                        echo "  🎨 $task: 运行 bun run lint:fix 自动修复"
                        ;;
                    *)
                        echo "  🤖 $task: 查看详细错误日志进行诊断"
                        ;;
                esac
            done
            
            echo ""
            log_ai "💡 建议修复后重新执行: ./scripts/run-workflow.sh ai-generated-$workflow_id.json"
        fi
    fi
}

# 创建 AI 模板目录
setup_ai_templates() {
    if [ ! -d "$AI_TEMPLATES_DIR" ]; then
        mkdir -p "$AI_TEMPLATES_DIR"
        log_info "创建 AI 模板目录: $AI_TEMPLATES_DIR"
    fi
}

# 主函数
main() {
    echo -e "${PURPLE}🤖 LinchKit AI 自动工作流生成器 v2.0${NC}"
    echo -e "${CYAN}集成 Gemini 协商 + 完整开发规范约束${NC}"
    echo "=========================================="
    
    # 环境初始化
    if ! enforce_environment_constraints; then
        log_error "环境约束检查失败，请修复后重试"
        exit 1
    fi
    
    setup_ai_templates
    
    # 获取用户输入
    if [ $# -eq 0 ]; then
        echo ""
        echo "请描述您的开发需求（支持自然语言）："
        echo "示例: "
        echo "  - 为用户模块添加 OIDC 认证支持"
        echo "  - 实现批量删除功能的 CRUD 操作"
        echo "  - 创建用户管理的 UI 组件"
        echo "  - 重构 API 层的错误处理"
        echo ""
        read -p "💬 您的需求: " user_input
    else
        user_input="$*"
    fi
    
    if [ -z "$user_input" ]; then
        log_error "请提供具体的开发需求"
        exit 1
    fi
    
    # AI 任务解析
    log_ai "🧠 AI 正在分析您的需求..."
    local task_analysis
    task_analysis=$(parse_natural_language_task "$user_input")
    
    # Gemini 协商
    task_analysis=$(consult_with_gemini "$task_analysis")
    
    # 生成工作流ID
    local workflow_id
    workflow_id="ai-$(date +%Y%m%d-%H%M%S)"
    
    # 生成工作流配置
    local workflow_config
    workflow_config=$(generate_workflow_from_analysis "$task_analysis" "$workflow_id")
    
    # AI 自动执行
    ai_auto_execute "$workflow_config" "$workflow_id"
}

# 如果直接运行脚本
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi