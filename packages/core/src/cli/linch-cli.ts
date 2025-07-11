/**
 * LinchKit CLI 主程序
 *
 * 提供 LinchKit 框架的所有 CLI 命令
 */

import { Logger } from '../logger-client'

import { CLIPluginManager } from './plugin'
import { registerCoreCommands } from './commands/core'

import { createCLIManager, type CLIManager } from './index'

export class LinchKitCLI {
  private cli: CLIManager
  private pluginManager: CLIPluginManager

  constructor() {
    this.cli = createCLIManager()
    this.pluginManager = new CLIPluginManager(this.cli)
  }

  private async setupCLI() {
    // 修改程序信息
    const program = (this.cli as { program: unknown }).program
    program.name('linch').description('LinchKit AI-First 全栈开发框架 CLI').version('1.0.0')

    // 添加全局选项
    program.option('-d, --debug', '启用调试模式').option('--no-color', '禁用彩色输出')

    // 注册核心命令
    registerCoreCommands(this.cli)

    // 自动发现并加载插件
    await this.pluginManager.autoDiscoverPlugins()
  }

  async run(argv?: string[]) {
    try {
      // 解析全局选项
      const args = argv || process.argv
      if (args.includes('--debug') || args.includes('-d')) {
        Logger.setLevel('debug')
        Logger.debug('Debug mode enabled')
      }

      // 设置 CLI
      await this.setupCLI()

      // 解析并执行命令
      await (this.cli as { parse: (args: string[]) => Promise<void> }).parse(args)
    } catch (error) {
      Logger.error('CLI execution failed:', error)
      process.exit(1)
    }
  }
}

// 如果直接运行此文件
if (require.main === module) {
  const cli = new LinchKitCLI()
  cli.run().catch(error => {
    console.error('Fatal error:', error)
    process.exit(1)
  })
}
