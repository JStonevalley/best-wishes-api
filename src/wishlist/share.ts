import { GraphQLError } from 'graphql'
import { remove } from 'ramda'
import { sendShareEmail } from '../email/send'
import { logger } from '../log'
import { logResolverInfo, requireAuth } from '../resolverTools'

export const shareResolvers = {
  Share: {
    wishList: async (parent: any, _: any, ctx: any) => {
      if (parent.wishList) return parent.wishList
      return ctx.prisma.wishList.findUniqueOrThrow({ where: { id: parent.wishListId } })
    },
  },
  Query: {
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
