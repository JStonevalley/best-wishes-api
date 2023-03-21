import { ApolloServer, gql } from 'apollo-server';
import { schema } from './schema';

const server = new ApolloServer({ schema });
server.listen({ port: 4000 });