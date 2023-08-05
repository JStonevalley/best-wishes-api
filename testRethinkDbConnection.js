const r = require('rethinkdb')
const host = '90.226.230.18' // 90.226.230.18 192.168.1.20

console.log(`connectToDb Starting connection attempt to 90.226.230.18:28015-bestWishes`)
r.connect({ host: host, port: 28015, password: '9YB8KqEyak8LnRJB', db: 'bestWishes' })
  .then((connection) => {
    console.log(`connectToDb 90.226.230.18:28015-bestWishes connected`)
    return connection.close()
  })
  .catch(async (error) => {
    console.error('connectToDb', error)
  })