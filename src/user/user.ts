import { User } from 'nexus-prisma'
import { objectType, queryField, mutationField, stringArg, nonNull } from 'nexus'

export const userTypes = [
  objectType({
    name: User.$name,
    description: User.$description,
    definition(t) {
      t.field(User.id),
        t.field(User.createdAt),
        t.field(User.updatedAt),
        t.field(User.email),
        t.field(User.googleUserId)
    },
  }),
]

export const userQueryFields = [
  queryField('getCurrentUser', {
    type: User.$name,
    resolve(_, __, ctx) {
      return ctx.user
    },
  }),
]

export const userMutationFields = [
  mutationField('createUser', {
    type: User.$name,
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
