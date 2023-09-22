import { PrismaClient } from '@prisma/client'
import { prop } from 'ramda'

export const syncWishOrder =
  (prisma: PrismaClient) =>
  async ({ wishOrder, wishListId }: { wishOrder: string[] | undefined; wishListId: string }) => {
    const wishIdsInList = (
      await prisma.wish.findMany({
        where: {
          wishListId: wishListId,
        },
        select: {
          id: true,
        },
      })
    ).map(prop('id'))
    const ensuredWishOrder =
      wishOrder != null
        ? wishOrder
        : await prisma.wishList
            .findFirst({ where: { id: wishListId }, select: { wishOrder: true } })
            .then((wishList) => wishList?.wishOrder || [])
    return prisma.wishList.update({
      where: {
        id: wishListId,
      },
      data: {
        wishOrder: wishIdsInList.sort((a, b) => {
          const aOrder = ensuredWishOrder.indexOf(a) > -1 ? ensuredWishOrder.indexOf(a) : wishIdsInList.length
          const bOrder = ensuredWishOrder.indexOf(b) > -1 ? ensuredWishOrder.indexOf(b) : wishIdsInList.length
          return aOrder - bOrder
        }),
      },
    })
  }

export const createWishList =
  (prisma: PrismaClient) =>
  async ({ headline, userId }: { headline: string; userId: string }) => {
    return prisma.wishList.create({
      data: { headline, userId, wishOrder: [] },
    })
  }
