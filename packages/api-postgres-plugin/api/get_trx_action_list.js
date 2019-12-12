const db = require('./db');

const get_trx_action_list = async query => {
  try {
    const { account_name, records_count } = query;
    const limit = Math.min(parseInt(records_count) || 100, 100);
    const statement = `
      SELECT transaction_id AS id, block_num, timestamp, act_account, act_name, action_ordinal
      FROM chain.action_trace 
      WHERE creator_action_ordinal = 0 ${account_name !== undefined ? `AND act_account = '${account_name}'` : ''}
      ORDER BY block_num DESC
      LIMIT ${limit}
    `;

    return (await db.queryAsync(statement, '')).rows;
  } catch (error) {
    console.error(
      'Caught exception in trx with action list query: ',
      error.stack
    );
    return [];
  }
};

module.exports = get_trx_action_list;
