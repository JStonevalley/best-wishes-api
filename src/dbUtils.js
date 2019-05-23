const WISH_LIST_TABLE = process.env.WISH_LIST_TABLE
const r = require('rethinkdb')

class DBUtilsError extends Error {
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

class DBUtils {
  constructor (connectonP) {
    this.cp = connectonP
  }

  async getWishListById ({ wishListId, owner }) {
    const conn = await this.cp
    const wishList = await r.table(WISH_LIST_TABLE).get(wishListId).run(conn)
    if (wishList.removedAt) throw new DBUtilsError('Wish list is removed by its creator.')
    if (wishList.owner !== owner) throw new DBUtilsError('Only owner can get wish list.')
    return wishList
  }
}

module.exports = DBUtils
