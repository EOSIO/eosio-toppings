const { Pool } = require('pg')
const config = require('../env-config');

let pool;

pool = new Pool({
  host: config.db.host,
  user: config.db.user,
  database: config.db.database,
  password: config.db.password,
  port: config.db.port,
  max: 30
});

const connectToDB = () => {
  pool = new Pool({
    host: config.db.host,
    user: config.db.user,
    database: config.db.database,
    password: config.db.password,
    port: config.db.port,
    max: 30
  });
}

const getPool = () => {
  return pool;
}

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
  connectToDB,
  getPool
}
