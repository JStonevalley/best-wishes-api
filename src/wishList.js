const r = require('rethinkdb')
const WishDB = require('./wish')

const WISH_LIST_TABLE = process.env.WISH_LIST_TABLE

class WishListDB {
  constructor (connectionP) {
    this.cp = connectionP
    this.wishDb = new WishDB(connectionP)
  }

  async getWishListsForOwner (email, withWishes) {
    const conn = await this.cp
    const wishLists = await (await r.table(WISH_LIST_TABLE).filter({ owner: email }).run(conn)).toArray()
    const wishes = withWishes ? await this.wishDb.getWishesForWishLists(wishLists.map((wishList) => wishList.id)) : []
    return { wishLists, wishes }
  }

  async createWishList (wishList) {
    const conn = await this.cp
    const { first_error: firstError, generated_keys: generatedKeys, skipped } = await r.table(WISH_LIST_TABLE).insert(wishList).run(conn)
    if (firstError) throw new Error(firstError)
    if (skipped) throw new Error('Skipped')
    return { id: generatedKeys[0], ...wishList }
  }

  async shareWishList (id, sharedTo) {
    const conn = await this.cp
    const { first_error: firstError, skipped } = await r.table(WISH_LIST_TABLE).get(id).update({ sharedTo }).run(conn)
    if (firstError) throw new Error(firstError)
    if (skipped) throw new Error('Skipped')
    return r.table(WISH_LIST_TABLE).get(id).run(conn)
  }
}

module.exports = WishListDB
