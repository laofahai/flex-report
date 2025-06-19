# Linch.tech 首页设计方案

## 🎯 首页目标
1. **3秒内传达核心价值**: AI-first 全栈开发框架
2. **引导用户行动**: 快速开始 → 文档 → GitHub
3. **建立信任**: 展示技术实力和社区活跃度
4. **差异化定位**: 区别于传统开发框架

## 🏗️ 页面结构设计

### 1. Hero Section (英雄区域)
**视觉层次**: 最重要，占据首屏 80% 空间

```
Hero 布局
├── 左侧内容区 (60%)
│   ├── 主标题 (H1)
│   ├── 副标题描述
│   ├── 核心特性标签
│   └── CTA 按钮组
└── 右侧演示区 (40%)
    ├── 代码演示动画
    ├── 产品截图
    └── 交互式 Demo
```

**文案内容**:
```
主标题 (中文):
"AI-First 全栈开发框架
让企业级应用开发变得简单高效"

主标题 (英文):
"AI-First Full-Stack Framework
Build Enterprise Apps with Unprecedented Speed"

副标题 (中文):
"基于 TypeScript + Zod 的 Schema 驱动开发，
提供插件化架构、自动代码生成、企业级功能，
让开发者专注业务逻辑而非基础设施。"

副标题 (英文):
"Schema-driven development with TypeScript + Zod,
featuring plugin architecture, auto code generation,
and enterprise-grade capabilities."

核心特性标签:
🤖 AI-Powered    ⚡ 10x Faster    🛡️ Enterprise-Ready    🔧 Plugin-Based
```

**CTA 按钮组**:
```
主要按钮: "立即开始" (Get Started)
├── 链接: /docs/getting-started
├── 样式: 主色调，大尺寸
└── 追踪: hero_cta_primary

次要按钮: "查看 GitHub" (View on GitHub)
├── 链接: https://github.com/laofahai/linch-kit
├── 样式: 边框样式
└── 追踪: hero_cta_secondary

第三按钮: "在线演示" (Live Demo)
├── 链接: /playground
├── 样式: 文本链接
└── 追踪: hero_cta_demo
```

### 2. 核心特性区域 (Core Features)
**目标**: 详细说明 AI-first 的独特优势

```
特性网格 (2x2 布局)
├── 🤖 AI-Powered Development
│   ├── 标题: "AI 驱动的开发体验"
│   ├── 描述: "智能代码生成、自动化测试、AI 辅助调试"
│   └── 示例: 代码自动补全动画
├── ⚡ Schema-Driven Architecture  
│   ├── 标题: "Schema 驱动架构"
│   ├── 描述: "一次定义，自动生成 API、数据库、验证器"
│   └── 示例: Schema → 多种输出的流程图
├── 🏢 Enterprise-Grade
│   ├── 标题: "企业级能力"
│   ├── 描述: "权限管理、工作流、审计日志、高可用"
│   └── 示例: 企业功能截图
└── 🔧 Plugin Ecosystem
    ├── 标题: "丰富的插件生态"
    ├── 描述: "WMS、CRM、工作流等开箱即用的业务插件"
    └── 示例: 插件市场界面
```

### 3. 产品矩阵展示 (Product Matrix)
**目标**: 展示完整的产品生态

```
产品卡片网格
├── @linch-kit/core
│   ├── 图标: 🚀
│   ├── 标题: "核心框架"
│   ├── 描述: "插件系统、任务调度、工作流引擎"
│   ├── 状态: "稳定版本"
│   ├── 下载量: "10K+ downloads"
│   └── 链接: /products/core
├── @linch-kit/schema  
│   ├── 图标: 📋
│   ├── 标题: "Schema 系统"
│   ├── 描述: "基于 Zod 的类型安全数据建模"
│   ├── 状态: "最新发布"
│   ├── 下载量: "5K+ downloads"
│   └── 链接: /products/schema
├── @linch-kit/ui
│   ├── 图标: 🎨
│   ├── 标题: "UI 组件库"
│   ├── 描述: "基于 shadcn/ui 的企业级组件"
│   ├── 状态: "开发中"
│   ├── 预览: 组件截图
│   └── 链接: /products/ui
└── Enterprise Suite
    ├── 图标: 🏢
    ├── 标题: "企业级套件"
    ├── 描述: "完整的企业应用解决方案"
    ├── 状态: "企业版"
    ├── 特色: "定制化服务"
    └── 链接: /enterprise
```

### 4. 技术栈展示 (Tech Stack)
**目标**: 展示现代化的技术选择

```
技术栈可视化
├── 前端技术
│   ├── Next.js 15
│   ├── React 19
│   ├── TypeScript 5.8
│   └── Tailwind CSS 4.0
├── 后端技术
│   ├── Node.js 20+
│   ├── Prisma ORM
│   ├── PostgreSQL
│   └── NextAuth.js
├── 开发工具
│   ├── Turborepo
│   ├── pnpm
│   ├── ESLint 9
│   └── Prettier 3.0
└── 部署平台
    ├── Vercel
    ├── Docker
    ├── Kubernetes
    └── AWS/Azure
```

### 5. 代码示例区域 (Code Examples)
**目标**: 通过代码展示框架的简洁性

```
交互式代码演示
├── Tab 1: "定义 Schema"
│   └── 代码: Zod Schema 定义示例
├── Tab 2: "自动生成 API"
│   └── 代码: 生成的 API 路由
├── Tab 3: "UI 组件使用"
│   └── 代码: React 组件示例
└── Tab 4: "完整应用"
    └── 代码: 完整的应用结构
```

**示例代码**:
```typescript
// Tab 1: 定义 Schema
const User = defineEntity('User', {
  id: primary(z.string().uuid()),
  email: unique(z.string().email()),
  name: z.string(),
  role: z.enum(['admin', 'user']),
  createdAt: createdAt(z.date()),
  updatedAt: updatedAt(z.date()),
})

// Tab 2: 自动生成的 API (自动生成)
// GET /api/users - 获取用户列表
// POST /api/users - 创建用户
// PUT /api/users/:id - 更新用户
// DELETE /api/users/:id - 删除用户

// Tab 3: UI 组件使用
<UserForm 
  schema={User.createSchema}
  onSubmit={handleSubmit}
  validation="auto"
/>

// Tab 4: 完整应用只需几行配置
export default defineApp({
  entities: [User, Product, Order],
  plugins: ['@linch-kit/plugin-auth', '@linch-kit/plugin-wms'],
  ui: { theme: 'modern', components: 'shadcn' }
})
```

### 6. 社会证明区域 (Social Proof)
**目标**: 建立信任和权威性

```
统计数据展示
├── GitHub Stars: "2.5K+ ⭐"
├── NPM Downloads: "50K+ 📦"
├── Contributors: "25+ 👥"
└── Companies: "100+ 🏢"

用户证言
├── 开源开发者证言
├── 企业客户案例
├── 技术专家推荐
└── 社区反馈
```

### 7. 快速开始区域 (Quick Start)
**目标**: 降低用户尝试门槛

```
三步上手流程
├── Step 1: "安装框架"
│   ├── 命令: npx create-linch-app my-app
│   └── 说明: "一键创建项目脚手架"
├── Step 2: "定义数据模型"
│   ├── 代码: Schema 定义示例
│   └── 说明: "使用 Zod 定义业务模型"
└── Step 3: "启动应用"
    ├── 命令: npm run dev
    └── 说明: "自动生成完整的管理系统"

额外资源
├── 📚 完整文档
├── 🎥 视频教程
├── 💬 社区支持
└── 🚀 在线演示
```

## 🎨 视觉设计规范

### 色彩使用
```css
/* 主色调 - 科技蓝 */
--primary: hsl(220, 100%, 50%)     /* 主要按钮、链接 */
--primary-light: hsl(220, 100%, 60%) /* 悬停状态 */
--primary-dark: hsl(220, 100%, 40%)  /* 激活状态 */

/* 辅助色 - AI 紫 */
--secondary: hsl(270, 100%, 60%)   /* AI 相关元素 */
--accent: hsl(45, 100%, 60%)       /* 强调元素 */

/* 中性色 */
--background: hsl(0, 0%, 100%)     /* 页面背景 */
--surface: hsl(0, 0%, 98%)         /* 卡片背景 */
--border: hsl(0, 0%, 90%)          /* 边框颜色 */
```

### 字体层级
```css
/* 主标题 */
.hero-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

/* 副标题 */
.hero-subtitle {
  font-size: clamp(1.125rem, 2vw, 1.25rem);
  font-weight: 400;
  line-height: 1.6;
  opacity: 0.8;
}

/* 特性标题 */
.feature-title {
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.3;
}
```

### 动画效果
```css
/* 页面加载动画 */
.fade-in-up {
  animation: fadeInUp 0.6s ease-out;
}

/* 悬停效果 */
.hover-lift {
  transition: transform 0.2s ease;
}
.hover-lift:hover {
  transform: translateY(-4px);
}

/* 代码高亮动画 */
.code-highlight {
  animation: highlight 2s ease-in-out infinite;
}
```

## 📱 响应式适配

### 移动端优化
```
移动端布局调整
├── Hero Section
│   ├── 单列布局
│   ├── 标题字号缩小
│   └── 按钮堆叠排列
├── 特性区域
│   ├── 单列卡片
│   ├── 图标放大
│   └── 文字简化
└── 代码示例
    ├── 横向滚动
    ├── 字号调整
    └── 简化示例
```

### 平板端适配
```
平板端布局
├── 2列网格布局
├── 适中的间距
├── 触摸友好的按钮
└── 优化的代码显示
```

## 🔍 SEO 优化

### 页面元数据
```html
<title>Linch Kit - AI-First 全栈开发框架 | 企业级应用快速开发</title>
<meta name="description" content="Linch Kit 是基于 TypeScript 的 AI-first 全栈开发框架，提供 Schema 驱动开发、插件化架构、自动代码生成，帮助企业快速构建高质量应用。">
<meta name="keywords" content="AI开发框架,TypeScript全栈,企业级开发,Schema驱动,插件化架构">

<!-- Open Graph -->
<meta property="og:title" content="Linch Kit - AI-First 全栈开发框架">
<meta property="og:description" content="基于 TypeScript 的 AI-first 全栈开发框架，让企业级应用开发变得简单高效">
<meta property="og:image" content="/og-image.png">
<meta property="og:type" content="website">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Linch Kit - AI-First 全栈开发框架">
<meta name="twitter:description" content="基于 TypeScript 的 AI-first 全栈开发框架">
<meta name="twitter:image" content="/twitter-image.png">
```

### 结构化数据
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Linch Kit",
  "description": "AI-First 全栈开发框架",
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "Cross-platform",
  "programmingLanguage": "TypeScript",
  "author": {
    "@type": "Organization",
    "name": "Linch Tech"
  }
}
```
