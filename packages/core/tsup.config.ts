import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts', 'src/cli.ts', 'src/server.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  splitting: false,
  sourcemap: true,
  treeshake: true,
  minify: false,
  target: 'node18',
  outDir: 'dist',
  external: [
    // Node.js built-in modules
    'fs',
    'fs/promises',
    'path',
    'os',
    'crypto',
    'stream',
    'stream/promises',
    'assert',
    'http',
    'https',
    'url',
    'zlib',
    'util',
    'events',
    'child_process',
    // File system watching dependencies
    'chokidar',
    'fsevents',
    // CLI dependencies
    'commander',
    // Config and data parsing
    'yaml',
    'convict',
    // Observability dependencies
    'pino',
    'prom-client',
    '@opentelemetry/api',
    '@opentelemetry/exporter-jaeger',
    '@opentelemetry/exporter-prometheus',
    '@opentelemetry/instrumentation',
    '@opentelemetry/sdk-node',
    '@godaddy/terminus',
    // Other Node.js specific dependencies
    'node:fs',
    'node:path',
    'node:crypto',
    'node:os',
    'node:url',
    'node:util',
    'node:stream',
    'node:stream/promises',
    'node:events',
    'node:child_process'
  ],
})