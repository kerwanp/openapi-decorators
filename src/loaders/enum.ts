import { OpenAPIV3 } from 'openapi-types'
import { EnumMetadataStorage } from '../metadata/enum.js'
import { EnumTypeValue, TypeLoaderFn } from '../types.js'
import { getSchemaPath } from '../utils/schema.js'
import { getEnumType, getEnumValues } from '../utils/enum.js'

export const EnumTypeLoader: TypeLoaderFn = async (context, value) => {
  if (typeof value !== 'object' || value === null) return

  const metadata = EnumMetadataStorage.getMetadata(value)

  if (!metadata) return

  const { name, object, ...rest } = metadata

  const ref = getSchemaPath(name)

  const enumValues = getEnumValues(object as EnumTypeValue)
  const enumType = getEnumType(enumValues)

  const schema: OpenAPIV3.SchemaObject = {
    type: enumType,
    enum: enumValues,
    ...rest,
  }

  context.schemas[metadata.name] = schema

  return { $ref: ref }
}
