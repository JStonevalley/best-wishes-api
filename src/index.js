const serverless = require('serverless-http')
const express = require('express')
const bodyParser = require('body-parser')
const { getMetadata } = require('page-metadata-parser')
const domino = require('domino')
const fetch = require('isomorphic-fetch')
const r = require('rethinkdb')
const WishDB = require('./wish')
const WishListDB = require('./wishList')
const yup = require('yup')

const app = express()
app.use(bodyParser.json())

const connectionP = (process.env.IS_OFFLINE === 'true'
  ? r.connect({ host: 'localhost', port: 28015 })
  : r.connect({ host: 'localhost', port: 28015 })
).then(async (conn) => {
  await conn.use(process.env.ENV)
  return conn
})

const wishDb = new WishDB(connectionP)
const wishListDb = new WishListDB(connectionP)

app.get('/', function (req, res) {
  res.json({ message: `Hello ${process.env.ENV}!` })
})

app.post('/fetch-page-meta', async ({ body: { url } }, res) => {
  url = url + (url.includes('?') ? '&' : '?') + '_escaped_fragment_='
  const response = await fetch(url, { method: 'GET', mode: 'no-cors' })
  const html = await response.text()
  const doc = domino.createWindow(html).document
  res.json(getMetadata(doc, url))
})

const userValidation = yup.object().shape({
  email: yup.string().email().required()
})

const USER_TABLE = process.env.USER_TABLE

app.get('/user/:email', async ({ params: { email } }, res) => {
  try {
    userValidation.validateSync({ email })
  } catch (error) {
    res.status(400).json(error)
    return
  }
  const conn = await connectionP
  try {
    const user = await r.table(USER_TABLE).get(email).run(conn)
    user
      ? res.json(user)
      : res.status(404).json({ error: 'User not found' })
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: 'Could not get user' })
  }
})

app.post('/user', async (req, res) => {
  const { email } = req.body
  const newUser = {
    email
  }
  try {
    userValidation.validateSync(newUser)
  } catch (error) {
    res.status(400).json(error)
    return
  }
  const conn = await connectionP
  try {
    const { first_error: firstError } = await r.table(USER_TABLE).insert(newUser).run(conn)
    if (firstError && firstError.startsWith('Duplicate primary key')) throw new yup.ValidationError('User already exists', newUser, 'email')
    if (firstError) throw new Error(firstError)
    res.json(newUser)
  } catch (error) {
    console.error(error)
    res.status(400).json({ error: 'Could not save user' })
  }
})

app.get('/wish-list', async ({ query: { email, withWishes } }, res) => {
  try {
    res.json(await wishListDb.getWishListsForOwner(email, withWishes))
  } catch (error) {
    res.status(400).json(error)
  }
})

app.post('/wish-list', async (req, res) => {
  const wishList = req.body
  try {
    res.json(await wishListDb.createWishList(wishList))
  } catch (error) {
    res.status(400).json(error)
  }
})

app.put('/wish-list/share', async (req, res) => {
  const { id, sharedTo } = req.body
  try {
    res.json(wishListDb.shareWishList(id, sharedTo))
  } catch (error) {
    res.status(400).json(error)
  }
})

app.put('/wish', async (req, res) => {
  const wish = req.body
  if (!wish.id) delete wish.id
  try {
    res.json(await wishDb.saveWish(wish))
  } catch (error) {
    res.status(400).json(error)
  }
})

app.delete('/wish/:id', async ({ params: { id } }, res) => {
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
