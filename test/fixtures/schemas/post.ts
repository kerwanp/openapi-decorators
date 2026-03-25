import { ApiProperty } from '../../../src/decorators/api_property.js'
import { registerEnumType } from '../../../src/decorators/enum.js'
import User from './user.js'

enum PostStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
}

registerEnumType(PostStatus, {
  name: 'PostStatus',
  description: 'The post status',
})

export default class Post {
  @ApiProperty()
  declare id: number

  @ApiProperty({ type: () => User })
  declare author: User

  @ApiProperty({ type: () => PostStatus })
  declare status: PostStatus
}
