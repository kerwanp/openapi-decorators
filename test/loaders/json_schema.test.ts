import { Context } from '../../src/context.js'
import { JSONSchemaTypeLoader, WithJSONSchema } from '../../src/loaders/json_schema.js'
import vine from '@vinejs/vine'

const context: Context = { schemas: {}, typeLoaders: [], logger: console }

test('should load valid WithJSONSchema', async () => {
  class TestWithJSONSchema implements WithJSONSchema {
    toJSONSchema(): Record<string, unknown> {
      return {
        type: 'string',
      }
    }
  }

  expect(await JSONSchemaTypeLoader(context, new TestWithJSONSchema())).toEqual({
    type: 'string',
  })
})

test('should load valid WithJSONSchema (vine)', async () => {
  const value = vine.object({
    firstName: vine.string(),
  })

  expect(await JSONSchemaTypeLoader(context, value)).toEqual({
    type: 'object',
    properties: {
      firstName: {
        type: 'string',
      },
    },
    required: ['firstName'],
    additionalProperties: false,
  })
})
