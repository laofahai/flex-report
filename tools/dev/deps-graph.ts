#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

interface PackageInfo {
  name: string
  path: string
  packageJson: {
    name: string
    dependencies?: Record<string, string>
    devDependencies?: Record<string, string>
    peerDependencies?: Record<string, string>
  }
}

interface AnalysisResult {
  packages: PackageInfo[]
  buildOrder: string[]
  dependencies: Array<[string, Set<string>]>
}

class DependencyGraph {
  private packages = new Map<string, PackageInfo>()
  private dependencies = new Map<string, Set<string>>()

  async analyze(): Promise<AnalysisResult> {
    try {
      // 读取 workspace 包信息
      const workspacePackages = await this.getWorkspacePackages()
      
      // 分析依赖关系
      for (const pkg of workspacePackages) {
        await this.analyzeDependencies(pkg)
      }

      // 计算构建顺序
      const buildOrder = this.calculateBuildOrder()

      return {
        packages: Array.from(this.packages.values()),
        buildOrder,
        dependencies: Array.from(this.dependencies.entries())
      }
    } catch (error) {
      console.error('依赖分析失败:', error instanceof Error ? error.message : String(error))
      return {
        packages: [],
        buildOrder: [],
        dependencies: []
      }
    }
  }

  async getWorkspacePackages(): Promise<PackageInfo[]> {
    const packages: PackageInfo[] = []
    
    // 扫描 packages 目录
    const packagesDir = path.join(process.cwd(), 'packages')
    if (fs.existsSync(packagesDir)) {
      const packageNames = fs.readdirSync(packagesDir)
      for (const name of packageNames) {
        const packagePath = path.join(packagesDir, name)
        const packageJsonPath = path.join(packagePath, 'package.json')
        
        if (fs.existsSync(packageJsonPath)) {
          const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
          packages.push({
            name: packageJson.name,
            path: packagePath,
            packageJson
          })
        }
      }
    }

    // 扫描 modules 目录
    const modulesDir = path.join(process.cwd(), 'modules')
    if (fs.existsSync(modulesDir)) {
      const moduleNames = fs.readdirSync(modulesDir)
      for (const name of moduleNames) {
        const modulePath = path.join(modulesDir, name)
        const packageJsonPath = path.join(modulePath, 'package.json')
        
        if (fs.existsSync(packageJsonPath)) {
          const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
          packages.push({
            name: packageJson.name,
            path: modulePath,
            packageJson
          })
        }
      }
    }

    return packages
  }

  async analyzeDependencies(pkg: PackageInfo): Promise<void> {
    this.packages.set(pkg.name, pkg)
    
    const deps = new Set<string>()
    
    // 收集所有依赖
    const dependencies = pkg.packageJson.dependencies || {}
    const devDependencies = pkg.packageJson.devDependencies || {}
    const peerDependencies = pkg.packageJson.peerDependencies || {}
    
    // 只关心内部包依赖
    for (const dep of Object.keys({...dependencies, ...devDependencies, ...peerDependencies})) {
      if (dep.startsWith('@linch-kit/')) {
        deps.add(dep)
      }
    }
    
    this.dependencies.set(pkg.name, deps)
  }

  calculateBuildOrder(): string[] {
    const visited = new Set<string>()
    const visiting = new Set<string>()
    const buildOrder: string[] = []
    
    const visit = (packageName: string): void => {
      if (visited.has(packageName)) return
      if (visiting.has(packageName)) {
        throw new Error(`循环依赖检测到: ${packageName}`)
      }
      
      visiting.add(packageName)
      
      const deps = this.dependencies.get(packageName) || new Set()
      for (const dep of deps) {
        if (this.packages.has(dep)) {
          visit(dep)
        }
      }
      
      visiting.delete(packageName)
      visited.add(packageName)
      buildOrder.push(packageName)
    }
    
    // 访问所有包
    for (const packageName of this.packages.keys()) {
      visit(packageName)
    }
    
    return buildOrder
  }
}

// 如果作为脚本直接运行
if (import.meta.url === `file://${process.argv[1]}`) {
  const graph = new DependencyGraph()
  graph.analyze().then(result => {
    console.log('=== LinchKit 依赖分析报告 ===')
    console.log(`包总数: ${result.packages.length}`)
    console.log('构建顺序:', result.buildOrder.join(' → '))
    
    console.log('\n=== 依赖关系详情 ===')
    for (const [pkg, deps] of result.dependencies) {
      if (deps.size > 0) {
        console.log(`${pkg}:`)
        for (const dep of deps) {
          console.log(`  → ${dep}`)
        }
      }
    }
  }).catch(error => {
    console.error('分析失败:', error instanceof Error ? error.message : String(error))
    process.exit(1)
  })
}

export { DependencyGraph }