import type { OpenAPIV3 } from 'openapi-types'
import type { Context } from './context.js'
import { Arrayable } from 'type-fest'

export type OpenAPIDocument = OpenAPIV3.Document
export type HttpMethods = `${OpenAPIV3.HttpMethods}`

export type PrimitiveType = OpenAPIV3.NonArraySchemaObjectType

export type TypeValue = Arrayable<Function | PrimitiveType | unknown>
export type Thunk<T> = (context: Context) => T
export type EnumTypeValue = string[] | number[] | Record<number, string>

export type Logger = {
  warn: (typeof console)['warn']
}

export type TypeOptions = {
  type?: Thunk<TypeValue> | TypeValue
  schema?: OpenAPIV3.SchemaObject
  enum?: EnumTypeValue
}

export type TypeLoaderFn = (
  context: Context,
  value: TypeValue,
  original?: Thunk<TypeValue> | TypeValue
) => Promise<OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject | unknown | undefined>
