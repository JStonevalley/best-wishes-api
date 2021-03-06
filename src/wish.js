const r = require('rethinkdb')
const yup = require('yup')
const DBUtils = require('./dbUtils')

const WISH_TABLE = process.env.WISH_TABLE

const wishValidation = yup.object().shape({
  id: yup.string().notRequired(),
  title: yup.string().required(),
  body: yup.string().notRequired(),
  link: yup.string().notRequired(),
  image: yup.string().notRequired(),
  wishList: yup.string().required()
})

class WishDB {
  constructor (connectionP) {
    this.cp = connectionP
    this.dbUtils = new DBUtils(connectionP)
  }

  saveWishes (wishes) {
    return Promise.all(wishes.map(this.saveWish))
  }

  async saveWish ({ wish, owner }) {
    wishValidation.validateSync(wish)
    try {
      const conn = await this.cp
      const { id, ...wishContent } = wish
      await this.dbUtils.getWishListById({ wishListId: wishContent.wishList, owner })
      const { first_error: firstError, generated_keys: generatedKeys, inserted } = id
        ? await r.table(WISH_TABLE).get(id).update(wishContent).run(conn)
        : await r.table(WISH_TABLE).insert(wishContent).run(conn)
      if (firstError) throw new Error(firstError)
      if (inserted) {
        await this.dbUtils.addNewWishIdToWishList({
          wishListId: wishContent.wishList,
          wishId: generatedKeys[0],
          owner
        })
      }
      return { id: inserted ? generatedKeys[0] : id, ...wishContent }
    } catch (error) {
      console.error(error)
      throw new WishError(`Could not save wish ${wish.id || ''}`)
    }
  }

  getWishes (ids) {
    return Promise.all(ids.map(this.getWish))
  }

  async getWishesForWishLists (wishListIds) {
    if (!wishListIds || wishListIds.length === 0) return []
    const conn = await this.cp
    return (await r.table(WISH_TABLE).getAll(...wishListIds, { index: 'wishList' }).run(conn)).toArray()
  }

  async getWishesForWishList (wishListId) {
    return this.getWishesForWishLists([wishListId])
  }

  async getWish (id) {
    const conn = await this.cp
    return r.table(WISH_TABLE).get(id).run(conn)
  }

  async deleteWish ({ wishId, owner }) {
    yup.string().required().validateSync(wishId)
    try {
      const conn = await this.cp
      const { wishList: wishListId } = await r.table(WISH_TABLE).get(wishId).run(conn)
      await this.dbUtils.getWishListById({ wishListId, owner })
      return r.table(WISH_TABLE).get(wishId).delete().run(conn)
    } catch (error) {
      console.error(error)
      throw new WishError(`Could not delete wish ${wishId}`)
    }
  }
}

class WishError extends Error {
  constructor (message, explanation) {
    super(message)
    if (explanation && typeof explanation !== 'object') throw new TypeError('explanation: should be type object')
    this.explanation = explanation
    Error.captureStackTrace(this, this.constructor)
  }

  toJSON () {
    return { name: this.constructor.name, message: this.message, explanation: this.explanation || { error: this.message } }
  }
}

module.exports = WishDB
