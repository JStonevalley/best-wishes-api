import { PrismaClient } from "@prisma/client";
import { User } from 'nexus-prisma'
import { objectType } from 'nexus'

export const userTypes = [
  objectType({
    name: User.$name,
    description: User.$description,
    definition(t) {
      t.field(User.id),
        t.field(User.createdAt),
        t.field(User.updatedAt),
        t.field(User.email),
        t.field(User.wishLists)
    }
  })
]


export const resolvers = (prisma: PrismaClient) => ({
  Query: {
    userById: (_: any, { id }: { id: string }) => {
      return prisma.user.findUnique({
        where: {
          id
        }
      })
    }
  },
  Mutation: {
    createUser: (_: any, { email }: { email: string }) => {
      return prisma.user.create({
        data: { email }
      })
    }
  }
});