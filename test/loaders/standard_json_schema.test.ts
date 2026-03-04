import { z } from 'zod'
import { Context } from '../../src/context.js'
import { StandardJSONSchemaTypeLoader } from '../../src/loaders/standard_json_schema.js'
import vine from '@vinejs/vine'

const context: Context = { schemas: {}, typeLoaders: [], logger: console }

test('should load valid StandardJSONSchema (zod)', async () => {
  const value = z.object({
    firstName: z.string(),
  })

  expect(await StandardJSONSchemaTypeLoader(context, value)).toEqual({
    type: 'object',
    properties: {
      firstName: {
        type: 'string',
      },
    },
    required: ['firstName'],
  })
})

test('should load valid StandardJSONSchema (vine)', async () => {
  const value = vine.create({
    firstName: vine.string(),
  })

  expect(await StandardJSONSchemaTypeLoader(context, value)).toEqual({
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
