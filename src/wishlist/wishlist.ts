import { WishList, Share } from 'nexus-prisma'
import { objectType } from 'nexus'

export const wishlistTypes = [
  objectType({
    name: WishList.$name,
    description: WishList.$description,
    definition(t) {
      t.field(WishList.id),
        t.field(WishList.createdAt),
        t.field(WishList.updatedAt),
        t.field(WishList.headline),
        t.field(WishList.user),
        t.field(WishList.wishes),
        t.field(WishList.shares)
    },
  }),
  objectType({
    name: Share.$name,
    description: Share.$description,
    definition(t) {
      t.field(Share.id),
        t.field(Share.createdAt),
        t.field(Share.updatedAt),
        t.field(Share.invitedEmail),
        t.field(Share.wishList)
    },
  }),
]
