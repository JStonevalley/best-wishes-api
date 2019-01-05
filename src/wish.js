const r = require('rethinkdb')
const yup = require('yup')

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
  constructor (connectonP) {
    this.cp = connectonP
  }

  saveWishes (wishes) {
    return Promise.all(wishes.map(this.saveWish))
  }

  async saveWish (wish) {
    wishValidation.validateSync(wish)
    try {
      const conn = await this.cp
      const { id, ...wishContent } = wish
      const { first_error: firstError, generated_keys: generatedKeys, inserted } = id
        ? await r.table(WISH_TABLE).get(id).update(wishContent).run(conn)
        : await r.table(WISH_TABLE).insert(wishContent).run(conn)
      if (firstError) throw new Error(firstError)
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

  async getWish (id) {
    const conn = await this.cp
    return r.table(WISH_TABLE).get(id).run(conn)
  }

  async deleteWish (id) {
    yup.string().required().validateSync(id)
    try {
      const conn = await this.cp
      return r.table(WISH_TABLE).get(id).delete().run(conn)
    } catch (error) {
      console.error(error)
      throw new WishError(`Could not delete wish ${id}`)
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
    return { type: this.constructor.name, message: this.message, explanation: this.explanation || { _error: this.message } }
  }
}

module.exports = WishDB
