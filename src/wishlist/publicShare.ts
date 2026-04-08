import { GraphQLError } from 'graphql'
import { logResolverInfo, requireAuth } from '../resolverTools'

export const publicShareResolvers = {
  PublicShare: {
    wishList: async (parent: any, _: any, ctx: any) => {
      if (parent.wishList) return parent.wishList
      return ctx.prisma.wishList.findUniqueOrThrow({ where: { id: parent.wishListId } })
    },
  },
  WishList: {
    publicShare: async (parent: any, _: any, ctx: any) => {
      if (parent.publicShare !== undefined) return parent.publicShare
      return ctx.prisma.publicShare.findUnique({ where: { wishListId: parent.id } })
    },
  },
  Query: {
    getPublicShare: logResolverInfo(async (_: any, { id }: { id: string }, ctx) => {
      return ctx.prisma.publicShare.findUnique({
        where: { id },
        include: {
          wishList: {
            include: { wishes: true },
          },
        },
      })
    }),
  },
  Mutation: {
    createPublicShare: logResolverInfo(
      requireAuth(async (_: any, { wishListId }: { wishListId: string }, ctx) => {
        const wishList = await ctx.prisma.wishList.findUnique({
          where: { id: wishListId },
          select: { userId: true },
        })
        if (!wishList)
          throw new GraphQLError('WishList not found', {
            extensions: { code: 'NOT_FOUND' },
          })
        if (wishList.userId !== ctx.user?.id)
          throw new GraphQLError('Only the owner can create a public share for this list', {
            extensions: { code: 'FORBIDDEN' },
          })
        return ctx.prisma.publicShare.create({
          data: { wishListId },
        })
      }),
    ),
    deletePublicShare: logResolverInfo(
      requireAuth(async (_: any, { id }: { id: string }, ctx) => {
        const publicShare = await ctx.prisma.publicShare.findUnique({
          where: { id },
          include: { wishList: { select: { userId: true } } },
        })
        if (!publicShare)
          throw new GraphQLError('PublicShare not found', {
            extensions: { code: 'NOT_FOUND' },
          })
        if (publicShare.wishList.userId !== ctx.user?.id)
          throw new GraphQLError('Only the owner can delete this public share', {
            extensions: { code: 'FORBIDDEN' },
          })
        return ctx.prisma.publicShare.delete({ where: { id } })
      }),
    ),
    redeemPublicShare: logResolverInfo(
      requireAuth(async (_: any, { publicShareId }: { publicShareId: string }, ctx) => {
        const publicShare = await ctx.prisma.publicShare.findUnique({
          where: { id: publicShareId },
          include: { wishList: { select: { userId: true } } },
        })
        if (!publicShare)
          throw new GraphQLError('PublicShare not found', {
            extensions: { code: 'NOT_FOUND' },
          })
        if (publicShare.wishList.userId === ctx.user?.id)
          throw new GraphQLError('Cannot redeem a public share for your own wish list', {
            extensions: { code: 'FORBIDDEN' },
          })
        const existingShare = await ctx.prisma.share.findFirst({
          where: {
            invitedEmail: ctx.user?.email,
            wishListId: publicShare.wishListId,
          },
        })
        if (existingShare)
          throw new GraphQLError('You already have a share for this wish list', {
            extensions: { code: 'ALREADY_SHARED' },
          })
        return ctx.prisma.share.create({
          data: {
            invitedEmail: ctx.user?.email as string,
            wishListId: publicShare.wishListId,
            claimedWishIds: [],
          },
        })
      }),
    ),
  },
}
