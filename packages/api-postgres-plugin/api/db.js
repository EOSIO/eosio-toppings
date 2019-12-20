const { Pool } = require('pg');
const defaultConfig = require('../env-config').db;

let pool;

/* NOTE: please disconnect first before reconnecting to a new database. */
const connectToDB = params =>
  new Promise((resolve, reject) => {
    let { host, user, database, password, port, max } = params;

    pool = new Pool({
      host: host || defaultConfig.host,
      user: user || defaultConfig.user,
      database: database || defaultConfig.database,
      password: password || defaultConfig.password,
      port: Number(port) || Number(defaultConfig.port),
      max: max || defaultConfig.max
    });

    pool.on('connect', () => {
      console.log('Connection to DB successful');
    });

    pool.on('error', error => {
      console.error('DB connection error: ', error.message);
    });

    pool.connect((error, client) => {
      if (error) {
        reject(error);
      } else {
        client.release();
        resolve();
      }
    });
  });

const disconnectFromDB = () => pool.end();

module.exports = {
  query: (psql_query, params, callback) => {
    return pool.query(psql_query, params, callback);
  },
  queryAsync: async (psql_query, params) =>
    new Promise((resolve, reject) => {
      pool.query(psql_query, params, (err, result) =>
        err ? reject(err) : resolve(result)
      );
    }),
  connectToDB,
  disconnectFromDB
};
