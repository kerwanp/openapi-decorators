import 'reflect-metadata'
import type { Context } from '../../src/context.js'
import { loadType } from '../../src/loaders/type.js'

const context: Context = {
  schemas: {},
  typeLoaders: [],
  logger: {
    warn: () => {},
  },
}

test('enum', async () => {
  expect(await loadType(context, { enum: ['openapi', 'graphql'] })).toEqual({
    type: 'string',
    enum: ['openapi', 'graphql'],
  })

  expect(await loadType(context, { enum: [24, 69] })).toEqual({
    type: 'number',
    enum: [24, 69],
  })
})

test('raw schema', async () => {
  expect(
    await loadType(context, {
      schema: { type: 'string', description: 'test' },
    })
  ).toEqual({
    type: 'string',
    description: 'test',
  })

  expect(await loadType(context, { enum: [24, 69] })).toEqual({
    type: 'number',
    enum: [24, 69],
  })
})

test('should warn with unsupported TypeValue', async () => {
  let warn: any
  await loadType(
    {
      ...context,
      logger: {
        warn: (message) => {
          warn = message
        },
      },
    },
    {
      type: { hello: 'world' },
    }
  )

  expect(warn).toBeDefined()
})
