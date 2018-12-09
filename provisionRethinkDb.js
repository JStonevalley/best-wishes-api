const r = require('rethinkdb')
r.connect({ host: 'localhost', port: 28015 })
  .then(async (connection) => {
    try {
      console.log(`Drop db 'local': ${await r.dbDrop('local').run(connection)}`)
    } catch (error) {
      if (error.msg !== 'Database `local` does not exist.') throw (error)
    }
    console.log(`Create db 'local': ${await r.dbCreate('local').run(connection)}`)
    console.log(`Use db 'local': ${await connection.use('local')}`)
    console.log(`Create table 'user': ${JSON.stringify(await r.tableCreate('user', { primaryKey: 'email' }).run(connection))}`)
    console.log(`Create table 'wish': ${JSON.stringify(await r.tableCreate('wish').run(connection))}`)
    console.log(`Create index 'wishList' on table 'wish': ${JSON.stringify(await r.table('wish').indexCreate('wishList').run(connection))}`)
    console.log(`Create table 'wishList': ${JSON.stringify(await r.tableCreate('wishList').run(connection))}`)
    console.log(`Create index 'owner' on table 'wishList': ${JSON.stringify(await r.table('wishList').indexCreate('owner').run(connection))}`)
    console.log(`Close db connection`)
    await connection.close()
  })
