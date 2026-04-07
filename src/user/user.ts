import { GraphQLError } from 'graphql'
import { logResolverInfo, requireAuth } from '../resolverTools'
import { migrateV1Data } from './migrate'

export const userResolvers = {
  Query: {
    getCurrentUser: logResolverInfo(requireAuth(async (_: any, __: any, ctx) => ctx.user)),
  },
  Mutation: {
    createUser: logResolverInfo(async (_: any, { email }: { email: string }, ctx) => {
      if (!ctx.googleUserId)
        throw new GraphQLError('Unauthenticated', {
          extensions: { code: 'UNAUTHENTICATED' },
        })
      const user = await ctx.prisma.user.create({
        data: { email, googleUserId: ctx.googleUserId },
      })
      await migrateV1Data(ctx.prisma)(user)
      return user
    }),
  },
}
