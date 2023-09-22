import { PrismaClient, User } from '@prisma/client'
import { readFile } from 'fs/promises'
import path from 'path'
import { createWishList, syncWishOrder } from '../wishlist/utils'

export const migrateV1Data = (prisma: PrismaClient) => async (user: User) => {
  const migrationData = JSON.parse(await readFile(path.join(__dirname, 'migration.json'), 'utf-8'))
  if (migrationData[user.email]) {
    for (const { headline, archivedAt, wishes } of migrationData[user.email]) {
      const wishListId = (await createWishList(prisma)({ headline, userId: user.id })).id
      if (archivedAt) {
        await prisma.wishList.update({
          where: {
            id: wishListId,
          },
          data: { archivedAt: new Date(archivedAt) },
        })
      }
      await prisma.wish.createMany({
        data: wishes.map((wish: any) => ({ ...wish, wishListId })),
      })
      await syncWishOrder(prisma)({ wishOrder: undefined, wishListId })
    }
  }
}
