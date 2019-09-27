const db = require('./db');

const get_permissions_by_public_key = async query => {
  const { public_key } = query;
  const query_gen = `
  SELECT owner AS account, name AS permission, auth_keys AS public_key, last_updated
  FROM chain.permission
  WHERE permission.auth_keys::text LIKE '{"(${public_key}%';
  `
  let res;
  let error;
  try {
    res = await db.queryAsync(query_gen)
  }
  catch (err) {
    console.log('ERROR::DB:', err);
    error = err;
  }
  finally {
    return (
      !error && res && res.rows
        ? res.rows
        : []
    )
  }
}

module.exports = get_permissions_by_public_key;
