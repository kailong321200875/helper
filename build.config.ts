import { defineBuildConfig } from 'unbuild'

const entries = ['string', 'is', 'index']

export default defineBuildConfig({
  clean: true,
  entries: entries.map((input) => ({
    input: input === 'index' ? 'src/index' : `src/${input}/index`,
    name: input
  })),
  declaration: true,
  rollup: { emitCJS: true }
})
