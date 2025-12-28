import { ApiProperty } from '../../modules/decorators.js'

export class Recipe {
  @ApiProperty()
  declare id: string

  @ApiProperty()
  declare title: string

  @ApiProperty({ type: [String] })
  declare ingredients: string[]
}
