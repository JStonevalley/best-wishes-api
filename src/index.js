const serverless = require('serverless-http')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { getMetadata } = require('page-metadata-parser')
const domino = require('domino')
const fetch = require('isomorphic-fetch')
const r = require('rethinkdb')
const WishDB = require('./wish')
const WishListDB = require('./wishList')

// Deploy 6

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const app = express()

app.use(cors())

app.use(bodyParser.json())

const privateRoute = express.Router()
privateRoute.use(require('./auth'))
app.use('/private', privateRoute)

const connectToDb = (retriesAvailable, retries = 1) => {
  console.log('connectToDb Starting connection attempt:', retries)
  return r.connect({ host: process.env.DATABASE_HOST, port: 28015, password: process.env.DATABASE_PASSWORD, db: 'bestWishes' })
    .then((connection) => {
      console.log(`connectToDb ${process.env.DATABASE_HOST}:28015-bestWishes connected`)
      return connection
    })
    .catch(async (error) => {
      console.error('connectToDb', retries, error)
      if (retries < retriesAvailable) {
        await sleep(1000)
        return connectToDb(retriesAvailable, retries + 1)
      } else {
        return Promise.reject(error)
      }
    })
}

const connectionP = connectToDb(5)

const wishDb = new WishDB(connectionP)
const wishListDb = new WishListDB(connectionP)

app.post('/fetch-page-meta', async ({ body: { url } }, res) => {
  try {
    url = url + (url.includes('?') ? '&' : '?') + '_escaped_fragment_='
    const response = await fetch(url, { method: 'GET', mode: 'no-cors' })
    const html = await response.text()
    const doc = domino.createWindow(html).document
    res.json(getMetadata(doc, url))
  } catch (error) {
    console.error(error)
    res.status(500).json(error)
  }
})

app.get('/share/:id', async ({ params: { id } }, res) => {
  try {
    res.json(await wishListDb.getWishListFromShareId(id))
  } catch (error) {
    res.status(400).json(error)
  }
})

app.put('/share/wish/grant', async ({ body: { shareId, wishId } }, res) => {
  res.json(await wishListDb.grantWishInWishListShare({ shareId, wishId }))
})

app.put('/share/wish/revoke', async ({ body: { shareId, wishId } }, res) => {
  res.json(await wishListDb.revokeWishGrantInWishListShare({ shareId, wishId }))
})

privateRoute.get('/wish-list', async ({ query: { withWishes, withShares } }, res) => {
  try {
    res.json(await wishListDb.getWishListsForOwner({ email: res.locals.user.email, withWishes, withShares }))
  } catch (error) {
    res.status(400).json(error)
  }
})

privateRoute.post('/wish-list', async (req, res) => {
  const wishList = req.body
  wishList.owner = res.locals.user.email
  try {
    res.json(await wishListDb.createWishList(wishList))
  } catch (error) {
    res.status(400).json(error)
  }
})

privateRoute.delete('/wish-list/:wishListId', async ({ params: { wishListId } }, res) => {
  try {
    res.json(await wishListDb.removeWishList({ wishListId, owner: res.locals.user.email }))
  } catch (error) {
    res.status(400).json(error)
  }
})

privateRoute.put('/wish-list/share/:wishListId', async ({ params: { wishListId }, body: { sharedTo }, headers: { origin } }, res) => {
  try {
    res.json(await wishListDb.shareWishList({ origin, wishListId, sharedTo, owner: res.locals.user.email }))
  } catch (error) {
    res.status(400).json(error)
  }
})

privateRoute.post('/wish-list/share/resend/:wishListId', async ({ params: { wishListId }, body: { email }, headers: { origin } }, res) => {
  try {
    await wishListDb.resendShareEmail({ origin, wishListId, email })
    res.send(true)
  } catch (error) {
    res.status(400).json(error)
  }
})

privateRoute.put('/wish', async (req, res) => {
  const wish = req.body
  if (!wish.id) delete wish.id
  try {
    res.json(await wishDb.saveWish({ wish, owner: res.locals.user.email }))
  } catch (error) {
    res.status(400).json(error)
  }
})

privateRoute.delete('/wish/:wishId', async ({ params: { wishId } }, res) => {
  try {
    await wishDb.deleteWish({ wishId, owner: res.locals.user.email })
    res.json({ id: wishId })
  } catch (error) {
    res.status(400).json(error)
  }
})

privateRoute.put('/wish-list/reorder/:wishListId', async ({ params: { wishListId }, body: { wishIds } }, res) => {
  try {
    res.json(await wishListDb.reorderWishesInWishList({ wishListId, wishIds, owner: res.locals.user.email }))
  } catch (error) {
    res.status(400).json(error)
  }
})

module.exports = {
  handler: serverless(app)
}
