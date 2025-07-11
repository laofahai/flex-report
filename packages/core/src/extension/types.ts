/**
 * Extension系统类型定义
 * @module extension/types
 */

import type { Plugin, PluginConfig, PluginMetadata } from '../types/plugin'

/**
 * Extension能力配置
 */
export interface ExtensionCapabilities {
  /** 包含用户界面 */
  hasUI?: boolean
  /** 提供API端点 */
  hasAPI?: boolean  
  /** 定义数据模型 */
  hasSchema?: boolean
  /** 监听系统钩子 */
  hasHooks?: boolean
  /** 是否可独立运行 */
  standalone?: boolean
}

/**
 * Extension配置参数
 */
export interface ExtensionConfiguration {
  [key: string]: {
    type: 'string' | 'number' | 'boolean' | 'object'
    default?: unknown
    description?: string
    required?: boolean
  }
}

/**
 * Extension权限定义
 */
export type ExtensionPermission = 
  | 'database:read' 
  | 'database:write'
  | 'api:read'
  | 'api:write'
  | 'ui:render'
  | 'system:hooks'
  | string

/**
 * Extension元数据(扩展Plugin元数据)
 */
export interface ExtensionMetadata extends PluginMetadata {
  /** 显示名称 */
  displayName: string
  /** 扩展能力 */
  capabilities: ExtensionCapabilities
  /** 扩展分类 */
  category?: string
  /** 标签 */
  tags?: string[]
  /** 权限要求 */
  permissions: ExtensionPermission[]
  /** 配置模式 */
  configuration?: ExtensionConfiguration
  /** 入口点配置 */
  entries?: {
    api?: string
    schema?: string  
    components?: string
    hooks?: string
  }
}

/**
 * Extension配置(扩展Plugin配置)
 */
export interface ExtensionConfig extends PluginConfig {
  /** 扩展特定配置 */
  [key: string]: unknown
}

/**
 * Extension执行上下文
 */
export interface ExtensionContext {
  /** Extension名称 */
  name: string
  /** 权限列表 */
  permissions: ExtensionPermission[]
  /** 配置 */
  config: ExtensionConfig
  /** 命名空间日志器 */
  logger: {
    debug: (message: string, ...args: unknown[]) => void
    info: (message: string, ...args: unknown[]) => void
    warn: (message: string, ...args: unknown[]) => void
    error: (message: string, ...args: unknown[]) => void
  }
  /** 事件总线 */
  events: {
    emit: (event: string, data?: unknown) => void
    on: (event: string, handler: (data: unknown) => void) => void
    off: (event: string, handler: (data: unknown) => void) => void
  }
  /** 隔离存储 */
  storage: {
    get: <T>(key: string) => Promise<T | null>
    set: <T>(key: string, value: T) => Promise<void>
    delete: (key: string) => Promise<void>
    clear: () => Promise<void>
  }
}

/**
 * Extension实例接口
 */
export interface ExtensionInstance {
  /** Extension名称 */
  name: string
  /** 元数据 */
  metadata: ExtensionMetadata
  /** 执行上下文 */
  context: ExtensionContext
  /** 是否已初始化 */
  initialized: boolean
  /** 是否正在运行 */
  running: boolean
  /** 初始化Extension */
  initialize(): Promise<void>
  /** 启动Extension */
  start(): Promise<void>
  /** 停止Extension */
  stop(): Promise<void>
  /** 销毁Extension */
  destroy(): Promise<void>
}

/**
 * Extension定义(基于Plugin)
 */
export interface Extension extends Plugin {
  /** Extension元数据 */
  metadata: ExtensionMetadata
  /** 默认配置 */
  defaultConfig?: ExtensionConfig
}

/**
 * Extension注册信息
 */
export interface ExtensionRegistration {
  /** Extension定义 */
  extension: Extension
  /** 配置 */
  config: ExtensionConfig
  /** 实例 */
  instance?: ExtensionInstance
  /** 状态 */
  status: 'registered' | 'loading' | 'loaded' | 'starting' | 'running' | 'stopping' | 'stopped' | 'error'
  /** 注册时间 */
  registeredAt: number
  /** 最后更新时间 */
  lastUpdated: number
  /** 错误信息 */
  error?: Error
}

/**
 * Extension加载结果
 */
export interface ExtensionLoadResult {
  /** 是否成功 */
  success: boolean
  /** Extension实例 */
  instance?: ExtensionInstance
  /** 错误信息 */
  error?: {
    code: string
    message: string
    stack?: string
  }
}

/**
 * Extension管理器接口
 */
export interface ExtensionManager {
  /** 加载Extension */
  loadExtension(extensionName: string): Promise<ExtensionLoadResult>
  /** 卸载Extension */  
  unloadExtension(extensionName: string): Promise<boolean>
  /** 热重载Extension */
  reloadExtension(extensionName: string): Promise<ExtensionLoadResult>
  /** 获取Extension实例 */
  getExtension(extensionName: string): ExtensionInstance | undefined
  /** 获取所有Extension */
  getAllExtensions(): ExtensionInstance[]
  /** 检查Extension是否存在 */
  hasExtension(extensionName: string): boolean
  /** 获取Extension状态 */
  getExtensionStatus(extensionName: string): string | undefined
}