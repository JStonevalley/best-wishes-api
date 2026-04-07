const r = require('rethinkdb')
const host = '90.226.230.18'
r.connect({ host: host, port: 28015, password: '9YB8KqEyak8LnRJB', db: 'bestWishes' })
  .then((connection) => {
    return connection.close()
  })
  .catch(async (_error) => {})
