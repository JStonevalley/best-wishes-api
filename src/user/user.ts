import { User as UserSchemaTemplate } from '../../generated/nexus-prisma'
import { objectType, queryField, mutationField, stringArg, nonNull } from 'nexus'
import { GraphQLError } from 'graphql'
import { logResolverInfo, requireAuth } from '../resolverTools'

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
    resolve: logResolverInfo((_, { email }: { email: string }, ctx) => {
      if (!ctx.googleUserId)
        throw new GraphQLError('Unauthenticated', {
          extensions: { code: 'UNAUTHENTICATED' },
        })
      return ctx.prisma.user.create({
        data: { email, googleUserId: ctx.googleUserId },
      })
    }),
  }),
]
