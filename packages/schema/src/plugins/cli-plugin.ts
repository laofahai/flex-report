/**
 * Schema CLI 插件
 *
 * 将 schema 相关的 CLI 命令注册到 core 包的 CLI 系统中
 */

import type { CommandPlugin, CommandMetadata, CLIContext } from '@linch-kit/core'
import { writePrismaSchema } from '../generators/prisma'
import { writeValidators } from '../generators/validators'
import { writeMockFactories, generateTestDataFiles } from '../generators/mock'
import { writeOpenAPISpec } from '../generators/openapi'
import { getAllEntities, clearEntityRegistry } from '../core/entity'
import { loadConfig } from '@linch-kit/core'
import type { SchemaConfig } from '../core/types'
import { pathToFileURL } from 'url'
import { resolve } from 'path'
import { glob } from 'glob'
import { existsSync, writeFileSync } from 'fs'

/**
 * 从 linch.config.ts 加载 schema 配置
 */
async function loadLinchConfig(): Promise<SchemaConfig> {
  try {
    // 尝试加载 linch.config.ts 使用 tsx
    const tsConfigPath = resolve(process.cwd(), 'linch.config.ts')
    if (existsSync(tsConfigPath)) {
      try {
        // 使用 tsx 动态加载 TypeScript 文件
        const { execSync } = await import('child_process')
        const configJson = execSync(
          `npx tsx -e "import config from '${tsConfigPath}'; console.log(JSON.stringify(config.schema || {}))"`,
          { encoding: 'utf8', cwd: process.cwd() }
        ).trim()

        const config = JSON.parse(configJson)
        return config
      } catch (tsxError) {
        console.warn('⚠️ Failed to load TypeScript config with tsx:', tsxError instanceof Error ? tsxError.message : String(tsxError))
      }
    }

    // 尝试加载 linch.config.js (编译后的版本)
    const jsConfigPath = resolve(process.cwd(), 'linch.config.js')
    if (existsSync(jsConfigPath)) {
      const configModule = await import(pathToFileURL(jsConfigPath).href)
      const config = configModule.default || configModule
      return config.schema || {}
    }

    // 尝试加载 linch.config.mjs
    const mjsConfigPath = resolve(process.cwd(), 'linch.config.mjs')
    if (existsSync(mjsConfigPath)) {
      const configModule = await import(pathToFileURL(mjsConfigPath).href)
      const config = configModule.default || configModule
      return config.schema || {}
    }

    // 最后回退到core包的配置加载
    const coreConfig = await loadConfig({ required: false })
    return coreConfig?.schema || {}
  } catch (error) {
    console.warn('⚠️ Failed to load linch config, using default schema config')
    return {}
  }
}

/**
 * 加载单个实体文件，支持 TypeScript 和 JavaScript
 * 在开发环境支持 .ts/.tsx，在生产环境支持 .js/.mjs
 */
async function loadEntityFile(filePath: string): Promise<void> {
  try {
    const ext = filePath.split('.').pop()?.toLowerCase()

    if (ext === 'ts' || ext === 'tsx') {
      // 对于TypeScript文件，使用tsx在同一进程中加载
      const { execSync } = await import('child_process')

      // 使用tsx直接执行，确保在同一进程中注册实体
      execSync(
        `npx tsx -e "import('${filePath}')"`,
        {
          encoding: 'utf8',
          cwd: process.cwd(),
          stdio: 'inherit'
        }
      )
    } else {
      // 对于JavaScript文件，直接使用动态导入
      await import(pathToFileURL(filePath).href)
    }
  } catch (error) {
    console.error(`❌ Failed to load entity file ${filePath}:`, error)
    throw error
  }
}

/**
 * 加载依赖包中的实体
 */
async function loadPackageEntities() {
  // 已知包含实体的包列表和路径
  const packagesWithEntities = [
    {
      name: '@linch-kit/auth-core',
      // 在monorepo中使用相对路径
      path: resolve(process.cwd(), '../../packages/auth-core/dist/index.js')
    }
  ]

  for (const packageInfo of packagesWithEntities) {
    try {
      let packageModule

      // 首先尝试通过包名导入
      try {
        packageModule = await import(packageInfo.name)
      } catch (npmError) {
        // 如果包名导入失败，尝试使用相对路径（monorepo环境）
        if (existsSync(packageInfo.path)) {
          packageModule = await import(pathToFileURL(packageInfo.path).href)
        } else {
          throw npmError
        }
      }

      // 检查是否有预设的实体套件
      if (packageModule.MultiTenantAuthKit) {
        // 使用多租户认证套件（包含所有实体）
        const authKit = packageModule.MultiTenantAuthKit
        console.log(`📦 Loading entities from ${packageInfo.name}...`)

        // 这些实体模板在导入时会自动注册
        Object.values(authKit)
      }
    } catch (error) {
      // 如果包不存在或加载失败，继续处理其他包
      console.warn(`⚠️ Could not load entities from ${packageInfo.name}:`, error instanceof Error ? error.message : String(error))
    }
  }
}

/**
 * 动态加载用户的实体文件
 */
async function loadEntities(config: SchemaConfig, entitiesPath?: string) {
  // 首先加载依赖包中的实体
  await loadPackageEntities()

  if (entitiesPath) {
    // 用户指定了实体文件路径
    const resolvedPath = resolve(process.cwd(), entitiesPath)
    if (existsSync(resolvedPath)) {
      await loadEntityFile(resolvedPath)
    } else {
      console.error(`❌ Entities file not found: ${resolvedPath}`)
      process.exit(1)
    }
  } else {
    // 使用配置文件中的模式
    const patterns = config.entities || []

    let allFiles: string[] = []

    for (const pattern of patterns) {
      try {
        const files = await glob(pattern, { cwd: process.cwd() })
        if (files.length > 0) {
          allFiles.push(...files)
        }
      } catch (error) {
        // 忽略错误，继续尝试下一个模式
      }
    }

    if (allFiles.length > 0) {
      console.log(`📁 Found entity files: ${allFiles.join(', ')}`)
      for (const file of allFiles) {
        const filePath = resolve(process.cwd(), file)
        await loadEntityFile(filePath)
      }
    }
  }

  const entities = getAllEntities()
  if (entities.length === 0) {
    console.error('❌ No entities registered. Make sure your entity files call defineEntity().')
    process.exit(1)
  }

  console.log(`✅ Loaded ${entities.length} entities: ${entities.map(e => e.name).join(', ')}`)
}

/**
 * Schema CLI 插件
 */
export const schemaCliPlugin: CommandPlugin = {
  name: '@linch-kit/schema',
  description: 'Schema generation and management commands',
  version: '0.2.1',
  aiTags: ['schema', 'generation', 'database', 'validation'],

  async register(registry: any): Promise<void> {
    const commands: Record<string, CommandMetadata> = {
      'schema:init': {
        description: 'Initialize schema configuration',
        options: [
          {
            flags: '-f, --force',
            description: 'Overwrite existing config file'
          }
        ],
        async handler(context: CLIContext): Promise<void> {
          console.log('✅ Schema configuration is now part of linch.config.ts')
          console.log('📝 Edit linch.config.ts to customize your schema setup')
        }
      },

      'schema:generate:prisma': {
        description: 'Generate Prisma schema from entity definitions',
        options: [
          {
            flags: '-o, --output <path>',
            description: 'Output file path (overrides config)'
          },
          {
            flags: '-p, --provider <provider>',
            description: 'Database provider (overrides config)'
          },
          {
            flags: '--url <url>',
            description: 'Database URL (overrides config)'
          },
          {
            flags: '-e, --entities-path <path>',
            description: 'Path to entities file or directory'
          },
          {
            flags: '-c, --config <path>',
            description: 'Path to config file'
          }
        ],
        async handler(context: CLIContext): Promise<void> {
          const { args = [] } = context
          const options = args[args.length - 1] || {}

          try {
            console.log('🔄 Loading configuration...')
            const config = await loadLinchConfig()

            console.log('🔄 Loading entities...')
            await loadEntities(config, options.entitiesPath)

            const outputPath = options.output || config.output?.prisma || './prisma/schema.prisma'
            const provider = options.provider || config.database?.provider || 'postgresql'
            const databaseUrl = options.url || config.database?.url

            console.log('🔄 Generating Prisma schema...')
            await writePrismaSchema(outputPath, {
              provider,
              databaseUrl,
            })
            console.log(`✅ Prisma schema generated at: ${outputPath}`)
          } catch (error) {
            console.error('❌ Error generating Prisma schema:', error)
            process.exit(1)
          }
        }
      },

      'schema:generate:validators': {
        description: 'Generate Zod validators from entity definitions',
        options: [
          {
            flags: '-o, --output <path>',
            description: 'Output file path',
            defaultValue: './src/validators/generated.ts'
          },
          {
            flags: '-e, --entities-path <path>',
            description: 'Path to entities file or directory'
          }
        ],
        async handler(context: CLIContext): Promise<void> {
          const { args = [] } = context
          const options = args[args.length - 1] || {}

          try {
            console.log('🔄 Loading configuration...')
            const config = await loadLinchConfig()

            console.log('🔄 Loading entities...')
            await loadEntities(config, options.entitiesPath)

            console.log('🔄 Generating validators...')
            await writeValidators(options.output)
            console.log('✅ Validators generated successfully!')
          } catch (error) {
            console.error('❌ Error generating validators:', error)
            process.exit(1)
          }
        }
      },

      'schema:list': {
        description: 'List all registered entities',
        async handler(): Promise<void> {
          try {
            console.log('🔄 Loading configuration...')
            const config = await loadLinchConfig()

            console.log('🔄 Loading entities...')
            await loadEntities(config)

            const entities = getAllEntities()
            console.log('📋 Registered entities:')
            entities.forEach(entity => {
              console.log(`  - ${entity.name}`)
            })
            console.log(`\nTotal: ${entities.length} entities`)
          } catch (error) {
            console.error('❌ Error listing entities:', error)
            process.exit(1)
          }
        }
      },

      'schema:show': {
        description: 'Show entity details',
        arguments: [
          {
            name: 'entityName',
            description: 'Name of the entity to show',
            required: true
          }
        ],
        async handler(context: CLIContext): Promise<void> {
          const { args = [] } = context
          const entityName = args[0]

          if (!entityName) {
            console.error('❌ Entity name is required')
            process.exit(1)
          }

          try {
            console.log('🔄 Loading configuration...')
            const config = await loadLinchConfig()

            console.log('🔄 Loading entities...')
            await loadEntities(config)

            const entities = getAllEntities()
            const entity = entities.find(e => e.name === entityName)

            if (!entity) {
              console.error(`❌ Entity '${entityName}' not found`)
              process.exit(1)
            }

            console.log(`📄 Entity: ${entity.name}`)
            console.log(`Table: ${entity.meta?.model?.tableName || entity.name.toLowerCase()}`)

            if (entity.meta?.fields) {
              console.log('\nFields:')
              Object.entries(entity.meta.fields).forEach(([name, meta]) => {
                const attributes = []
                if (meta.id) attributes.push('PRIMARY KEY')
                if (meta.unique) attributes.push('UNIQUE')
                if (meta.createdAt) attributes.push('CREATED_AT')
                if (meta.updatedAt) attributes.push('UPDATED_AT')

                console.log(`  - ${name} ${attributes.length ? `(${attributes.join(', ')})` : ''}`)
              })
            }
          } catch (error) {
            console.error('❌ Error showing entity:', error)
            process.exit(1)
          }
        }
      }
    }

    // 注册所有命令
    for (const [name, command] of Object.entries(commands)) {
      registry.registerCommand(name, command)
    }
  }
}

/**
 * 注册 Schema CLI 插件
 */
export function registerSchemaCliPlugin() {
  // 这个函数会在包被导入时自动调用
  // 通过 core 包的插件系统注册命令
  if (typeof globalThis !== 'undefined' && (globalThis as any).__LINCH_CLI_REGISTRY__) {
    (globalThis as any).__LINCH_CLI_REGISTRY__.registerPlugin(schemaCliPlugin)
  }
}
