const serverless = require('serverless-http')
const express = require('express')
const bodyParser = require('body-parser')
const { getMetadata } = require('page-metadata-parser')
const domino = require('domino')
const fetch = require('isomorphic-fetch')
const yup = require('yup')
const r = require('rethinkdb')
const WishDB = require('./wish')

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

const WISH_LIST_TABLE = process.env.WISH_LIST_TABLE

const wishValidation = yup.object().shape({
  id: yup.string().notRequired(),
  title: yup.string().required(),
  body: yup.string().notRequired(),
  link: yup.string().notRequired(),
  image: yup.string().notRequired(),
  wishList: yup.string().required()
})

const wishListValidation = yup.object().shape({
  id: yup.string().notRequired(),
  title: yup.string().required(),
  owner: yup.string().email().required()
})

app.get('/wish-list', async ({ query: { email, withWishes } }, res) => {
  try {
    userValidation.validateSync({ email })
  } catch (error) {
    res.status(400).json(error)
    return
  }
  const conn = await connectionP
  try {
    const wishLists = await (await r.table(WISH_LIST_TABLE).filter({ owner: email }).run(conn)).toArray()
    const wishes = withWishes ? await wishDb.getWishesForWishLists(wishLists.map((wishList) => wishList.id)) : []
    res.json({ wishLists, wishes })
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: 'Could not get wish lists' })
  }
})

app.put('/wish-list', async (req, res) => {
  const { id, ...wishlist } = req.body
  try {
    wishListValidation.validateSync(wishlist)
  } catch (error) {
    res.status(400).json(error)
    return
  }
  const conn = await connectionP
  try {
    const { first_error: firstError, generated_keys: generatedKeys, inserted, skipped } = id
      ? await r.table(WISH_LIST_TABLE).get(id).update(wishlist).run(conn)
      : await r.table(WISH_LIST_TABLE).insert(wishlist).run(conn)
    if (firstError) throw new Error(firstError)
    if (skipped) throw new Error('Skipped')
    const savedWishlist = { id: inserted ? generatedKeys[0] : id, ...wishlist }
    res.json(savedWishlist)
  } catch (error) {
    console.error(error)
    res.status(400).json({ error: `Could not save wish list${id && ': ' + id}` })
  }
})

app.put('/wish', async (req, res) => {
  const wish = req.body
  if (!wish.id) delete wish.id
  try {
    wishValidation.validateSync(wish)
  } catch (error) {
    res.status(400).json(error)
    return
  }
  try {
    const newWish = await wishDb.saveWish(wish)
    res.json(newWish)
  } catch (error) {
    console.error(error)
    res.status(400).json({ error: `Could not save wish` })
  }
})

module.exports = {
  handler: serverless(app)
}
