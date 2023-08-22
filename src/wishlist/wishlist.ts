import { WishList as WishListSchemaTemplate, Share as ShareSchemaTemplate } from 'nexus-prisma'
import { mutationField, nonNull, objectType, queryField, stringArg, list } from 'nexus'
import { GraphQLError } from 'graphql'
import { logResolverInfo, requireAuth } from '../resolverTools'

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
        t.field(ShareSchemaTemplate.wishList),
        t.field(ShareSchemaTemplate.claimedWishIds)
    },
  }),
]

export const wishListQueryFields = [
  queryField('getOwnWishLists', {
    type: list(WishListSchemaTemplate.$name),
    resolve: logResolverInfo(
      requireAuth((_, __, ctx) => {
        return ctx.prisma.wishList.findMany({
          where: {
            userId: ctx.user?.id,
          },
        })
      })
    ),
  }),
  queryField('getOwnWishList', {
    type: WishListSchemaTemplate.$name,
    args: {
      id: nonNull(stringArg()),
    },
    resolve: logResolverInfo(
      requireAuth(async (_, { id }: { id: string }, ctx) => {
        const wishList = await ctx.prisma.wishList.findUnique({
          where: {
            id,
          },
          include: {
            wishes: true,
            shares: true,
          },
        })
        if (!wishList)
          throw new GraphQLError('WishList not found', {
            extensions: { code: 'NOT_FOUND' },
          })
        if (ctx.user?.id !== wishList.userId)
          throw new GraphQLError('This user is not the owner of the wish list', {
            extensions: { code: 'FORBIDDEN' },
          })
        return wishList
      })
    ),
  }),
  queryField('getShare', {
    type: ShareSchemaTemplate.$name,
    args: {
      id: nonNull(stringArg()),
    },
    resolve: logResolverInfo(async (_, { id }: { id: string }, ctx) => {
      return ctx.prisma.share.findUnique({
        where: {
          id,
        },
        include: {
          wishList: {
            include: {
              wishes: true,
            },
          },
        },
      })
    }),
  }),
]

export const wishListMutationFields = [
  mutationField('createWishList', {
    type: WishListSchemaTemplate.$name,
    args: {
      headline: nonNull(stringArg()),
    },
    resolve: logResolverInfo(
      requireAuth((_, { headline }: { headline: string }, ctx) => {
        if (!ctx.user)
          throw new GraphQLError('Unauthenticated', {
            extensions: { code: 'UNAUTHENTICATED' },
          })
        return ctx.prisma.wishList.create({
          data: { headline, userId: ctx.user.id },
        })
      })
    ),
  }),
  mutationField('createShare', {
    type: ShareSchemaTemplate.$name,
    args: {
      invitedEmail: nonNull(stringArg()),
      wishListId: nonNull(stringArg()),
    },
    resolve: logResolverInfo(
      requireAuth((_, { invitedEmail, wishListId }: { invitedEmail: string; wishListId: string }, ctx) => {
        return ctx.prisma.share.create({
          data: { invitedEmail, wishListId, claimedWishIds: [] },
        })
      })
    ),
  }),
  mutationField('removeShare', {
    type: ShareSchemaTemplate.$name,
    args: {
      id: nonNull(stringArg()),
    },
    resolve: logResolverInfo(
      requireAuth((_, { id }: { id: string }, ctx) => {
        return ctx.prisma.share.delete({
          where: {
            id,
          },
        })
      })
    ),
  }),
]
