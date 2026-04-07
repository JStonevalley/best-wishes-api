import { GraphQLError } from 'graphql'
import { logResolverInfo, requireAuth } from '../resolverTools'

export const wishResolvers = {
  Wish: {
    wishList: async (parent: any, _: any, ctx: any) => {
      if (parent.wishList) return parent.wishList
      if (!parent.wishListId) return null
      return ctx.prisma.wishList.findUnique({ where: { id: parent.wishListId } })
    },
  },
  Query: {
    getOwnWish: logResolverInfo(
      requireAuth(async (_: any, { id }: { id: string }, ctx) => {
        const wish = await ctx.prisma.wish.findUnique({
          where: { id },
          include: { wishList: true },
        })
        if (!wish)
          throw new GraphQLError('WishList not found', {
            extensions: { code: 'NOT_FOUND' },
          })
        if (ctx.user?.id !== wish.wishList?.userId)
          throw new GraphQLError('This user is not the owner of the wish', {
            extensions: { code: 'FORBIDDEN' },
          })
        return wish
      }),
    ),
  },
  Mutation: {
    createWish: logResolverInfo(
      requireAuth(
        async (
          _: any,
          {
            link,
            title,
            description,
            image,
            quantity,
            wishListId,
            price,
          }: {
            link?: string | null
            title: string
            description?: string | null
            image?: string | null
            quantity?: number | null
            wishListId: string
            price?: { amount: number; currency: string } | null
          },
          ctx,
        ) => {
          const wishList = await ctx.prisma.wishList.findUnique({
            where: { id: wishListId },
          })
          if (!wishList)
            throw new GraphQLError('WishList not found', {
              extensions: { code: 'NOT_FOUND' },
            })
          if (ctx.user?.id !== wishList.userId)
            throw new GraphQLError('This user is not the owner of the wish list', {
              extensions: { code: 'FORBIDDEN' },
            })
          const wish = await ctx.prisma.wish.create({
            data: {
              link,
              title,
              description,
              image,
              quantity: quantity || 1,
              wishListId,
              price,
            },
          })
          await ctx.prisma.wishList.update({
            where: { id: wishListId },
            data: {
              wishOrder: { push: wish.id },
            },
          })
          return wish
        },
      ),
    ),
    changeWish: logResolverInfo(
      requireAuth(
        async (
          _: any,
          {
            id,
            link,
            title,
            description,
            image,
            quantity,
            price,
          }: {
            id: string
            link?: string | null
            title: string
            description?: string | null
            image?: string | null
            quantity?: number | null
            price?: { amount: number; currency: string } | null
          },
          ctx,
        ) => {
          const wish = await ctx.prisma.wish.findUnique({
            where: { id },
            select: {
              wishList: {
                select: { userId: true },
              },
            },
          })
          if (!wish)
            throw new GraphQLError('WishList not found', {
              extensions: { code: 'NOT_FOUND' },
            })
          if (ctx.user?.id !== wish.wishList?.userId)
            throw new GraphQLError('This user is not the owner of the wish', {
              extensions: { code: 'FORBIDDEN' },
            })
          return ctx.prisma.wish.update({
            where: { id },
            data: {
              link,
              title,
              description,
              image,
              quantity: quantity || 1,
              price: price || null,
            },
          })
        },
      ),
    ),
    removeAWish: logResolverInfo(
      requireAuth(async (_: any, { id }: { id: string }, ctx) => {
        await ctx.prisma.wish.delete({ where: { id } })
        return id
      }),
    ),
  },
}
