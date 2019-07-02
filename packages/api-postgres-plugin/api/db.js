const { Pool } = require('pg')

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  database: 'postgres',
  password: 'password',
  port: '5432'
});

pool.on('connect', (client) => {
  console.log("DB connected ");
})

pool.on('error', (err, client) => {
  if(err){
    console.log("DB Error ", err);
  }else{
    console.log("DB error client ", client);
  }
})

module.exports = {
  query: (psql_query, params, callback) => {
    return pool.query(psql_query, params, callback)
  }
}
