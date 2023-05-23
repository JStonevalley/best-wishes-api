import { WishList as WishListSchemaTemplate, Share as ShareSchemaTemplate } from 'nexus-prisma'
import { mutationField, nonNull, objectType, queryField, stringArg, list } from 'nexus'
import { logger } from '../log'
import { GraphQLError } from 'graphql'

export const wishlistTypes = [
  objectType({
    name: WishListSchemaTemplate.$name,
    description: WishListSchemaTemplate.$description,
    definition(t) {
      t.field(WishListSchemaTemplate.id),
        t.field(WishListSchemaTemplate.createdAt),
        t.field(WishListSchemaTemplate.updatedAt),
        t.field(WishListSchemaTemplate.headline),
        t.field(WishListSchemaTemplate.user),
        t.field(WishListSchemaTemplate.wishes),
        t.field(WishListSchemaTemplate.shares)
    },
  }),
  objectType({
    name: ShareSchemaTemplate.$name,
    description: ShareSchemaTemplate.$description,
    definition(t) {
      t.field(ShareSchemaTemplate.id),
        t.field(ShareSchemaTemplate.createdAt),
        t.field(ShareSchemaTemplate.updatedAt),
        t.field(ShareSchemaTemplate.invitedEmail),
        t.field(ShareSchemaTemplate.wishList)
    },
  }),
]

export const wishListQueryFields = [
  queryField('getOwnWishLists', {
    type: list(WishListSchemaTemplate.$name),
    resolve(_, __, ctx) {
      logger.info('getOwnWishLists')
      if (!ctx.user)
        throw new GraphQLError('Unauthenticated', {
          extensions: { code: 'UNAUTHENTICATED' },
        })
      return ctx.prisma.wishList.findMany({
        where: {
          userId: ctx.user.id,
        },
      })
    },
  }),
  queryField('getOwnWishList', {
    type: WishListSchemaTemplate.$name,
    args: {
      id: nonNull(stringArg()),
    },
    resolve(_, { id }: { id: string }, ctx) {
      logger.info('getOwnWishList')
      if (!ctx.user)
        throw new GraphQLError('Unauthenticated', {
          extensions: { code: 'UNAUTHENTICATED' },
        })
      return ctx.prisma.wishList.findUnique({
        where: {
          id,
        },
      })
    },
  }),
]

export const wishListMutationFields = [
  mutationField('createWishList', {
    type: WishListSchemaTemplate.$name,
    args: {
      headline: nonNull(stringArg()),
    },
    resolve(_, { headline }: { headline: string }, ctx) {
      if (!ctx.user)
        throw new GraphQLError('Unauthenticated', {
          extensions: { code: 'UNAUTHENTICATED' },
        })
      return ctx.prisma.wishList.create({
        data: { headline, userId: ctx.user.id },
      })
    },
  }),
]
