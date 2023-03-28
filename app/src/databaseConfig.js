import setupKnex from 'knex'

export const config = {
    client: 'mysql',
    connection: {
      host : 'db',
      port : 3306,
      user : 'iacarvalho',
      password : '123456',
      database : 'database'
    },
    migrations: {
        directory: './src/migrations'
    }
  }

export const knex = setupKnex(config)