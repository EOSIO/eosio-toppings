const db = require('./db');

const get_permission_link = async query => {
  try {
    const { account_name, records_count } = query;
    const limit = Math.min(parseInt(records_count) || 100, 100);
    const statement = `
      SELECT account, code as contract, message_type as action_name, required_permission as permission
      FROM chain.permission_link
      ${account_name !== undefined ? `WHERE account = '${account_name}'` : ''}
      LIMIT ${limit}
    `;

    return (await db.queryAsync(statement, '')).rows;
  } catch (error) {
    console.error(
      'Caught exception in get permission link query: ',
      error.stack
    );
    return [];
  }
};

module.exports = get_permission_link;
