import { WishList } from 'nexus-prisma'
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
        t.field(WishList.wishes)
    },
  }),
]
