const db = require('./db');

const get_permission_by_public_key = async query => {
  const { public_key } = query;
  const query_gen = `
  SELECT owner AS account, name AS permission, auth_keys AS public_key, last_updated
  FROM chain.permission
  WHERE permission.auth_keys::text LIKE '{"(${public_key}%';
  `
  let client;
  let res;
  let error;
  try {
    const pool = db.getPool();
    client = await pool.connect();
    res = await client.query(query_gen);
  }
  catch (err) {

    console.log('ERROR::DB:', err);
    error = err;
  }
  finally {
    client && client.release();
    if (res && res.rows) {
      return res.rows;
    }
    // default to return nothing
    return [];
  }
}

module.exports = get_permission_by_public_key;
