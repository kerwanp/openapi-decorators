import 'reflect-metadata'
import type { Context } from '../../src/context.js'
import { registerEnumType } from '../../src/decorators/enum.js'
import { EnumTypeLoader } from '../../src/loaders/enum.js'

test('should load native typescript enum', async () => {
  const context: Context = { schemas: {}, typeLoaders: [], logger: console }

  enum PostStatus {
    DRAFT = 'DRAFT',
    PUBLISHED = 'PUBLISHED',
  }

  registerEnumType(PostStatus, {
    name: 'PostStatus',
  })

  const result = await EnumTypeLoader(context, PostStatus)

  expect(result).toEqual({ $ref: '#/components/schemas/PostStatus' })
  expect(context.schemas['PostStatus']).toEqual({
    type: 'string',
    enum: ['DRAFT', 'PUBLISHED'],
  })
})

test('should load const objects', async () => {
  const context: Context = { schemas: {}, typeLoaders: [], logger: console }

  const UserRole = {
    Member: 'MEMBER',
    Admin: 'ADMIN',
  } as const

  registerEnumType(UserRole, {
    name: 'UserRole',
  })

  const result = await EnumTypeLoader(context, UserRole)

  expect(result).toEqual({ $ref: '#/components/schemas/UserRole' })
  expect(context.schemas['UserRole']).toEqual({
    type: 'string',
    enum: ['MEMBER', 'ADMIN'],
  })
})
