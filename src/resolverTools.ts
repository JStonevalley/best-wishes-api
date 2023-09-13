import { GraphQLError } from 'graphql'
import { FieldResolver } from 'nexus'
import { logger } from './log'

export const requireAuth =
  <TypeName extends string, FieldName extends string>(
    next: FieldResolver<TypeName, FieldName>
  ): FieldResolver<TypeName, FieldName> =>
  (parent, args, contextValue, info) => {
    if (!contextValue.user)
      throw new GraphQLError('Unauthenticated', {
        extensions: { code: 'UNAUTHENTICATED' },
      })
    return next(parent, args, contextValue, info)
  }

export const logResolverInfo =
  <TypeName extends string, FieldName extends string>(
    next: FieldResolver<TypeName, FieldName>
  ): FieldResolver<TypeName, FieldName> =>
  (parent, args, contextValue, info) => {
    logger.info(info.fieldName)
    return next(parent, args, contextValue, info)
  }
