import { User } from 'nexus-prisma'
import { objectType, queryField, stringArg, nonNull } from 'nexus'

export const userTypes = [
  objectType({
    name: User.$name,
    description: User.$description,
    definition(t) {
      t.field(User.id),
        t.field(User.createdAt),
        t.field(User.updatedAt),
        t.field(User.email)
    }
  })
]

export const userQueryFields = [
  queryField('userById', {
    type: User.$name,
    args: {
      id: nonNull(stringArg()),
    },
    resolve(_: any, { id }: { id: string }, context) {
      return context.prisma.user.findUnique({
        where: {
          id
        }
      })
    },
  })
]

export const userMutationFields = [
  queryField('createUser', {
    type: User.$name,
    args: {
      email: nonNull(stringArg()),
    },
    resolve(_: any, { email }: { email: string }, context) {
      return context.prisma.user.create({
        data: { email }
      })
    },
  })
]