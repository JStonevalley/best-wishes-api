import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { schema } from './schema'
import { setupContext, Context } from './context'
import { logger } from './log'

const PORT = Number(process.env.PORT) || 4000

const server = new ApolloServer<Context>({ schema })
startStandaloneServer(server, { context: setupContext, listen: { port: PORT } })
  .then(({ url }) => {
    logger.info(`Server listening at ${url}`)
  })
  .catch((error) => {
    logger.error('Server could not start')
    logger.error(error)
  })
