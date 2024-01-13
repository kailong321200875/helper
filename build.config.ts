import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  clean: true,
  entries: ['src/index.ts'],
  declaration: true,
  rollup: { emitCJS: true }
})
