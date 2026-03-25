import { OpenAPIV3 } from 'openapi-types'
import { createMetadataStorage } from './factory.js'

export interface EnumMetadata extends OpenAPIV3.NonArraySchemaObject {
  /**
   * Name of the enum.
   */
  name: string

  /**
   * The enum object.
   */
  object: object
}

export const EnumMetadataKey = Symbol('Enums')

export const EnumMetadataStorage = createMetadataStorage<EnumMetadata>(EnumMetadataKey)
