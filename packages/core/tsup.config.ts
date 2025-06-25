import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts', 'src/cli.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  splitting: false,
  sourcemap: true,
  treeshake: true,
  minify: false,
  target: 'node18',
  outDir: 'dist',
  external: [],
})