const CognitoExpress = require('cognito-express')

const cognitoExpress = new CognitoExpress({
  region: process.env.USER_POOL_REGION,
  cognitoUserPoolId: process.env.USER_POOL_ID,
  tokenUse: 'id',
  tokenExpiration: 3600000
})

const auth = (req, res, next) => {
  let accessTokenFromClient = req.headers.authorization && req.headers.authorization.replace('Bearer ', '')
  if (!accessTokenFromClient) return res.status(401).send('Access Token missing from header')
  cognitoExpress.validate(accessTokenFromClient, (err, response) => {
    if (err) return res.status(401).send(err)
    res.locals.user = response
    next()
  })
}

module.exports = auth
