import { configPkg } from '@adonisjs/eslint-config'

export default configPkg({
  ignores: ['test/tmp/**', 'coverage/**', 'build/**'],
})
