const serverless = require('serverless-http')
const express = require('express')
const bodyParser = require('body-parser')
const {getMetadata} = require('page-metadata-parser')
const domino = require('domino')
const fetch = require('isomorphic-fetch')
const uuidv1 = require('uuid/v1')
const yup = require('yup')
const validateUuid = require('uuid-validate')

yup.addMethod(yup.string, 'uuid', () => this.test((value) => validateUuid(value, v1) || this.createError({message: 'Invalid uuid/v1'})))

const app = express()
app.use(bodyParser.json())


const USERS_TABLE = process.env.USERS_TABLE 
const dynamoDb = process.env.IS_OFFLINE === 'true'
  ? new AWS.DynamoDB.DocumentClient({
    region: 'localhost',
    endpoint: 'http://localhost:8000'
  })
  : new AWS.DynamoDB.DocumentClient()
console.log(dynamoDb)

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


app.get('/users/:id', async ({params: {id}}, res) => {
  const params = {
    TableName: USERS_TABLE,
    Key: {
      id,
    },
  }
  try {
    const {Item} = await dynamoDb.get(params).promise()
    Item
      ? res.json(Item)
      : res.status(404).json({ error: "User not found" })
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: 'Could not get user' })
  }
})

const userValidation = yup.object().shape({
  id: yup.string().uuid().required(),
  email: yup.string().email().required(),
})

app.post('/users', function (req, res) {
    const { email } = req.body
    const newUser = {
      id: uuidv1(),
      email
    }
    try {
      userValidation.isValidSync(newUser)
    } catch (error) {
      res.status(400).json(error)
    }
    const params = {
      TableName: USERS_TABLE,
      Item: {
        userId: userId,
        name: name
      }
    }
    dynamoDb.put(params, (error) => {
      if (error) {
        console.log(error)
        res.status(400).json({ error: 'Could not create user' })
      }
      res.json({ userId, name })
    })
  })
  

module.exports = {
  handler: serverless(app)
}
