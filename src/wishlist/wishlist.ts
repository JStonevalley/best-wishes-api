import { GraphQLError } from 'graphql'
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
    publicShare: async (parent: any, _: any, ctx: any) => {
      if (parent.publicShare !== undefined) return parent.publicShare
      return ctx.prisma.publicShare.findUnique({ where: { wishListId: parent.id } })
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
  },
}
