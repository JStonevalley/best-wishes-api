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


const USER_TABLE = process.env.USER_TABLE

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

app.get('/user/:email', async ({params: {email}}, res) => {
  console.log(email)
  try {
    userValidation.validateSync({email})
  } catch (error) {
    res.status(400).json(error)
  }
  const conn = await connectionP
  try {
    const data = r.table(USER_TABLE).get(email).run(conn)
    data
      ? res.json(data)
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
    res.json(newUser)
  } catch (error) {
    console.error(error)
    res.status(400).json(error)
  }
})
  

module.exports = {
  handler: serverless(app)
}
