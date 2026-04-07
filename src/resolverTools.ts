import { GraphQLError, type GraphQLResolveInfo } from 'graphql'
import type { Context } from './context'
import { logger } from './log'

type GraphQLFieldResolver = (parent: any, args: any, context: Context, info: GraphQLResolveInfo) => any

export const requireAuth =
  (next: GraphQLFieldResolver): GraphQLFieldResolver =>
  (parent, args, context, info) => {
    if (!context.user)
      throw new GraphQLError('Unauthenticated', {
        extensions: { code: 'UNAUTHENTICATED' },
      })
    return next(parent, args, context, info)
  }

export const logResolverInfo =
  (next: GraphQLFieldResolver): GraphQLFieldResolver =>
  (parent, args, context, info) => {
    logger.info(info.fieldName)
    return next(parent, args, context, info)
  }
