const db = require('./db');

const get_all_permissions = async query => {
  try {
    const { account_name, records_count, fetch_eosio } = query;
    // records_count is 200 here for explorer project
    const limit = Math.min(parseInt(records_count) || 200, 200);

    const statement = `
      (SELECT owner AS account, name AS permission, auth_keys AS public_key, last_updated 
      FROM chain.permission 
      WHERE 
        auth_keys::text <> '{}'::text
        ${account_name !== undefined ? `AND owner = '${account_name}'` : ''}
      ORDER BY block_num DESC
      LIMIT ${limit})
      ${fetch_eosio === 'true'
        ? `
      UNION
      SELECT owner AS account, name AS permission, auth_keys AS public_key, last_updated FROM chain.permission WHERE owner='eosio'
      `
        : ''
      }`;

    return (await db.queryAsync(statement, '')).rows;
  } catch (error) {
    console.error(
      'Caught exception in get all permissions query: ',
      error.stack
    );
    return [];
  }
};

module.exports = get_all_permissions;
