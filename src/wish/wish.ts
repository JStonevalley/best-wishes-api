import { Wish } from 'nexus-prisma'
import { objectType } from 'nexus'

const ValueObject = objectType({
  name: 'ValueObject',
  definition(t) {
    t.int('amount', { description: 'Amount in minor units' })
    t.string('currency', { description: 'Currency 3 letter identifier according to ISO 4217' })
  },
})

export const wishTypes = [
  ValueObject,
  objectType({
    name: Wish.$name,
    description: Wish.$description,
    definition(t) {
      t.field(Wish.id),
        t.field(Wish.createdAt),
        t.field(Wish.updatedAt),
        t.field(Wish.title),
        t.field(Wish.description),
        t.field(Wish.price),
        t.field(Wish.quantity),
        t.field(Wish.link),
        t.field(Wish.image),
        t.field(Wish.wishList)
    },
  }),
]
