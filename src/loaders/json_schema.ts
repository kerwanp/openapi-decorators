import { TypeLoaderFn } from '../types.js'

export interface WithJSONSchema {
  toJSONSchema(): Record<string, unknown>
}

function supportsToJSONSchema(value: unknown): value is WithJSONSchema {
  return (
    typeof value === 'object' &&
    value !== null &&
    'toJSONSchema' in value &&
    typeof value.toJSONSchema === 'function'
  )
}

/**
 * Type loader to load WithJSONSchema implementation.
 *
 * @example
 * class MyModel implements WithJSONSchema {
 *  toJSONSchema() { ... }
 * }
 */
export const JSONSchemaTypeLoader: TypeLoaderFn = async (_, value) => {
  if (supportsToJSONSchema(value)) {
    return value.toJSONSchema()
  }
}
