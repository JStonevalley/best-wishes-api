import { User as UserSchemaTemplate } from 'nexus-prisma'
import { objectType, queryField, mutationField, stringArg, nonNull } from 'nexus'
import { GraphQLError } from 'graphql'
import { logger } from '../log'

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
    resolve(_, __, ctx) {
      logger.info('getCurrentUser')
      if (!ctx.user)
        throw new GraphQLError('Unauthenticated', {
          extensions: { code: 'UNAUTHENTICATED' },
        })
      return ctx.user
    },
  }),
]

export const userMutationFields = [
  mutationField('createUser', {
    type: UserSchemaTemplate.$name,
    args: {
      email: nonNull(stringArg()),
    },
    resolve(_, { email }: { email: string }, ctx) {
      if (!ctx.googleUserId)
        throw new GraphQLError('Unauthenticated', {
          extensions: { code: 'UNAUTHENTICATED' },
        })
      return ctx.prisma.user.create({
        data: { email, googleUserId: ctx.googleUserId },
      })
    },
  }),
]
