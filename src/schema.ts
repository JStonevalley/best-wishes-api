import { makeExecutableSchema } from '@graphql-tools/schema'
import { readFileSync } from 'fs'
import { join } from 'path'
import { GraphQLDateTime } from 'graphql-scalars'
import { userResolvers } from './user/user'
import { wishResolvers } from './wish/wish'
import { wishlistResolvers } from './wishlist/wishlist'

const typeDefs = readFileSync(join(__dirname, '..', 'schema.graphql'), 'utf-8')

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers: [{ DateTime: GraphQLDateTime }, userResolvers, wishResolvers, wishlistResolvers],
})
