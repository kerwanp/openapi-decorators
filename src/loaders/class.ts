import { SetRequired } from 'type-fest'
import { TypeLoaderFn } from '../types.js'
import { getSchemaPath } from '../utils/schema.js'
import { OpenAPIV3 } from 'openapi-types'
import { PropertyMetadataStorage } from '../metadata/property.js'
import { loadType } from './type.js'

/**
 * Type loader to load classes as SchemaObject.
 */
export const ClassTypeLoader: TypeLoaderFn = async (context, value) => {
  if (typeof value !== 'function' || !value.prototype) {
    return
  }

  const model = value.name

  if (context.schemas[model]) {
    return { $ref: getSchemaPath(model) }
  }

  const schema: SetRequired<OpenAPIV3.SchemaObject, 'properties' | 'required'> = {
    type: 'object',
    properties: {},
    required: [],
  }

  const properties = PropertyMetadataStorage.getMetadata(value.prototype)

  if (!properties) {
    context.logger.warn(
      `You tried to use '${model}' as a type but it does not contain any ApiProperty.`
    )
    return
  }

  context.schemas[model] = schema

  for (const [key, property] of Object.entries(properties)) {
    const { required, type, name, enum: e, schema: s, ...metadata } = property as any

    const propertySchema = await loadType(context, property)

    if (!propertySchema) {
      context.logger.warn(
        `Could not infer type from property '${model}.${key}'. You must define it explicitely.`
      )
    }

    schema.properties[key] = {
      ...propertySchema,
      ...metadata,
    }

    if (property.required) {
      schema.required.push(key)
    }
  }

  return { $ref: getSchemaPath(model) }
}
