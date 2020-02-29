const r = require('rethinkdb')
const yup = require('yup')
const WishDB = require('./wish')
const DBUtils = require('./dbUtils')
const { flatten } = require('lodash')
const { renderEmailTemplate } = require('./email/render')
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
  owner: yup.string().email().required(),
  wishIds: yup.array().of(yup.string()).notRequired()
})

const sendShareEmail = async ({ origin, share, wishList }) => {
  const email = process.env.IS_OFFLINE ? 'jonas.stendahl@outlook.com' : share.sharedTo
  const params = {
    Destination: {
      ToAddresses: [email]
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: renderEmailTemplate(
            'wishListShare',
            {
              fromEmail: wishList.owner,
              wishListTitle: wishList.title,
              wishListLink: `${origin}/shares/wish-list/${share.id}`
            }
          ) // `<h1>${wishList.title}</h1><p>This wish list has been shared with you by ${wishList.owner}.  Make the best wishes come true through this link:</p><a href="${origin}/shares/wish-list/${share.id}">${wishList.title}</a>`
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: `You are invited to a wish list: ${wishList.title}`
      }
    },
    Source: 'Bestwishes <no-reply@transactional.bestwishes.io>'
  }
  try {
    const { MessageId } = await new AWS.SES({ apiVersion: '2010-12-01' }).sendEmail(params).promise()
    console.log('Email sent:', { MessageId, email })
  } catch (error) {
    console.error(error)
  }
}

const wishListForOwnerFilter = (email) => (wishList) => wishList('owner').eq(email).and(wishList.hasFields('removedAt').not())

class WishListDB {
  constructor (connectionP) {
    this.cp = connectionP
    this.wishDb = new WishDB(connectionP)
    this.dbUtils = new DBUtils(connectionP)
  }

  async getWishListShares (wishList) {
    const conn = await this.cp
    return (await r.table(WISH_LIST_SHARE_TABLE).filter({ wishList }).run(conn)).toArray()
  }

  async getWishListsForOwner ({ email, withWishes, withShares }) {
    userEmailValidation.validateSync({ email })
    try {
      const conn = await this.cp
      const wishLists = await (await r.table(WISH_LIST_TABLE).filter(wishListForOwnerFilter(email)).run(conn)).toArray()
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
    wishList.wishIds = []
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

  async removeWishList ({ wishListId, owner }) {
    try {
      const conn = await this.cp
      const removedAt = new Date()
      const wishList = await this.dbUtils.getWishListById({ wishListId, owner })
      await r.table(WISH_LIST_TABLE).get(wishListId).update({ removedAt }).run(conn)
      return { ...wishList, removedAt }
    } catch (error) {
      console.error(error)
      throw new WishListError(`Could not remove wish list`)
    }
  }

  async reorderWishesInWishList ({ wishListId, owner, wishIds }) {
    try {
      const conn = await this.cp
      const wishList = await this.dbUtils.getWishListById({ wishListId, owner })
      const wishes = await this.wishDb.getWishesForWishList(wishListId)
      if (wishIds.sort().join('') !== wishes.map((wish) => wish.id).sort().join('')) throw new WishListError('Cannot add or remove from wishIds')
      wishList.wishIds = wishIds
      await r.table(WISH_LIST_TABLE).get(wishListId).update(wishList).run(conn)
    } catch (error) {
      console.error(error)
      throw new WishListError(`Could not reorder wishes`)
    }
  }

  async removeShares (shares) {
    const conn = await this.cp
    return Promise.all(shares.map((id) => r.table(WISH_LIST_SHARE_TABLE).get(id).delete().run(conn)))
  }

  async resendShareEmail ({ origin, wishListId, email }) {
    try {
      const conn = await this.cp
      const wishList = await r.table(WISH_LIST_TABLE).get(wishListId).run(conn)
      const previousShares = await this.getWishListShares(wishListId)
      const share = previousShares.find((share) => email === share.sharedTo)
      if (!share) throw new WishListError('Not currently shared to that email')
      await sendShareEmail({ origin, share, wishList })
    } catch (error) {
      console.error(error)
      throw new WishListError(`Could not resend email`)
    }
  }

  async shareWishList ({ origin, wishListId, sharedTo, owner }) {
    sharedToValidator.validateSync({ sharedTo })
    try {
      const wishList = await this.dbUtils.getWishListById({ wishListId, owner })
      const previousShares = await this.getWishListShares(wishListId)
      const shareIdsToRemove = previousShares
        .filter((share) => !sharedTo.includes(share.sharedTo))
        .map((share) => share.id)
      await this.removeShares(shareIdsToRemove)
      const sharesToAdd = sharedTo
        .filter(email => !previousShares.find(share => share.sharedTo === email))
      console.log('shareWishList', { sharesToAdd, shareIdsToRemove, previousShares })
      const sharesAdded = await Promise.all(sharesToAdd.map((email) => this.saveWishListShare({ sharedTo: email, wishList: wishListId })))
      await Promise.all(sharesAdded.map(share => sendShareEmail({ origin, share, wishList })))
      return { shares: [...sharesAdded, ...previousShares], removedShares: shareIdsToRemove }
    } catch (error) {
      console.error(error)
      throw error instanceof WishListError ? error : new WishListError(`Could not get wish list share`)
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
      if (!share) throw new Error('No share with id:', shareId)
      const wishList = await r.table(WISH_LIST_TABLE).get(share.wishList).run(conn)
      if (wishList.removedAt) throw new WishListError('Wish list is removed by its creator.')
      const shares = [share, ...await this.getWishListShares(wishList.id)]
      const wishes = await this.wishDb.getWishesForWishList(wishList.id)
      return { shares, wishList, wishes }
    } catch (error) {
      console.error(error)
      throw error instanceof WishListError ? error : new WishListError(`Could not get wish list share`)
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
