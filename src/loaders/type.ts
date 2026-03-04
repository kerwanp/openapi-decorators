import type { OpenAPIV3 } from 'openapi-types'
import type { Context } from '../context.js'
import type { TypeOptions } from '../types.js'
import { getEnumType, getEnumValues } from '../utils/enum.js'
import { isThunk } from '../utils/metadata.js'
import { PrimitiveTypeLoader } from './primitives.js'
import { ClassTypeLoader } from './class.js'
import { ArrayTypeLoader } from './array.js'
import { StandardJSONSchemaTypeLoader } from './standard_json_schema.js'
import { JSONSchemaTypeLoader } from './json_schema.js'
import { inspect } from 'node:util'

/**
 * Transforms a type option into a SchemaObject or ReferenceObject.
 */
export async function loadType(
  context: Context,
  options: TypeOptions
): Promise<OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject | undefined> {
  if (options.schema) {
    return options.schema
  }

  if (options.enum) {
    const enumValues = getEnumValues(options.enum)
    const enumType = getEnumType(enumValues)

    return {
      type: enumType,
      enum: enumValues,
    }
  }

  if (!options.type) {
    return
  }

  const thunk = isThunk(options.type)
  const value = thunk ? (options.type as Function)(context) : options.type

  for (const loader of [
    PrimitiveTypeLoader,
    ArrayTypeLoader,
    StandardJSONSchemaTypeLoader,
    JSONSchemaTypeLoader,
    ...context.typeLoaders,
    ClassTypeLoader,
  ]) {
    const result = await loader(context, value, options.type)
    if (result) {
      return result
    }
  }

  context.logger.warn(
    `You tried to use '${inspect(options.type)}' as a type but no loader supports it.`
  )
}
