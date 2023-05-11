import { ApolloServer } from 'apollo-server'
import { schema } from './schema'
import { setupContext } from './context'
import { logger } from './log'

const PORT = 4000

const server = new ApolloServer({ schema, context: setupContext })
server.listen({ port: PORT })
logger.info(`Server listening at port: ${PORT}`)
