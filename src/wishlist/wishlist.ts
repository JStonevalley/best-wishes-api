import { WishList as WishListSchemaTemplate, Share as ShareSchemaTemplate } from 'nexus-prisma'
import { mutationField, nonNull, objectType, queryField, stringArg, list } from 'nexus'
import { GraphQLError } from 'graphql'
import { logResolverInfo, requireAuth } from '../resolverTools'
import { remove } from 'ramda'
import { syncWishOrder } from './utils'
import { sendShareEmail } from '../email/send'
import { logger } from '../log'
import { Share } from '.prisma/client'

export const wishlistTypes = [
  objectType({
    name: WishListSchemaTemplate.$name,
    description: WishListSchemaTemplate.$description,
    definition(t) {
      t.field(WishListSchemaTemplate.id),
        t.field(WishListSchemaTemplate.createdAt),
        t.field(WishListSchemaTemplate.updatedAt),
        t.field(WishListSchemaTemplate.archivedAt),
        t.field(WishListSchemaTemplate.headline),
        t.field(WishListSchemaTemplate.user),
        t.field(WishListSchemaTemplate.wishes),
        t.field(WishListSchemaTemplate.wishOrder),
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
  queryField('getOwnShares', {
    type: list(ShareSchemaTemplate.$name),
    resolve: logResolverInfo(
      requireAuth(async (_, __, ctx) => {
        return ctx.prisma.share.findMany({
          where: {
            invitedEmail: ctx.user?.email,
          },
          include: {
            wishList: {
              include: {
                wishes: true,
              },
            },
          },
        })
      })
    ),
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
          data: { headline, userId: ctx.user.id, wishOrder: [] },
        })
      })
    ),
  }),
  mutationField('archiveWishList', {
    type: WishListSchemaTemplate.$name,
    args: {
      id: nonNull(stringArg()),
    },
    resolve: logResolverInfo(
      requireAuth(async (_, { id }: { id: string }, ctx) => {
        if (!ctx.user)
          throw new GraphQLError('Unauthenticated', {
            extensions: { code: 'UNAUTHENTICATED' },
          })
        const wishList = await ctx.prisma.wishList.findFirst({
          where: {
            id,
          },
          select: {
            userId: true,
          },
        })
        if (wishList?.userId !== ctx.user.id)
          throw new GraphQLError('User is not allowed to archive this list', {
            extensions: { code: 'NOT_OWNER' },
          })
        return ctx.prisma.wishList.update({
          where: {
            id,
          },
          data: { archivedAt: new Date() },
        })
      })
    ),
  }),
  mutationField('unarchiveWishList', {
    type: WishListSchemaTemplate.$name,
    args: {
      id: nonNull(stringArg()),
    },
    resolve: logResolverInfo(
      requireAuth(async (_, { id }: { id: string }, ctx) => {
        if (!ctx.user)
          throw new GraphQLError('Unauthenticated', {
            extensions: { code: 'UNAUTHENTICATED' },
          })
        const wishList = await ctx.prisma.wishList.findFirst({
          where: {
            id,
          },
          select: {
            userId: true,
          },
        })
        if (wishList?.userId !== ctx.user.id)
          throw new GraphQLError('User is not allowed to unarchive this list', {
            extensions: { code: 'NOT_OWNER' },
          })
        return ctx.prisma.wishList.update({
          where: {
            id,
          },
          data: { archivedAt: null },
        })
      })
    ),
  }),
  mutationField('updateWishOrderForWishList', {
    type: WishListSchemaTemplate.$name,
    args: {
      id: nonNull(stringArg()),
      wishOrder: nonNull(list(nonNull(stringArg()))),
    },
    resolve: logResolverInfo(
      requireAuth(async (_, { id, wishOrder }: { id: string; wishOrder: string[] }, ctx) => {
        if (!ctx.user)
          throw new GraphQLError('Unauthenticated', {
            extensions: { code: 'UNAUTHENTICATED' },
          })
        const wishList = await ctx.prisma.wishList.findFirst({
          where: {
            id,
          },
          select: {
            userId: true,
          },
        })
        if (wishList?.userId !== ctx.user.id)
          throw new GraphQLError('User is not allowed to change wish order of this list', {
            extensions: { code: 'NOT_OWNER' },
          })
        return syncWishOrder(ctx.prisma)({ wishOrder, wishListId: id })
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
  mutationField('sendShareEmails', {
    type: 'Boolean',
    args: {
      shareIds: nonNull(list(nonNull(stringArg()))),
    },
    resolve: logResolverInfo(
      requireAuth(async (_, { shareIds }: { shareIds: string[] }, ctx) => {
        const shares = await ctx.prisma.share.findMany({
          where: {
            id: {
              in: shareIds,
            },
          },
          include: {
            wishList: {
              include: {
                user: true,
              },
            },
          },
        })
        if (shares.length === shareIds.length) {
          try {
            await Promise.all(
              shares.map((share: any) =>
                sendShareEmail({
                  toEmail: share.invitedEmail,
                  context: {
                    fromEmail: share.wishList.user.email,
                    wishListTitle: share.wishList.headline,
                    wishListLink: `https://bestwishes.io/share/${share.id}`,
                  },
                })
              )
            )
            return true
          } catch (error) {
            logger.error(error)
            return false
          }
        }
        throw new GraphQLError('Share not found', { extensions: { code: 'BAD_USER_INPUT' } })
      })
    ),
  }),
  mutationField('claimWish', {
    type: ShareSchemaTemplate.$name,
    args: {
      id: nonNull(stringArg()),
      wishId: nonNull(stringArg()),
    },
    resolve: logResolverInfo(
      requireAuth(async (_, { id, wishId }: { id: string; wishId: string }, ctx) => {
        const wish = await ctx.prisma.wish.findFirst({
          where: {
            id: wishId,
          },
          select: {
            id: true,
            quantity: true,
            wishListId: true,
          },
        })
        if (!wish?.wishListId) {
          throw new GraphQLError('Wish not found', {
            extensions: { code: 'NOT_FOUND' },
          })
        }
        const shares = await ctx.prisma.share.findMany({
          where: {
            wishListId: wish.wishListId,
          },
          select: {
            claimedWishIds: true,
          },
        })
        const quantityClaimed = shares
          .flatMap((share: any) => share.claimedWishIds)
          .filter((id: string) => id === wishId).length
        if (quantityClaimed >= wish.quantity) {
          throw new GraphQLError('No wish left to claim', {
            extensions: { code: 'OUT_OF_QUANTITY' },
          })
        }
        return ctx.prisma.share.update({
          where: {
            id,
          },
          data: {
            claimedWishIds: {
              push: wishId,
            },
          },
        })
      })
    ),
  }),
  mutationField('removeWishClaim', {
    type: ShareSchemaTemplate.$name,
    args: {
      id: nonNull(stringArg()),
      wishId: nonNull(stringArg()),
    },
    resolve: logResolverInfo(
      requireAuth(async (_, { id, wishId }: { id: string; wishId: string }, ctx) => {
        const share = await ctx.prisma.share.findFirst({
          where: {
            id,
          },
        })
        if (!share) {
          throw new GraphQLError('Share not found', {
            extensions: { code: 'NOT_FOUND' },
          })
        }
        const indexOfClaimedWish = share.claimedWishIds.indexOf(wishId)
        if (indexOfClaimedWish === -1) {
          return share
        }
        return ctx.prisma.share.update({
          where: {
            id,
          },
          data: {
            claimedWishIds: remove(indexOfClaimedWish, 1, share.claimedWishIds),
          },
        })
      })
    ),
  }),
]
