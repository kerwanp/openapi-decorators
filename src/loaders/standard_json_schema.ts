import { StandardJSONSchemaV1 } from '@standard-schema/spec'
import { TypeLoaderFn } from '../types.js'

function supportsStandardJSONSchema(value: unknown): value is StandardJSONSchemaV1 {
  return (
    typeof value === 'object' &&
    value !== null &&
    '~standard' in value &&
    typeof value['~standard'] === 'object' &&
    value['~standard'] !== null &&
    'jsonSchema' in value['~standard']
  )
}

/**
 * Type loader to load StandardJSONSchemaV1.
 */
export const StandardJSONSchemaTypeLoader: TypeLoaderFn = async (_, value) => {
  if (supportsStandardJSONSchema(value)) {
    return value['~standard'].jsonSchema.input({ target: 'openapi-3.0' })
  }
}
