/* eslint-disable eqeqeq */
import { TypeLoaderFn } from '../types.js'

/**
 * Type loader to load primitive types.
 */
export const PrimitiveTypeLoader: TypeLoaderFn = async (_, value) => {
  if (typeof value === 'string') {
    return { type: value }
  }

  if (value == String) {
    return { type: 'string' }
  }

  if (value == Boolean) {
    return { type: 'boolean' }
  }

  if (value == Number) {
    return { type: 'number' }
  }
}
