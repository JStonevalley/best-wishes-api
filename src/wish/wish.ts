import { Wish as WishSchemaTemplate } from 'nexus-prisma'
import { inputObjectType, intArg, mutationField, nonNull, objectType, queryField, stringArg } from 'nexus'
import { GraphQLError } from 'graphql'
import { logResolverInfo, requireAuth } from '../resolverTools'
import { join } from 'path'

const ValueObject = objectType({
  name: 'ValueObject',
  definition(t) {
    t.nonNull.int('amount', { description: 'Amount in minor units' })
    t.nonNull.string('currency', { description: 'Currency 3 letter identifier according to ISO 4217' })
  },
})

const ValueObjectInput = inputObjectType({
  name: 'ValueObjectInput',
  definition(t) {
    t.nonNull.int('amount', { description: 'Amount in minor units' })
    t.nonNull.string('currency', { description: 'Currency 3 letter identifier according to ISO 4217' })
  },
})

export const wishTypes = [
  ValueObject,
  ValueObjectInput,
  objectType({
    name: WishSchemaTemplate.$name,
    sourceType: {
      module: join(__dirname, '..', '..', 'node_modules', '@prisma', 'client', 'index.d.ts'),
      export: 'Wish',
    },
    description: WishSchemaTemplate.$description,
    definition(t) {
      t.field(WishSchemaTemplate.id),
        t.field(WishSchemaTemplate.createdAt),
        t.field(WishSchemaTemplate.updatedAt),
        t.field(WishSchemaTemplate.title),
        t.field(WishSchemaTemplate.description),
        t.field({
          ...WishSchemaTemplate.price,
          resolve: (parent) => parent.price,
        }),
        t.field(WishSchemaTemplate.quantity),
        t.field(WishSchemaTemplate.link),
        t.field(WishSchemaTemplate.image),
        t.field(WishSchemaTemplate.wishList)
    },
  }),
]

export const wishQueryFields = [
  queryField('getOwnWish', {
    type: WishSchemaTemplate.$name,
    args: {
      id: nonNull(stringArg()),
    },
    resolve: logResolverInfo(
      requireAuth(async (_, { id }: { id: string }, ctx) => {
        const wish = await ctx.prisma.wish.findUnique({
          where: {
            id,
          },
          include: {
            wishList: true,
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
        return wish
      })
    ),
  }),
]

export const wishMutationFields = [
  mutationField('createWish', {
    type: WishSchemaTemplate.$name,
    args: {
      link: stringArg(),
      title: nonNull(stringArg()),
      description: stringArg(),
      price: ValueObjectInput,
      image: stringArg(),
      quantity: intArg(),
      wishListId: nonNull(stringArg()),
    },
    resolve: logResolverInfo(
      requireAuth(async (_, { link, title, description, image, quantity, wishListId, price }, ctx) => {
        const wishList = await ctx.prisma.wishList.findUnique({
          where: {
            id: wishListId,
          },
        })
        if (!wishList)
          throw new GraphQLError('WishList not found', {
            extensions: { code: 'NOT_FOUND' },
          })
        if (ctx.user?.id !== wishList.userId)
          throw new GraphQLError('This user is not the owner of the wish list', {
            extensions: { code: 'FORBIDDEN' },
          })
        return ctx.prisma.wish.create({
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
      })
    ),
  }),
]
