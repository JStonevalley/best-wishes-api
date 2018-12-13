const r = require('rethinkdb')

const WISH_TABLE = process.env.WISH_TABLE

class WishDB {
  constructor (connectonP) {
    this.cp = connectonP
  }

  saveWishes (wishes) {
    return Promise.all(wishes.map(this.saveWish))
  }

  async saveWish (wish) {
    const conn = await this.cp
    const { id, ...wishContent } = wish
    const { first_error: firstError, generated_keys: generatedKeys, inserted } = id
      ? await r.table(WISH_TABLE).get(id).update(wishContent).run(conn)
      : await r.table(WISH_TABLE).insert(wishContent).run(conn)
    if (firstError) throw new Error(firstError)
    return { id: inserted ? generatedKeys[0] : id, ...wishContent }
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
    const conn = await this.cp
    return r.table(WISH_TABLE).get(id).delete().run(conn)
  }
}

module.exports = WishDB
