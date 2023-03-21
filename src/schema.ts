import { makeSchema, asNexusMethod } from 'nexus';
import { join } from 'path';
import { userTypes } from './user/user';
import { GraphQLDateTime } from 'graphql-scalars';

export const schema = makeSchema({
  types: [GraphQLDateTime, ...userTypes],
  outputs: {
    typegen: join(__dirname, '..', 'nexus-typegen.ts'),
    schema: join(__dirname, '..', 'schema.graphql'),
  },
})