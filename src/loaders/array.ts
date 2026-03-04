import { TypeLoaderFn } from '../types.js'
import { loadType } from './type.js'

export const ArrayTypeLoader: TypeLoaderFn = async (context, value) => {
  if (!Array.isArray(value)) {
    return
  }

  if (value.length <= 0) {
    context.logger.warn('You tried to specify an array type without any item')
    return
  }

  if (value.length > 1) {
    context.logger.warn(
      "You tried to specify an array type with multiple items. Please use the 'enum' option if you want to specify an enum."
    )
    return
  }

  const itemsSchema = await loadType(context, { type: value[0] })

  // TODO: Better warn stack trace
  if (!itemsSchema) {
    context.logger.warn(
      'You tried to specify an array type with an item that resolves to undefined.'
    )
    return
  }

  return {
    type: 'array',
    items: itemsSchema,
  }
}
