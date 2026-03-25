import { EnumMetadata, EnumMetadataStorage } from '../metadata/enum.js'

export function registerEnumType<TEnum extends object>(
  obj: TEnum,
  config: Omit<EnumMetadata, 'object'>
) {
  EnumMetadataStorage.defineMetadata(obj, {
    object: obj,
    ...config,
  })
}
