import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/index.ts']
    },
    reporters: ['default', 'html']
  }
})
