# LinchKit 官网设计文档

**版本**: v1.0  
**更新**: 2025-07-04  
**项目**: LinchKit - AI-First 全栈开发框架官网

## 🎯 项目概览

LinchKit 官网是一个基于 Next.js 15 + Nextra 4 的现代化文档网站，旨在为开发者提供优秀的学习和使用体验，展示 LinchKit 框架的强大能力和企业级特性。

### 技术栈

- **前端框架**: Next.js 15.3.4 + React 19.0.0
- **文档引擎**: Nextra 4.2.17 + nextra-theme-docs
- **样式系统**: Tailwind CSS 4.x + @linch-kit/ui (shadcn/ui)
- **字体**: Geist + Geist Mono
- **主题**: next-themes (深色/浅色模式)
- **国际化**: Next.js i18n (中英双语)
- **部署**: 静态导出 (`output: 'export'`)

## 🏗️ 网站架构设计

### 信息架构 (IA)

```
LinchKit 官网
├── / (首页)
│   ├── Hero Section - 核心价值主张
│   ├── Features - 6大核心特性
│   ├── Tech Stack - 三栏技术栈展示
│   └── CTA Section - 行动召唤
├── /docs/ (文档区 - Nextra 管理)
│   ├── Getting Started/
│   │   ├── 介绍
│   │   ├── 快速上手
│   │   └── 项目结构
│   ├── Core Concepts/
│   │   ├── AI-First 理念
│   │   ├── Schema 驱动架构
│   │   ├── 端到端类型安全
│   │   └── 企业级特性
│   ├── Guides/
│   │   ├── 构建第一个应用
│   │   ├── 集成 AI 模型
│   │   ├── 认证与权限
│   │   └── 部署指南
│   ├── API Reference/
│   │   ├── @linch-kit/core
│   │   ├── @linch-kit/schema
│   │   ├── @linch-kit/auth
│   │   ├── @linch-kit/crud
│   │   ├── @linch-kit/trpc
│   │   └── @linch-kit/ui
│   ├── Deployment/
│   │   ├── Vercel
│   │   ├── Netlify
│   │   ├── AWS
│   │   └── Docker
│   └── Contributing/
│       ├── 贡献指南
│       ├── 开发环境搭建
│       └── 行为准则
└── /examples/ (示例项目 - 未来扩展)
```

### 导航结构

#### 主导航 (Header)

- **Logo**: LinchKit 品牌标识
- **Features**: 跳转到首页特性区域
- **Docs**: 进入文档区
- **GitHub**: 外部链接到仓库
- **主题切换**: 深色/浅色模式
- **语言切换**: 中英文切换

#### 文档导航 (Sidebar)

- 使用 `_meta.json` 文件定义结构和顺序
- 支持分组折叠
- 当前页面高亮
- 搜索功能集成

#### 页面内导航 (TOC)

- 右侧目录树
- 自动生成基于标题层级
- 滚动同步高亮
- 回到顶部功能

## 🎨 设计系统规范

### 色彩系统

#### 品牌色彩

```css
:root {
  /* 主色调 - 蓝色系 */
  --primary-50: #eff6ff;
  --primary-500: #3b82f6;
  --primary-600: #2563eb;
  --primary-700: #1d4ed8;

  /* 辅助色彩 - 紫色系 */
  --secondary-500: #8b5cf6;
  --secondary-600: #7c3aed;

  /* 状态色彩 */
  --success: #10b981;
  --warning: #f59e0b;
  --error: #ef4444;
  --info: #06b6d4;
}
```

#### 语义色彩

- **文本**: gray-900 (浅色) / white (深色)
- **次要文本**: gray-600 (浅色) / gray-300 (深色)
- **边框**: gray-200 (浅色) / gray-800 (深色)
- **背景**: white (浅色) / gray-950 (深色)
- **卡片背景**: gray-50 (浅色) / gray-900 (深色)

### 排版系统

#### 字体层级

```css
/* 标题 */
h1: text-4xl md:text-6xl lg:text-7xl font-extrabold
h2: text-3xl md:text-5xl font-bold
h3: text-xl font-bold
h4: text-lg font-semibold
h5: text-base font-semibold
h6: text-sm font-semibold

/* 正文 */
body: text-base leading-relaxed
large: text-xl md:text-2xl leading-relaxed
small: text-sm
xs: text-xs

/* 代码 */
code: font-mono text-sm
```

#### 字重系统

- **标题**: font-extrabold (800) / font-bold (700)
- **强调**: font-semibold (600) / font-medium (500)
- **正文**: font-normal (400)
- **代码**: font-mono

### 间距系统

基于 Tailwind CSS 的 8px 网格系统：

- **微间距**: 2, 4, 6px (0.5, 1, 1.5)
- **小间距**: 8, 12, 16px (2, 3, 4)
- **中间距**: 20, 24, 32px (5, 6, 8)
- **大间距**: 48, 64, 80px (12, 16, 20)
- **超大间距**: 96, 128px (24, 32)

### 圆角系统

- **小圆角**: rounded-lg (8px) - 按钮、输入框
- **中圆角**: rounded-xl (12px) - 卡片
- **大圆角**: rounded-2xl (16px) - 特性卡片
- **超大圆角**: rounded-3xl (24px) - Hero区块

### 阴影系统

- **微阴影**: shadow-sm - 输入框
- **小阴影**: shadow-lg - 按钮悬停
- **大阴影**: shadow-xl - 卡片悬停
- **特殊阴影**: 自定义渐变阴影用于CTA区域

## 🔧 Nextra 配置最佳实践

### theme.config.tsx 关键配置

```typescript
const config = {
  // 品牌标识
  logo: <LinchKitLogo />,

  // 项目链接
  project: {
    link: 'https://github.com/laofahai/linch-kit',
  },

  // 编辑链接
  docsRepositoryBase: 'https://github.com/laofahai/linch-kit/tree/main/apps/website',

  // 页脚配置
  footer: {
    text: <FooterContent />
  },

  // SEO 头部
  head: <HeadContent />,

  // 主题配置
  primaryHue: 250,
  primarySaturation: 84,

  // 侧边栏配置
  sidebar: {
    defaultMenuCollapseLevel: 1,
    toggleButton: true
  },

  // 目录配置
  toc: {
    backToTop: true,
    extraContent: <TOCExtraContent />
  },

  // 国际化
  i18n: [
    { locale: 'en', text: 'English' },
    { locale: 'zh', text: '中文' }
  ],

  // 编辑链接文本
  editLink: {
    text: {
      en: 'Edit this page on GitHub →',
      zh: '在 GitHub 上编辑此页 →'
    }
  },

  // 反馈链接
  feedback: {
    content: {
      en: 'Question? Give us feedback →',
      zh: '有问题？给我们反馈 →'
    },
    labels: 'feedback'
  },

  // 搜索配置
  search: {
    placeholder: {
      en: 'Search documentation...',
      zh: '搜索文档...'
    }
  }
}
```

### MDX 组件增强

创建自定义 MDX 组件以增强文档体验：

```typescript
// mdx-components.tsx
import { Callout, Tabs, Tab, Card, CardGrid, CodeGroup, Demo } from './components/mdx'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    Callout,
    Tabs,
    Tab,
    Card,
    CardGrid,
    CodeGroup,
    Demo,
    ...components,
  }
}
```

## 🚀 性能优化策略

### Core Web Vitals 优化

#### LCP (Largest Contentful Paint) < 2.5s

- **字体优化**: 使用 `next/font` 预加载关键字体
- **关键CSS**: 内联首屏CSS，延迟加载非关键样式
- **图片优化**: 所有图片使用 `next/image` 组件
- **服务端渲染**: 最大化使用 React Server Components

#### INP (Interaction to Next Paint) < 200ms

- **React 19 并发**: 利用 `startTransition` 处理大型状态更新
- **代码分割**: 按路由和组件进行代码分割
- **懒加载**: 非关键组件使用 `next/dynamic` 延迟加载

#### CLS (Cumulative Layout Shift) < 0.1

- **尺寸预留**: 所有图片和媒体提供明确尺寸
- **字体回退**: 配置字体回退策略减少布局偏移
- **骨架屏**: 动态内容使用骨架屏占位

### 资源优化

#### 图片优化

```typescript
// 使用 next/image 的最佳实践
<Image
  src="/hero-image.jpg"
  alt="LinchKit Framework Architecture"
  width={1200}
  height={630}
  priority // 首屏图片
  placeholder="blur"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

#### 代码分割

- **路由级**: Next.js 自动按页面分割
- **组件级**: 使用 `dynamic()` 懒加载重型组件
- **第三方库**: 按需引入，避免全量导入

#### 缓存策略

- **静态资源**: 长期缓存 (1年)
- **HTML页面**: 短期缓存配合 CDN
- **API数据**: 适当的 SWR 策略

## 🔍 SEO 和可访问性

### SEO 优化策略

#### 元数据配置

```typescript
// app/layout.tsx
export const metadata: Metadata = {
  title: {
    default: 'LinchKit - AI-First Full-Stack Development Framework',
    template: '%s | LinchKit',
  },
  description:
    'Enterprise-ready development framework with Schema-driven architecture and end-to-end type safety, designed for AI era.',
  keywords: ['LinchKit', 'AI-First', 'Full-Stack', 'Next.js', 'Framework'],
  authors: [{ name: 'LinchKit Team' }],
  openGraph: {
    type: 'website',
    siteName: 'LinchKit',
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@linchkit',
  },
}
```

#### 结构化数据

```typescript
// 网站架构数据
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'LinchKit',
  url: 'https://linchkit.dev',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://linchkit.dev/search?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
}

// 技术文章数据
const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  headline: '页面标题',
  author: {
    '@type': 'Organization',
    name: 'LinchKit Team',
  },
  datePublished: '2025-01-01',
  dateModified: '2025-01-01',
}
```

### 可访问性 (a11y) 标准

#### WCAG 2.1 AA 合规

- **色彩对比度**: 文本对比度 ≥ 4.5:1
- **键盘导航**: 所有交互元素可键盘访问
- **焦点管理**: 清晰的焦点指示器
- **语义化HTML**: 正确的标题层级和标签

#### ARIA 标签

- **导航**: `role="navigation"` 和 `aria-label`
- **按钮**: 描述性 `aria-label`
- **表单**: 正确的 `aria-describedby` 关联
- **动态内容**: `aria-live` 区域声明

#### 图片可访问性

```typescript
// 有意义的图片
<Image
  src="/architecture.jpg"
  alt="LinchKit架构图展示了前端、后端和AI服务之间的数据流"
  // ...其他属性
/>

// 装饰性图片
<Image
  src="/decoration.jpg"
  alt=""
  role="presentation"
  // ...其他属性
/>
```

## 📱 响应式设计策略

### 断点系统

基于 Tailwind CSS 断点：

- **xs**: < 640px (移动端)
- **sm**: 640px - 768px (大屏手机)
- **md**: 768px - 1024px (平板)
- **lg**: 1024px - 1280px (桌面)
- **xl**: 1280px - 1536px (大桌面)
- **2xl**: > 1536px (超大屏)

### 布局适配

#### 移动端 (< md)

- 单列布局
- 汉堡包菜单
- 触摸友好的按钮尺寸 (44px+)
- 简化的导航结构

#### 平板端 (md - lg)

- 两列布局可选
- 左侧导航栏显示
- 适中的内容密度

#### 桌面端 (lg+)

- 三列布局：导航 + 内容 + 目录
- 更丰富的交互效果
- 最大化内容展示

## 🎯 用户体验设计

### 用户旅程

#### 新用户旅程

1. **发现**: 搜索引擎 → 首页
2. **了解**: 浏览特性 → 查看架构
3. **体验**: 点击 "Get Started" → 快速上手文档
4. **实践**: 跟随教程 → 构建第一个应用
5. **深入**: 阅读核心概念 → API 文档
6. **参与**: 加入社区 → 贡献代码

#### 转化路径优化

- **主CTA**: "Get Started" - 醒目位置，强对比色
- **次级CTA**: "View Docs", "GitHub" - 适度突出
- **微转化**: Newsletter 订阅，Social 关注

### 交互设计

#### 微交互

- **按钮悬停**: 颜色渐变 + 阴影变化
- **卡片悬停**: 轻微上升 + 边框高亮
- **链接**: 下划线动画
- **加载状态**: 骨架屏 + 进度指示

#### 反馈机制

- **成功操作**: 绿色通知 + 图标
- **错误提示**: 红色提示 + 具体说明
- **加载中**: Spinner + 文字说明
- **空状态**: 友好图标 + 引导文案

## 🌐 国际化设计

### 多语言支持

#### 内容策略

- **主语言**: 英语 (en) - 首要维护
- **次语言**: 中文 (zh) - 同步翻译
- **扩展语言**: 根据社区需求逐步添加

#### 翻译工作流

1. **主语言更新** → 2. **标记翻译需求** → 3. **社区/团队翻译** → 4. **审核发布**

#### 本地化考虑

- **文本长度**: 预留 30% 空间适配不同语言
- **阅读方向**: 支持 RTL (如阿拉伯语)
- **文化适应**: 色彩、图标的文化敏感性
- **日期格式**: 本地化日期和数字格式

### URL 结构

```
英文: /docs/getting-started
中文: /zh/docs/getting-started
```

## 📊 监控和分析

### 性能监控

- **Core Web Vitals**: 持续监控 LCP, INP, CLS
- **Real User Monitoring**: 真实用户性能数据
- **Error Tracking**: 错误监控和报警

### 用户分析

- **页面访问**: 热门内容识别
- **用户行为**: 漏斗分析
- **搜索查询**: 内容需求洞察
- **设备分布**: 响应式优化指导

### A/B 测试

- **CTA 按钮**: 文案和位置测试
- **页面布局**: 转化率优化
- **内容结构**: 用户体验改进

## 🚀 部署和维护

### 构建配置

```typescript
// next.config.ts
export default withNextra({
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true, // 静态导出需要
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@linch-kit/ui'],
  },
})
```

### 部署策略

- **主站**: Vercel 部署，自动 CI/CD
- **镜像**: Netlify/Cloudflare Pages 备用
- **CDN**: 全球边缘节点加速

### 维护流程

1. **内容更新**: PR → Review → Deploy
2. **性能优化**: 月度性能报告 → 优化实施
3. **用户反馈**: 收集 → 分类 → 优先级排序 → 实施
4. **技术债务**: 季度技术债务清理

## 📋 开发规范

### 代码规范

- **组件命名**: PascalCase
- **文件结构**: 功能分组，清晰层级
- **CSS类名**: Tailwind utilities 优先
- **国际化**: 所有文案都需要国际化支持

### 文档规范

- **MDX格式**: 统一的 Markdown 风格
- **代码示例**: 完整可运行的示例
- **图片**: 统一尺寸比例，WebP 格式
- **链接**: 内链相对路径，外链绝对路径

### 版本管理

- **语义化版本**: Major.Minor.Patch
- **变更日志**: 详细记录所有更新
- **向后兼容**: 保持 API 稳定性
- **迁移指南**: 重大变更提供迁移文档

## 🎯 未来扩展

### 功能路径图

1. **Phase 1**: 基础优化 (当前)
2. **Phase 2**: 交互示例和 Playground
3. **Phase 3**: 社区功能 (评论、投票)
4. **Phase 4**: AI 助手集成
5. **Phase 5**: 多主题和定制化

### 技术演进

- **框架升级**: 跟随 Next.js 最新版本
- **性能优化**: 持续改进 Core Web Vitals
- **工具集成**: 更多开发工具和服务
- **智能化**: AI 辅助内容生成和优化

---

**本设计文档是 LinchKit 官网开发的指导性文档，应与项目发展同步更新。**
