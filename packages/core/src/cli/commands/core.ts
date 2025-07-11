/**
 * LinchKit Core CLI 命令
 *
 * 核心命令：init, info, help + 系统增强命令：upgrade, doctor
 */

import { type CLIManager } from '../index'

import { registerInitCommand } from './init'
import { registerInfoCommand } from './info'
import { registerHelpCommand } from './help'
import { registerUpgradeCommand } from './upgrade'
import { registerDoctorCommand } from './doctor'

// 导出核心命令
export { registerInitCommand } from './init'
export { registerInfoCommand } from './info'
export { registerHelpCommand } from './help'
export { registerUpgradeCommand } from './upgrade'
export { registerDoctorCommand } from './doctor'

/**
 * 注册所有核心命令
 */
export function registerCoreCommands(cli: CLIManager) {
  // 基础核心命令
  registerInitCommand(cli)
  registerInfoCommand(cli)
  registerHelpCommand(cli)

  // 系统增强命令
  registerUpgradeCommand(cli)
  registerDoctorCommand(cli)
}
