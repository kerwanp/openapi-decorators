import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    './modules/index.ts',
    './modules/decorators.ts',
    './modules/metadata.ts',
    './modules/generators.ts',
    './modules/errors.ts',
    './modules/ui.ts',
    './modules/utils.ts',
    './modules/types.ts',
  ],
  declaration: 'compatible',
  clean: true,
  sourcemap: true,
  rollup: {
    // Ship CommonJS-compatible bundle
    emitCJS: true,
    // Don’t bundle .js files together to more closely match old exports (can remove in next major)
    output: { preserveModules: true },
  },
})
