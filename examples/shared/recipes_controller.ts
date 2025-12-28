import { ApiOperation, ApiResponse } from '../../modules/decorators.js'
import { Recipe } from './recipe.js'

export class RecipesController {
  @ApiOperation({
    methods: ['get'],
    path: '/recipes',
    summary: 'List recipes',
  })
  @ApiResponse({ type: [Recipe] })
  list() {}
}
