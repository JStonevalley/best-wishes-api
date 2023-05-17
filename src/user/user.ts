import { User as UserSchemaTemplate } from 'nexus-prisma'
import { objectType, queryField, mutationField, stringArg, nonNull } from 'nexus'

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
      return ctx.user
    },
  }),
]

export const userMutationFields = [
  mutationField('createUser', {
    type: UserSchemaTemplate.$name,
    args: {
      email: nonNull(stringArg()),
      googleUserId: nonNull(stringArg()),
    },
    resolve(_, { email, googleUserId }: { email: string; googleUserId: string }, ctx) {
      return ctx.prisma.user.create({
        data: { email, googleUserId },
      })
    },
  }),
]
