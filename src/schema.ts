import { makeSchema } from 'nexus'
import { join } from 'path'
import { userTypes, userQueryFields, userMutationFields } from './user/user'
import { GraphQLDateTime } from 'graphql-scalars'

export const schema = makeSchema({
  types: [GraphQLDateTime, ...userTypes, ...userQueryFields, ...userMutationFields],
  outputs: {
    typegen: join(__dirname, '..', 'nexus-typegen.ts'),
    schema: join(__dirname, '..', 'schema.graphql'),
  },
  contextType: {
    module: join(__dirname, './context.ts'),
    export: 'Context',
  },
})
