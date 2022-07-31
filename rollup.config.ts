import dts from 'rollup-plugin-dts'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import alias from '@rollup/plugin-alias'
import esbuild from 'rollup-plugin-esbuild'
import typescript from 'rollup-plugin-typescript2'
import babel from '@rollup/plugin-babel'

// 后续要改成动态导入
const entries = [
  'src/index.ts',
  'src/array/index.ts',
  'src/attribute/index.ts',
  'src/color/index.ts',
  'src/color/index.ts',
  'src/date/index.ts',
  'src/dom/index.ts',
  'src/is/index.ts',
  'src/public/index.ts',
  'src/string/index.ts',
  'src/tree/index.ts'
]

const plugins = [
  babel({
    babelrc: false,
    babelHelpers: 'bundled',
    presets: [['env', { modules: false }]]
  }),
  resolve({
    preferBuiltins: true
  }),
  alias(),
  json(),
  typescript(),
  commonjs(),
  esbuild({
    minify: process.env.NODE_ENV === 'production'
  })
]

export default [
  ...entries.map((input) => ({
    input,
    output: [
      {
        file: input.replace('src/', 'es/').replace('.ts', '.mjs'),
        format: 'esm'
      },
      {
        file: input.replace('src/', 'lib/').replace('.ts', '.cjs'),
        format: 'cjs'
      }
    ],
    external: [],
    plugins
  })),
  ...entries.map((input) => ({
    input,
    output: {
      file: input.replace('src/', 'es/').replace('.ts', '.d.ts'),
      format: 'esm'
    },
    external: [],
    plugins: [dts({ respectExternal: true })]
  }))
]
