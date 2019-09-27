const { Pool } = require('pg')
const config = require('../env-config');

let pool;

const connectToDB = async (query) => {
  let { host, user, database, password, port, max } = query;

  return new Promise((resolve, reject) => { 
    pool = new Pool({
      host: host || config.db.host,
      user: user || config.db.user,
      database: database || config.db.database,
      password: password || config.db.password,
      port: port || config.db.port,
      max: max || config.db.max
    });    

    pool.on('connect', (client) => {
      console.log("Connection to DB successful");
      resolve("success");
    })
    pool.on('error', (err, client) => {
      console.log("DB connection error");
      reject("error");
    })
  })
}

module.exports = {
  query: (psql_query, params, callback) => {
    return pool.query(psql_query, params, callback)
  },
  queryAsync: async (psql_query, params) => new Promise((resolve, reject) => {
    pool.query(psql_query, params, (err, result) => err ? reject(err) : resolve(result) )
  }),
  connectToDB
}
