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

const app = express()

app.use(cors({
  origin: 'https://bestwishes.io',
  optionsSuccessStatus: 204 // Using 200 will increase compability. Some legacy browsers (IE11, various SmartTVs) choke on 204
}))

app.use(bodyParser.json())

const privateRoute = express.Router()
privateRoute.use(require('./auth'))
app.use('/private', privateRoute)

const connectionP = r.connect({ host: process.env.DATABASE_HOST, port: 28015, password: process.env.DATABASE_PASSWORD, db: 'bestWishes' })

const wishDb = new WishDB(connectionP)
const wishListDb = new WishListDB(connectionP)

app.post('/fetch-page-meta', async ({ body: { url } }, res) => {
  url = url + (url.includes('?') ? '&' : '?') + '_escaped_fragment_='
  const response = await fetch(url, { method: 'GET', mode: 'no-cors' })
  const html = await response.text()
  const doc = domino.createWindow(html).document
  res.json(getMetadata(doc, url))
})

app.get('/share/:id', async ({ params: { id } }, res) => {
  res.json(await wishListDb.getWishListFromShareId(id))
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

privateRoute.put('/wish-list/share/:id', async ({ params: { id }, body: { sharedTo }, headers: { origin } }, res) => {
  try {
    res.json(await wishListDb.shareWishList({ origin, id, sharedTo }))
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
    res.json(await wishDb.saveWish(wish))
  } catch (error) {
    res.status(400).json(error)
  }
})

privateRoute.delete('/wish/:id', async ({ params: { id } }, res) => {
  try {
    await wishDb.deleteWish(id)
    res.json({ id })
  } catch (error) {
    res.status(400).json(error)
  }
})

module.exports = {
  handler: serverless(app)
}
