import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()], // for the vitest know the imports with '@' that we let's use in tests
  test: {
    environmentMatchGlobs: [
      ['src/http/controllers/**', 'prisma'], // path of the tests that will use the environment we created called prisma
    ],
  },
})
