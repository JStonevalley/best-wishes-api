const r = require('rethinkdb')
const yup = require('yup')
const WishDB = require('./wish')
const { flatten } = require('lodash')
var AWS = require('aws-sdk')

if (process.env.IS_OFFLINE) AWS.config.credentials = new AWS.SharedIniFileCredentials({ profile: 'best-wishes-api' })

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

const sendShareEmail = async ({ share, wishList }) => {
  const params = {
    Destination: {
      ToAddresses: [share.sharedTo]
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: `<h1>${wishList.title}</h1><p>This wish list has been shared with you by ${wishList.owner}. You and all the other gift givers will be able to indicate to each other what you have bought. Hopefully this leads to stressfree gift shopping and no duplicates :) Make the best wishes come true through this link:</p><a href="http://localhost:3000/shares/wish-list/${share.id}">${wishList.title}</a>`
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: `You are invited to a wish list: ${wishList.title}`
      }
    },
    Source: 'no-reply@transactional.bestwishes.io'
  }
  try {
    const { MessageId } = await new AWS.SES({ apiVersion: '2010-12-01' }).sendEmail(params).promise()
    console.log(MessageId)
  } catch (error) {
    console.error(error)
  }
}

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

  async removeShares (shares) {
    const conn = await this.cp
    return Promise.all(shares.map((id) => r.table(WISH_LIST_SHARE_TABLE).get(id).delete().run(conn)))
  }

  async shareWishList (id, sharedTo) {
    sharedToValidator.validateSync({ sharedTo })
    try {
      const conn = await this.cp
      const wishList = await r.table(WISH_LIST_TABLE).get(id).run(conn)
      const previousShares = await this.getWishListShares(id)
      await this.removeShares(previousShares
        .filter((share) => !sharedTo.includes(share.sharedTo))
        .map((share) => share.id))
      const allShares = await Promise.all(sharedTo.map((email) => this.saveWishListShare({ sharedTo: email, wishList: id })))
      Promise.all(allShares.filter(({ sharedTo }) => !previousShares.map(share => share.sharedTo).includes(sharedTo)).map(share => sendShareEmail({ share, wishList })))
      return allShares
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
        const { first_error: firstError, generated_keys: generatedKeys, skipped } = await r.table(WISH_LIST_SHARE_TABLE).insert({ sharedTo, wishList, grantedWishes: [] }).run(conn)
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

  async getWishListFromShareId (shareId) {
    try {
      const conn = await this.cp
      const share = await r.table(WISH_LIST_SHARE_TABLE).get(shareId).run(conn)
      const wishList = await r.table(WISH_LIST_TABLE).get(share.wishList).run(conn)
      const shares = [share, ...await this.getWishListShares(wishList.id)]
      const wishes = await this.wishDb.getWishesForWishList(wishList.id)
      return { shares, wishList, wishes }
    } catch (error) {
      console.error(error)
      throw new WishListError(`Could not get wish list share`)
    }
  }

  async grantWishInWishListShare ({ shareId, wishId }) {
    try {
      const conn = await this.cp
      let share = await r.table(WISH_LIST_SHARE_TABLE).get(shareId).run(conn)
      if (!share.grantedWishes || !share.grantedWishes.includes(wishId)) {
        if (!share.grantedWishes) share.grantedWishes = []
        share.grantedWishes.push(wishId)
        const { first_error: firstError } = await r.table(WISH_LIST_SHARE_TABLE).get(shareId).update(share).run(conn)
        if (firstError) throw new Error(firstError)
      }
      return share
    } catch (error) {
      console.error(error)
      throw new WishListError(`Could not grant wish`)
    }
  }

  async revokeWishGrantInWishListShare ({ shareId, wishId }) {
    try {
      const conn = await this.cp
      let share = await r.table(WISH_LIST_SHARE_TABLE).get(shareId).run(conn)
      if (share.grantedWishes.includes(wishId)) {
        share.grantedWishes = share.grantedWishes.filter((wish) => wish !== wishId)
        const { first_error: firstError } = await r.table(WISH_LIST_SHARE_TABLE).get(shareId).update(share).run(conn)
        if (firstError) throw new Error(firstError)
      }
      return share
    } catch (error) {
      console.error(error)
      throw new WishListError(`Could not revoke wish`)
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
