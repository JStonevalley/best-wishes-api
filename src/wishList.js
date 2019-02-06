const r = require('rethinkdb')
const yup = require('yup')
const WishDB = require('./wish')
const { flatten } = require('lodash')

const WISH_LIST_TABLE = process.env.WISH_LIST_TABLE
const WISH_LIST_SHARE_TABLE = process.env.WISH_LIST_SHARE_TABLE

const sharedToValidator = yup.object().shape({
  sharedTo: yup.array().of(yup.string().email())
})

const userEmailValidation = yup.object().shape({
  email: yup.string().email()
})

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

  async getWishListShares (wishList) {
    const conn = await this.cp
    return (await r.table(WISH_LIST_SHARE_TABLE).filter({ wishList }).run(conn)).toArray()
  }

  async getWishListsForOwner ({ email, withWishes, withShares }) {
    userEmailValidation.validateSync({ email })
    try {
      const conn = await this.cp
      const wishLists = await (await r.table(WISH_LIST_TABLE).filter({ owner: email }).run(conn)).toArray()
      const wishes = withWishes ? await this.wishDb.getWishesForWishLists(wishLists.map((wishList) => wishList.id)) : []
      const shares = withShares ? flatten(await Promise.all(wishLists.map(({ id }) => this.getWishListShares(id)))).filter(Boolean) : []
      return { wishLists, wishes, shares }
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
    sharedToValidator.validateSync({ sharedTo })
    try {
      return Promise.all(sharedTo.map((email) => this.saveWishListShare({ sharedTo: email, wishList: id })))
    } catch (error) {
      console.error(error)
      throw new WishListError(`Could not share wish list`)
    }
  }

  async saveWishListShare ({ sharedTo, wishList }) {
    try {
      const conn = await this.cp
      const [share] = await (await r.table(WISH_LIST_SHARE_TABLE).filter({ sharedTo, wishList }).run(conn)).toArray()
      if (!share) {
        const { first_error: firstError, generated_keys: generatedKeys, skipped } = await r.table(WISH_LIST_SHARE_TABLE).insert({ sharedTo, wishList }).run(conn)
        if (firstError) throw new Error(firstError)
        if (skipped) throw new Error('Skipped')
        return { id: generatedKeys[0], sharedTo, wishList }
      } else {
        return share
      }
    } catch (error) {
      console.error(error)
      throw new WishListError(`Could not save wish list share`)
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
    return { name: this.constructor.name, message: this.message, explanation: this.explanation || { error: this.message } }
  }
}

module.exports = WishListDB
