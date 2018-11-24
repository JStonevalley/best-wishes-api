const serverless = require('serverless-http')
const express = require('express')
const bodyParser = require('body-parser')
const {getMetadata} = require('page-metadata-parser')
const domino = require('domino')
const fetch = require('isomorphic-fetch')
const yup = require('yup')
r = require('rethinkdb')

const app = express()
app.use(bodyParser.json())

const connectionP = (process.env.IS_OFFLINE === 'true'
? r.connect({ host: 'localhost', port: 28015 })
: r.connect({ host: 'localhost', port: 28015 })
).then(async (conn) => {
  await conn.use(process.env.ENV)
  return conn
})

app.get('/', function (req, res) {
  res.json({message: `Hello ${process.env.ENV}!`})
})

app.post('/fetch-page-meta', async ({body: {url}}, res) => {
  url = url + (url.includes('?') ? '&' : '?') + '_escaped_fragment_='
  const response = await fetch(url, {method: 'GET', mode: 'no-cors'})
  const html = await response.text()
  const doc = domino.createWindow(html).document
  res.json(getMetadata(doc, url))
})

const userValidation = yup.object().shape({
  email: yup.string().email().required(),
})

const USER_TABLE = process.env.USER_TABLE

app.get('/user/:email', async ({params: {email}}, res) => {
  try {
    userValidation.validateSync({email})
  } catch (error) {
    res.status(400).json(error)
  }
  const conn = await connectionP
  try {
    const user = await r.table(USER_TABLE).get(email).run(conn)
    user
      ? res.json(user)
      : res.status(404).json({ error: "User not found" })
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
  }
  const conn = await connectionP
  try {
    const {first_error} = await r.table(USER_TABLE).insert(newUser).run(conn)
    if (first_error && first_error.startsWith('Duplicate primary key')) throw new yup.ValidationError('User already exists', newUser, 'email')
    if (first_error) throw new Error(first_error)
    res.json(newUser)
  } catch (error) {
    console.error(error)
    res.status(400).json({ error: 'Clould not save user'})
  }
})

const WISH_LIST_TABLE = process.env.WISH_LIST_TABLE

const wishValidation = yup.object().shape({
  id: yup.string().notRequired(),
  title: yup.string().required(),
  body: yup.string().notRequired(),
  link: yup.string().notRequired(),
  image: yup.string().notRequired()
})

const wishListValidation = yup.object().shape({
  id: yup.string().notRequired(),
  title: yup.string().required(),
  owner: yup.string().email().required(),
  wishes: yup.array().of(wishValidation)
})

app.get('/wish-list', async ({query: {email}}, res) => {
  try {
    userValidation.validateSync({email})
  } catch (error) {
    res.status(400).json(error)
  }
  const conn = await connectionP
  try {
    const wishLists = await (await r.table(WISH_LIST_TABLE).filter({owner: email}).run(conn)).toArray()
    const wishListsWithWishes = await Promise.all(
      wishLists
        .map(async (wishList) => {
          wishList.wishes = await getWishes(wishList.wishes)
          return wishList
        })
    )
    res.json(wishListsWithWishes)
    } catch (error) {
      console.log(error)
      res.status(400).json({ error: 'Could not get wish lists' })
  }
})

app.put('/wish-list', async (req, res) => {
  const {id, ...wishlist} = req.body
  try {
    wishListValidation.validateSync(wishlist)
  } catch (error) {
    res.status(400).json(error)
  }
  const conn = await connectionP
  try {
    const savedWishes = await saveWishes(wishlist.wishes)
    wishlist.wishes = savedWishes.map((wish) => wish.id)
    const {first_error, generated_keys, inserted, skipped} = id
      ? await r.table(WISH_LIST_TABLE).get(id).update(wishlist).run(conn)
      : await r.table(WISH_LIST_TABLE).insert(wishlist).run(conn)
    if (first_error) throw new Error(first_error)
    if (skipped) throw new Error('Skipped')
    const savedWishlist = {id: inserted ? generated_keys[0]: id, ...wishlist}
    savedWishlist.wishes = savedWishlist.wishes.map((wishId) => savedWishes.find((wish) => wish.id === wishId))
    res.json(savedWishlist)
  } catch (error) {
    console.error(error)
    res.status(400).json({ error: `Could not save wish list${id && ': ' + id}`})
  }
})

const WISH_TABLE = process.env.WISH_TABLE

const saveWishes = (wishes) =>  Promise.all(wishes.map(saveWish))

const saveWish = async (wish) => {
  const conn = await connectionP
  const {id, ...wishContent} = wish
  const {first_error, generated_keys, inserted} = id
    ? await r.table(WISH_TABLE).get(id).update(wishContent).run(conn)
    : await r.table(WISH_TABLE).insert(wishContent).run(conn)
  if (first_error) throw new Error(first_error)
  return {id: inserted ? generated_keys[0]: id, ...wishContent}
}

const getWishes = (ids) => Promise.all(ids.map(getWish))

const getWish = async (id) => {
  const conn = await connectionP
  return r.table(WISH_TABLE).get(id).run(conn)
}

module.exports = {
  handler: serverless(app)
}
