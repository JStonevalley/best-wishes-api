import { PrismaClient } from "@prisma/client";
import { gql } from "apollo-server";

export const userTypeDefs = gql`
  type User {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    email: String!
    wishLists: [WishList]
  }

  input UserDetails {
    email: String!
  }

  type Query {
    userById(id: String!): User!
  }

  type Mutation {
    createUser(userDetails: UserDetails!) : User!
  }
`

type UserDetails = {
  email: string
}

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
    createUser: (_: any, { userDetails }: { userDetails: UserDetails }) => {
      return prisma.user.create({
        data: userDetails
      })
    }
  }
});