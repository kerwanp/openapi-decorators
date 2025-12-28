<div align="center">
<br/>

## @martin.xyz/openapi-decorators

### Generate OpenAPI compliant specifications using Typescript Decorators

<br/>
</div>

<div align="center">

<!-- automd:badges color="brightgreen" license name="@martin.xyz/openapi-decorators" bundlephobia packagephobia -->

[![npm version](https://img.shields.io/npm/v/@martin.xyz/openapi-decorators?color=brightgreen)](https://npmjs.com/package/@martin.xyz/openapi-decorators)
[![npm downloads](https://img.shields.io/npm/dm/@martin.xyz/openapi-decorators?color=brightgreen)](https://npm.chart.dev/@martin.xyz/openapi-decorators)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@martin.xyz/openapi-decorators?color=brightgreen)](https://bundlephobia.com/package/@martin.xyz/openapi-decorators)
[![install size](https://badgen.net/packagephobia/install/@martin.xyz/openapi-decorators?color=brightgreen)](https://packagephobia.com/result?p=@martin.xyz/openapi-decorators)
[![license](https://img.shields.io/github/license/kerwanp/openapi-decorators?color=brightgreen)](https://github.com/kerwanp/openapi-decorators/blob/main/LICENSE)

<!-- /automd -->

</div>

`@martin.xyz/openapi-decorators` is a framework agnostic library to automatically generate OpenAPI schemas and documentation by using Typescript decorators and metadata.

```ts
class User {
  @ApiProperty()
  declare id: number;

  @ApiProperty()
  declare name: string;

  @ApiProperty({ required: false })
  declare mobile?: string;
}

class UsersController {
  @ApiOperation({
    methods: ["get"],
    path: "/users",
    summary: "List users"
  })
  @ApiResponse({ type: [User] })
  async list() {
    ...
  }
}

await generateDocument({
  controllers: [UsersController],
  document: {
    info: {
      title: "My Api",
      version: "1.0.0",
    },
  },
});
```

## Getting Started

### Setup

Install `@martin.xyz/openapi-decorators` and `reflect-metadata` using your favorite package manager.

```bash
npm install @martin.xyz/openapi-decorators
```

Import `reflect-metadata` in your main file.

```ts
import 'reflect-metadata'

// Rest of your app
```

Enable `emitDecoratorMetadata` and `experimentalDecorators` in your `tsconfig.json`.

```json
{
  "compilerOptions": {
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true
  }
}
```

### Create your OpenAPI document

To get started, you can use the `generateDocument` function to create an (almost) empty documentation. You can define a base document that will be merged with the generated one.

```ts
import 'reflect-metadata'
import { generateDocument } from '@martin.xyz/openapi-decorators'

const document = await generateDocument({
  controllers: [],
  document: {
    info: {
      title: 'My API',
      version: '1.0.0',
    },
  },
})

console.log(document) // <- Your generated OpenAPI specifications
```

### Create your first Controller

A controller is a simple class where each methods could be an Operation. In the following example we have a `UsersController` which declares an operation `GET /users` that returns a list of Users.

```ts
import { ApiOperation, ApiResponse } from '@martin.xyz/openapi-decorators/decorators'
import User from '../schemas/user'

export default class UsersController {
  @ApiOperation({
    methods: ['get'],
    path: '/users',
    summary: 'List users',
  })
  @ApiResponse({ type: [User] })
  async list() {
    // ...your logic
  }
}
```

### Create your first schema

In our controller we define the response of your operation to be `[User]` (a list of users). We now need to create this model.

By using the `@ApiProperty` decorator on class we can define the properties of our schema.

> Unlike other libraries like `@nestjs/swagger`, every element of your OpenAPI schema is lazy-loaded. Your models will only be part of your documentation if it is used.

### Register your controller

Now that we have our controller ready, we can include it when generating our document.

```ts
import 'reflect-metadata'
import { generateDocument } from '@martin.xyz/openapi-decorators'
import UsersController from './controllers/users_controller'

const document = await generateDocument({
  controllers: [UsersController],
  document: {
    info: {
      name: 'My API',
      version: '1.0.0',
    },
  },
})

console.log(document) // <- Your generated OpenAPI specifications
```

## Decorators

Decorators are used to enrich your OpenAPI specifications. They can be applied on a Controller, a Method or a Model. They are all prefixed with `Api`.

You can find the list of available operators in the [source code](`https://github.com/kerwanp/openapi-decorators/main/tree/main/src/decorators`).

## UI Integrations

This library brings some utilities to easily display your API documentation using different providers.

### [Scalar](https://scalar.com)

```ts twoslash
import { generateScalarUI } from '@martin.xyz/openapi-decorators/ui'

const html = generateScalarUI('http://localhost:3000/api')
```

### [Swagger UI](https://swagger.io/tools/swagger-ui/)

```ts twoslash
import { generateSwaggerUI } from '@martin.xyz/openapi-decorators/ui'

const html = generateSwaggerUI('http://localhost:3000/api')
```

### [Rapidoc](https://rapidocweb.com/)

```ts twoslash
import { generateRapidocUI } from '@martin.xyz/openapi-decorators/ui'

const html = generateRapidocUI('http://localhost:3000/api')
```

## Type Loader

A Type Loader transforms a JavaScript Object into a SchemaObject. It gives the ability to extends the inference capabilities when generating a document.

For example String will be transformed into { type: 'string' }.

### Custom Type Loader

In this example we will see how to create a custom loader for the [Luxon](https://moment.github.io/luxon/#/?id=luxon) DateTime.

With the following schema we have a property that cannot be loaded as is is unknown by the Document generator.

```ts
import { DateTime } from 'luxon'

export default class User {
  @ApiProperty()
  createdAt: DateTime
}
```

We assume that our API will serialize our DateTime into a string containing the date in ISO format. The user could explicitly define the type @ApiProperty({ type: 'string' }) but as this library goal is to provide a great DX it is possible to create a custom type loader.

```ts
import { generateDocument } from '@martin.xyz/openapi-decorators'
import { TypeLoaderFn } from '@martin.xyz/openapi-decorators/types'
import { DateTime } from 'luxon'

const LuxonDateTimeLoader: TypeLoaderFn = (_context, value) => {
  if (value === DateTime) {
    return { type: 'string' }
  }
}

await generateDocument({
  loaders: [LuxonDateTimeLoader],
})
```

If you have more complex schemas to generate, you can store it in the components and return a reference instead:

```ts
const CustomLoader: TypeLoaderFn = (context, value) => {
  if (isCustom(value)) {
    const [name, schema] = generateCustomSchema(value)

    context.schemas[name] = schema

    return { $ref: `#/components/schemas/${name}` }
  }
}
```

## Integrations

- [AdonisJS | @foadonis/openapi](https://friendsofadonis.com/docs/openapi)

## Metadata

Decorators does not contain business logic, their purpose is to store metadata to be used when generating the document. This makes it easy to integrate this library into a framework and create custom decorators.

Here is an example of a custom decorator that define an operation summary:

```ts
import { OperationMetadataStorage } from '@martin.xyz/openapi-decorators/metadata'

export function ApiSummary(summary: string): MethodDecorator {
  return (target, propertyKey) => {
    OperationMetadataStorage.mergeMetadata(target, { summary }, propertyKey)
  }
}
```

### MetadataStorage

A MetadataStorage is a utility for managing metadata:

#### `defineMetadata`

This method sets the metadata. It overwrites existing metadata.

```ts
import { OperationMetadataStorage } from '@martin.xyz/openapi-decorators/metadata'

// Without propertyKey
OperationMetadataStorage.defineMetadata(target, { summary: 'Hello world' })

// With propertyKey
OperationMetadataStorage.defineMetadata(target, { summary: 'Hello world' }, propertyKey)
```

#### `mergeMetadata`

Similar to `defineMetadata`, this method sets the metadata but deepmerge its content with exising metadata.

```ts
import { OperationMetadataStorage } from '@martin.xyz/openapi-decorators/metadata'

// Without propertyKey
OperationMetadataStorage.mergeMetadata(target, { summary: 'Hello world' })

// With propertyKey
OperationMetadataStorage.mergeMetadata(target, { summary: 'Hello world' }, propertyKey)
```

#### `getMetadata`

This method retrieve the stored metadata. When used with a `propertyKey` you can also define `withParent` to deepmerge the metadata with the one defined on the class.

### Custom MetadataStorage

You can create a custom metadata storage by using the `createMetadataStorage` function.

```ts
import { createMetadataStorage } from '@martin.xyz/openapi-decorators/metadata'

type CustomMetadata = { foo: 'bar' }

const CustomMetadataKey = Symbol('Custom')

const CustomMetadataStorage = createMetadataStorage<CustomMetadata>(CustomMetadataKey)
```

## License

[MIT licensed](LICENSE.md).
