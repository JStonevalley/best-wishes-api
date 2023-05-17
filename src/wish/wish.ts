import { Wish as WishSchemaTemplate } from 'nexus-prisma'
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
    name: WishSchemaTemplate.$name,
    description: WishSchemaTemplate.$description,
    definition(t) {
      t.field(WishSchemaTemplate.id),
        t.field(WishSchemaTemplate.createdAt),
        t.field(WishSchemaTemplate.updatedAt),
        t.field(WishSchemaTemplate.title),
        t.field(WishSchemaTemplate.description),
        t.field(WishSchemaTemplate.price),
        t.field(WishSchemaTemplate.quantity),
        t.field(WishSchemaTemplate.link),
        t.field(WishSchemaTemplate.image),
        t.field(WishSchemaTemplate.wishList)
    },
  }),
]
