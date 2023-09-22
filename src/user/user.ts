import { User as UserSchemaTemplate } from '../../generated/nexus-prisma'
import { objectType, queryField, mutationField, stringArg, nonNull } from 'nexus'
import { GraphQLError } from 'graphql'
import { logResolverInfo, requireAuth } from '../resolverTools'
import { migrateV1Data } from './migrate'

export const userTypes = [
  objectType({
    name: UserSchemaTemplate.$name,
    description: UserSchemaTemplate.$description,
    definition(t) {
      t.field(UserSchemaTemplate.id),
        t.field(UserSchemaTemplate.createdAt),
        t.field(UserSchemaTemplate.updatedAt),
        t.field(UserSchemaTemplate.email),
        t.field(UserSchemaTemplate.googleUserId)
    },
  }),
]

export const userQueryFields = [
  queryField('getCurrentUser', {
    type: UserSchemaTemplate.$name,
    resolve: logResolverInfo(requireAuth(async (_, __, ctx) => ctx.user)),
  }),
]

export const userMutationFields = [
  mutationField('createUser', {
    type: UserSchemaTemplate.$name,
    args: {
      email: nonNull(stringArg()),
    },
    resolve: logResolverInfo(async (_, { email }: { email: string }, ctx) => {
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
  }),
]
