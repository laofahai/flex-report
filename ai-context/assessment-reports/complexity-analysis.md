# LinchKit 代码复杂度分析报告

生成时间: 7/6/2025, 3:10:36 PM

## 📊 总体统计

- **总函数数**: 1558
- **总类数**: 84
- **总接口数**: 229
- **总类型定义**: 65
- **平均复杂度**: 12
- **高复杂度文件数**: 3

## 📦 包复杂度分析

| 包名 | 函数数 | 类数 | 接口数 | 类型数 | 平均复杂度 |
|------|--------|------|--------|--------|------------|
| auth | 145 | 6 | 23 | 21 | 11 |
| core | 579 | 26 | 83 | 13 | 16 |
| create-linch-kit | 20 | 0 | 1 | 0 | 30 |
| crud | 387 | 29 | 59 | 5 | 14 |
| schema | 190 | 23 | 50 | 10 | 7 |
| trpc | 47 | 0 | 4 | 5 | 12 |
| ui | 190 | 0 | 9 | 11 | 8 |

## ⚠️ 高复杂度文件（需要重构）

| 文件路径 | 复杂度分数 | 最大函数长度 |
|----------|------------|------------|
| auth/src/adapters/nextauth-adapter.ts | 24 | 129 行 |
| schema/src/core/field.ts | 15 | 108 行 |
| ui/src/forms/schema-field-renderer.tsx | 15 | 121 行 |

## 🔍 详细分析

### @linch-kit/auth

- 文件数: 19
- 平均每文件函数数: 8
- 平均复杂度: 11

最复杂文件:
- src/adapters/nextauth-adapter.ts (复杂度: 24)
- src/infrastructure/index.ts (复杂度: 19)
- src/middleware/permission.middleware.ts (复杂度: 19)

### @linch-kit/core

- 文件数: 51
- 平均每文件函数数: 11
- 平均复杂度: 16

最复杂文件:
- src/utils/fs.ts (复杂度: 47)
- src/audit/stores/file-store.ts (复杂度: 43)
- src/audit/data-masker.ts (复杂度: 40)

### @linch-kit/create-linch-kit

- 文件数: 2
- 平均每文件函数数: 10
- 平均复杂度: 30

最复杂文件:
- src/create.ts (复杂度: 30)
- src/index.ts (复杂度: 30)

### @linch-kit/crud

- 文件数: 24
- 平均每文件函数数: 16
- 平均复杂度: 14

最复杂文件:
- src/core/query-builder/query-validator.ts (复杂度: 32)
- src/plugins/hook-manager.ts (复杂度: 32)
- src/core/crud-manager.ts (复杂度: 28)

### @linch-kit/schema

- 文件数: 28
- 平均每文件函数数: 7
- 平均复杂度: 7

最复杂文件:
- src/generators/prisma.ts (复杂度: 38)
- src/infrastructure/logger.ts (复杂度: 27)
- src/generators/typescript.ts (复杂度: 23)

### @linch-kit/trpc

- 文件数: 5
- 平均每文件函数数: 9
- 平均复杂度: 12

最复杂文件:
- src/routers/auth.ts (复杂度: 18)
- src/cli/commands.ts (复杂度: 16)
- src/routers/crud.ts (复杂度: 12)

### @linch-kit/ui

- 文件数: 45
- 平均每文件函数数: 4
- 平均复杂度: 8

最复杂文件:
- src/components/hooks/use-mobile.ts (复杂度: 25)
- src/hooks/use-mobile.ts (复杂度: 25)
- src/forms/schema-form.tsx (复杂度: 24)

## 📈 复杂度分布

- 低 (0-20): 133 个文件
- 中 (21-50): 41 个文件
- 高 (51-100): 0 个文件
- 极高 (>100): 0 个文件
