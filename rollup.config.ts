
import esbuild from 'rollup-plugin-esbuild'
import dts from 'rollup-plugin-dts'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import alias from '@rollup/plugin-alias'
import { eslint } from 'rollup-plugin-eslint'
import { terser } from 'rollup-plugin-terser'
import typescript from '@rollup/plugin-typescript'

const entries = [
  'src/index.ts',
]

const plugins = [
  alias(),
  resolve({
    preferBuiltins: true,
  }),
  json(),
  typescript(),
  commonjs(),
  // 验证导入的文件
  eslint({
    throwOnError: true, // lint 结果有错误将会抛出异常
    include: ['src/**/*.ts'],
    exclude: ['node_modules/**'],
  }),
  terser(),
]

export default [
  ...entries.map(input => ({
    input,
    output: [
      {
        file: input.replace('src/', 'dist/').replace('.ts', '.mjs'),
        format: 'esm',
      },
      {
        file: input.replace('src/', 'dist/').replace('.ts', '.cjs'),
        format: 'cjs',
      },
    ],
    external: [],
    plugins,
  })),
  ...entries.map(input => ({
    input,
    output: {
      file: input.replace('src/', '').replace('.ts', '.d.ts'),
      format: 'esm',
    },
    external: [],
    plugins: [
      dts({ respectExternal: true }),
    ],
  })),
]
