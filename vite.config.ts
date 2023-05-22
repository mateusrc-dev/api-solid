import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({ plugins: [tsconfigPaths()] }) // for the vitest know the imports with '@' that we let's use in tests
