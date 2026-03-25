---
"@martin.xyz/openapi-decorators": minor
---

Add enum support via `registerEnumType` decorator. Supports native TypeScript enums and const objects. Registered enums are automatically resolved to `$ref` schemas when used with `@ApiProperty`.

```ts
enum PostStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
}

registerEnumType(PostStatus, {
  name: 'PostStatus',
  description: 'The post status',
})

class Post {
  @ApiProperty({ type: () => PostStatus })
  declare status: PostStatus
}
```
