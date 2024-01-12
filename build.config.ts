import { defineBuildConfig } from 'unbuild'

const entries = ['string', 'is']

export default defineBuildConfig({
  clean: true,
  entries: entries.map((input) => ({
    input: `src/${input}/index`,
    name: input
  })),
  declaration: true,
  rollup: { emitCJS: true }
})
