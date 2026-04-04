import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'schema.graphql',
  generates: {
    'src/generated/graphql.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        contextType: '../context#Context',
        mappers: {
          User: '@prisma/client#User as PrismaUser',
          Wish: '@prisma/client#Wish as PrismaWish',
          WishList: '@prisma/client#WishList as PrismaWishList',
          Share: '@prisma/client#Share as PrismaShare',
          ValueObject: '@prisma/client#ValueObject as PrismaValueObject',
        },
      },
    },
  },
}

export default config
