import { makeSchema } from 'nexus'
import { join } from 'path'
import { userTypes, userQueryFields, userMutationFields } from './user/user'
import { wishTypes } from './wish/wish'
import { GraphQLDateTime } from 'graphql-scalars'
import { wishlistTypes, wishListQueryFields, wishListMutationFields } from './wishlist/wishlist'

export const schema = makeSchema({
  types: [
    GraphQLDateTime,
    ...userTypes,
    ...userQueryFields,
    ...userMutationFields,
    ...wishTypes,
    ...wishlistTypes,
    ...wishListQueryFields,
    ...wishListMutationFields,
  ],
  outputs: {
    typegen: join(__dirname, '..', 'nexus-typegen.ts'),
    schema: join(__dirname, '..', 'schema.graphql'),
  },
  contextType: {
    module: join(__dirname, './context.ts'),
    export: 'Context',
  },
})
