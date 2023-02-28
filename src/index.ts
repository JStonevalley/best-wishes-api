import { ApolloServer, gql } from 'apollo-server';
import { PrismaClient } from '@prisma/client';
import { userTypeDefs, resolvers as userResolvers } from './user/user';

const prisma = new PrismaClient();

const typeDefs = gql`
  scalar DateTime

  type ValueObject {
    amount: Int!
    currency: String
  }

  type Wish {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    title: String
    description: String
    price: ValueObject
    quantity: Int
    link: String
    image: String
    wishList: WishList
    wishListId: String
  }

  type Share {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    invitedEmail: String!
    wishList: WishList!
    wishListId: String!
  }  

  type WishList {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    headline: String
    wishes: [Wish]
    shares: [Share]
    user: User
    userId: String
  }

  ${userTypeDefs}
`;

const resolvers = {
  Query: {
    ...userResolvers(prisma).Query
  },
  Mutation: {
    ...userResolvers(prisma).Mutation
  }
};

const server = new ApolloServer({ resolvers, typeDefs });
server.listen({ port: 4000 });