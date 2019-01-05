const r = require('rethinkdb')
const yup = require('yup')
const WishDB = require('./wish')

const WISH_LIST_TABLE = process.env.WISH_LIST_TABLE

const sharedToValidator = yup.array().of(yup.string().email())

const wishListCreationValidation = yup.object().shape({
  id: yup.string().notRequired(),
  title: yup.string().required(),
  owner: yup.string().email().required()
})

class WishListDB {
  constructor (connectionP) {
    this.cp = connectionP
    this.wishDb = new WishDB(connectionP)
  }

  async getWishListsForOwner (email, withWishes) {
    yup.string().email().required().validateSync(email)
    try {
      const conn = await this.cp
      const wishLists = await (await r.table(WISH_LIST_TABLE).filter({ owner: email }).run(conn)).toArray()
      const wishes = withWishes ? await this.wishDb.getWishesForWishLists(wishLists.map((wishList) => wishList.id)) : []
      return { wishLists, wishes }
    } catch (error) {
      console.error(error)
      throw new WishListError(`Could not get wish lists for ${email}`)
    }
  }

  async createWishList (wishList) {
    wishListCreationValidation.validateSync(wishList)
    try {
      const conn = await this.cp
      const { first_error: firstError, generated_keys: generatedKeys, skipped } = await r.table(WISH_LIST_TABLE).insert(wishList).run(conn)
      if (firstError) throw new Error(firstError)
      if (skipped) throw new Error('Skipped')
      return { id: generatedKeys[0], ...wishList }
    } catch (error) {
      console.error(error)
      throw new WishListError(`Could not save wish list`)
    }
  }

  async shareWishList (id, sharedTo) {
    sharedToValidator.validateSync(sharedTo)
    try {
      const conn = await this.cp
      const { first_error: firstError, skipped } = await r.table(WISH_LIST_TABLE).get(id).update({ sharedTo }).run(conn)
      if (firstError) throw new Error(firstError)
      if (skipped) throw new Error('Skipped')
      return r.table(WISH_LIST_TABLE).get(id).run(conn)
    } catch (error) {
      console.error(error)
      throw new WishListError(`Could not share wish list`)
    }
  }
}

class WishListError extends Error {
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

module.exports = WishListDB
