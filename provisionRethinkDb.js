r = require('rethinkdb')
r.connect({ host: 'localhost', port: 28015 })
.then(async (connection) => {
  try {
    console.log(`Drop db 'local': ${await r.dbDrop('local').run(connection)}`)
  } catch (error) {
    if (error.msg !== 'Database `local` does not exist.') throw (error)
  }
  console.log(`Create db 'local': ${await r.dbCreate('local').run(connection)}`)
  console.log(`Use db 'local': ${await connection.use('local')}`)
  console.log(`Create table 'users': ${await r.tableCreate('users').run(connection)}`)
  console.log(`Add user to table 'users': ${await r.table('users').insert({email: 'jonas.stendahl@outlook.com' }).run(connection)}`)
  console.log(`Close db connection`)
  await connection.close()
})