import { GraphQLError } from 'graphql'
import { remove } from 'ramda'
import { sendShareEmail } from '../email/send'
import { logger } from '../log'
import { logResolverInfo, requireAuth } from '../resolverTools'
import { createWishList, syncWishOrder } from './utils'

export const wishlistResolvers = {
  WishList: {
    user: async (parent: any, _: any, ctx: any) => {
      if (parent.user) return parent.user
      return ctx.prisma.user.findUniqueOrThrow({ where: { id: parent.userId } })
    },
    wishes: async (parent: any, _: any, ctx: any) => {
      if (parent.wishes) return parent.wishes
      return ctx.prisma.wish.findMany({ where: { wishListId: parent.id } })
    },
    shares: async (parent: any, _: any, ctx: any) => {
      if (parent.shares) return parent.shares
      return ctx.prisma.share.findMany({ where: { wishListId: parent.id } })
    },
  },
  Share: {
    wishList: async (parent: any, _: any, ctx: any) => {
      if (parent.wishList) return parent.wishList
      return ctx.prisma.wishList.findUniqueOrThrow({ where: { id: parent.wishListId } })
    },
  },
  Query: {
    getOwnWishLists: logResolverInfo(
      requireAuth((_: any, __: any, ctx) => {
        return ctx.prisma.wishList.findMany({
          where: { userId: ctx.user?.id },
        })
      }),
    ),
    getOwnWishList: logResolverInfo(
      requireAuth(async (_: any, { id }: { id: string }, ctx) => {
        const wishList = await ctx.prisma.wishList.findUnique({
          where: { id },
          include: { wishes: true, shares: true },
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
      }),
    ),
    getShare: logResolverInfo(async (_: any, { id }: { id: string }, ctx) => {
      return ctx.prisma.share.findUnique({
        where: { id },
        include: {
          wishList: {
            include: { wishes: true },
          },
        },
      })
    }),
    getOwnShares: logResolverInfo(
      requireAuth(async (_: any, __: any, ctx) => {
        return ctx.prisma.share.findMany({
          where: { invitedEmail: ctx.user?.email },
          include: {
            wishList: {
              include: { wishes: true },
            },
          },
        })
      }),
    ),
  },
  Mutation: {
    createWishList: logResolverInfo(
      requireAuth((_: any, { headline }: { headline: string }, ctx) => {
        if (!ctx.user)
          throw new GraphQLError('Unauthenticated', {
            extensions: { code: 'UNAUTHENTICATED' },
          })
        return createWishList(ctx.prisma)({ headline, userId: ctx.user.id })
      }),
    ),
    changeWishList: logResolverInfo(
      requireAuth(async (_: any, { id, headline }: { id: string; headline: string }, ctx) => {
        if (!ctx.user)
          throw new GraphQLError('Unauthenticated', {
            extensions: { code: 'UNAUTHENTICATED' },
          })
        const wishList = await ctx.prisma.wishList.findFirst({
          where: { id },
          select: { userId: true },
        })
        if (wishList?.userId !== ctx.user.id)
          throw new GraphQLError('User is not allowed to archive this list', {
            extensions: { code: 'NOT_OWNER' },
          })
        return ctx.prisma.wishList.update({
          where: { id },
          data: { headline },
        })
      }),
    ),
    archiveWishList: logResolverInfo(
      requireAuth(async (_: any, { id }: { id: string }, ctx) => {
        if (!ctx.user)
          throw new GraphQLError('Unauthenticated', {
            extensions: { code: 'UNAUTHENTICATED' },
          })
        const wishList = await ctx.prisma.wishList.findFirst({
          where: { id },
          select: { userId: true },
        })
        if (wishList?.userId !== ctx.user.id)
          throw new GraphQLError('User is not allowed to archive this list', {
            extensions: { code: 'NOT_OWNER' },
          })
        return ctx.prisma.wishList.update({
          where: { id },
          data: { archivedAt: new Date() },
        })
      }),
    ),
    unarchiveWishList: logResolverInfo(
      requireAuth(async (_: any, { id }: { id: string }, ctx) => {
        if (!ctx.user)
          throw new GraphQLError('Unauthenticated', {
            extensions: { code: 'UNAUTHENTICATED' },
          })
        const wishList = await ctx.prisma.wishList.findFirst({
          where: { id },
          select: { userId: true },
        })
        if (wishList?.userId !== ctx.user.id)
          throw new GraphQLError('User is not allowed to unarchive this list', {
            extensions: { code: 'NOT_OWNER' },
          })
        return ctx.prisma.wishList.update({
          where: { id },
          data: { archivedAt: null },
        })
      }),
    ),
    updateWishOrderForWishList: logResolverInfo(
      requireAuth(async (_: any, { id, wishOrder }: { id: string; wishOrder: string[] }, ctx) => {
        if (!ctx.user)
          throw new GraphQLError('Unauthenticated', {
            extensions: { code: 'UNAUTHENTICATED' },
          })
        const wishList = await ctx.prisma.wishList.findFirst({
          where: { id },
          select: { userId: true },
        })
        if (wishList?.userId !== ctx.user.id)
          throw new GraphQLError('User is not allowed to change wish order of this list', {
            extensions: { code: 'NOT_OWNER' },
          })
        return syncWishOrder(ctx.prisma)({ wishOrder, wishListId: id })
      }),
    ),
    createShare: logResolverInfo(
      requireAuth((_: any, { invitedEmail, wishListId }: { invitedEmail: string; wishListId: string }, ctx) => {
        return ctx.prisma.share.create({
          data: { invitedEmail, wishListId, claimedWishIds: [] },
        })
      }),
    ),
    removeShare: logResolverInfo(
      requireAuth((_: any, { id }: { id: string }, ctx) => {
        return ctx.prisma.share.delete({ where: { id } })
      }),
    ),
    sendShareEmails: logResolverInfo(
      requireAuth(async (_: any, { shareIds }: { shareIds: string[] }, ctx) => {
        const shares = await ctx.prisma.share.findMany({
          where: { id: { in: shareIds } },
          include: {
            wishList: {
              include: { user: true },
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
                    wishListLink: `${ctx.origin}/shared/${share.id}`,
                  },
                }),
              ),
            )
            return true
          } catch (error) {
            logger.error(error)
            return false
          }
        }
        throw new GraphQLError('Share not found', { extensions: { code: 'BAD_USER_INPUT' } })
      }),
    ),
    claimWish: logResolverInfo(async (_: any, { id, wishId }: { id: string; wishId: string }, ctx) => {
      const wish = await ctx.prisma.wish.findFirst({
        where: { id: wishId },
        select: { id: true, quantity: true, wishListId: true },
      })
      if (!wish?.wishListId) {
        throw new GraphQLError('Wish not found', {
          extensions: { code: 'NOT_FOUND' },
        })
      }
      const shares = await ctx.prisma.share.findMany({
        where: { wishListId: wish.wishListId },
        select: { claimedWishIds: true },
      })
      const quantityClaimed = shares
        .flatMap((share: any) => share.claimedWishIds)
        .filter((claimedId: string) => claimedId === wishId).length
      if (quantityClaimed >= wish.quantity) {
        throw new GraphQLError('No wish left to claim', {
          extensions: { code: 'OUT_OF_QUANTITY' },
        })
      }
      return ctx.prisma.share.update({
        where: { id },
        data: {
          claimedWishIds: { push: wishId },
        },
      })
    }),
    removeWishClaim: logResolverInfo(async (_: any, { id, wishId }: { id: string; wishId: string }, ctx) => {
      const share = await ctx.prisma.share.findFirst({ where: { id } })
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
        where: { id },
        data: {
          claimedWishIds: remove(indexOfClaimedWish, 1, share.claimedWishIds),
        },
      })
    }),
  },
}
