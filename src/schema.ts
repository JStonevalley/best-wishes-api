import { makeSchema } from 'nexus'
import { join } from 'path'
import { userTypes, userQueryFields, userMutationFields } from './user/user'
import { wishTypes, wishMutationFields, wishQueryFields } from './wish/wish'
import { GraphQLDateTime } from 'graphql-scalars'
import { wishlistTypes, wishListQueryFields, wishListMutationFields } from './wishlist/wishlist'

export const schema = makeSchema({
  types: [
    GraphQLDateTime,
    ...userTypes,
    ...userQueryFields,
    ...userMutationFields,
    ...wishTypes,
    ...wishMutationFields,
    ...wishQueryFields,
    ...wishlistTypes,
    ...wishListQueryFields,
    ...wishListMutationFields,
  ],
  sourceTypes: {
    modules: [
      {
        module: join(__dirname, '..', 'node_modules', '@prisma', 'client', 'index.d.ts'),
        alias: 'prisma',
      },
    ],
  },
  outputs: {
    typegen: join(__dirname, '..', 'nexus-typegen.ts'),
    schema: join(__dirname, '..', 'schema.graphql'),
  },
  contextType: {
    module: join(__dirname, './context.ts'),
    export: 'Context',
  },
})
