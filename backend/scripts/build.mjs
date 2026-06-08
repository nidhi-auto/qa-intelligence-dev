import * as esbuild from 'esbuild'
import { mkdirSync } from 'fs'

mkdirSync('dist', { recursive: true })

await esbuild.build({
  entryPoints: ['src/handlers/api.ts', 'src/seed/seed.ts'],
  bundle: true,
  platform: 'node',
  target: 'node20',
  format: 'esm',
  outfile: undefined,
  outdir: 'dist',
  outExtension: { '.js': '.js' },
  external: ['@aws-sdk/*'],
  sourcemap: true,
})

console.log('Build complete')
