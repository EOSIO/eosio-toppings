const db = require('./db');

const get_permissions_by_public_key = async query => {
  try {
    const { public_key, records_count } = query;
    const limit = Math.min(parseInt(records_count) || 100, 100);
    const statement = `
      SELECT owner AS account, name AS permission, auth_keys AS public_key, last_updated
      FROM chain.permission
      ${public_key !== undefined ? `WHERE permission.auth_keys::text LIKE '%${public_key}%'` : ''}
      LIMIT ${limit}
    `;

    return (await db.queryAsync(statement, '')).rows;
  } catch (error) {
    console.error(
      'Caught exception in get permissions by public key query: ',
      error.stack
    );
    return [];
  }
};

module.exports = get_permissions_by_public_key;
