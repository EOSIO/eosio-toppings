const db = require('./db');

const get_actions = async query => {
  try {
    const { account_name, records_count } = query;
    const limit = Math.min(parseInt(records_count) || 100, 100);
    const statement = `
      SELECT transaction_id, action_ordinal, act_account, act_name, act_data, timestamp, block_num, actor, permission
      FROM chain.action_trace
      WHERE
        creator_action_ordinal = 0
        ${account_name !== undefined ? `AND act_account = '${account_name}'` : ''}  
      ORDER BY block_num DESC
      LIMIT ${limit}
    `;

    return (await db.queryAsync(statement, '')).rows;
  } catch (error) {
    console.error('Caught exception in get actions query: ', error.stack);
    return [];
  }
};

module.exports = get_actions;
