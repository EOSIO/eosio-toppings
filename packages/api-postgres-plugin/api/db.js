const { Pool } = require('pg')
const config = require('../env-config');

const pool = new Pool({
  host: config.db.host,
  user: config.db.user,
  database: config.db.database,
  password: config.db.password,
  port: config.db.port
});

pool.on('connect', (client) => {
  console.log("DB connected ");
})

pool.on('error', (err, client) => {
  if(err){
    console.log("DB Error ", err);
  }else{
    console.log("DB error client " , client);
  }
})

module.exports = {
  query: (psql_query, params, callback) => {
    return pool.query(psql_query, params, callback)
  }
}
