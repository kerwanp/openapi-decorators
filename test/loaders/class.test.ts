import 'reflect-metadata'
import type { Context } from '../../src/context.js'
import { ApiProperty } from '../../src/decorators/api_property.js'
import { ClassTypeLoader } from '../../src/loaders/class.js'

test('should load simple class', async () => {
  const context: Context = { schemas: {}, typeLoaders: [], logger: console }
  class Post {
    @ApiProperty()
    declare id: string
  }

  const result = await ClassTypeLoader(context, Post)

  expect(result).toEqual({ $ref: '#/components/schemas/Post' })
  expect(context.schemas.Post).toEqual({
    type: 'object',
    properties: {
      id: {
        type: 'string',
      },
    },
    required: ['id'],
  })
})

test('should warn with no api properties', async () => {
  let warn

  const context: Context = {
    schemas: {},
    typeLoaders: [],
    logger: {
      warn: (message) => (warn = message),
    },
  }

  class Post {}

  await ClassTypeLoader(context, Post)
  expect(warn).toBeDefined()
})

test('should warn when failing to infer property', async () => {
  let warn: string | undefined

  const context: Context = {
    schemas: {},
    typeLoaders: [],
    logger: {
      warn: (message) => (warn = message),
    },
  }

  class Post {
    @ApiProperty()
    declare testProperty: string | null
  }

  await ClassTypeLoader(context, Post)
  expect(warn).toBeDefined()
  expect(warn!.includes('testProperty'))
})
