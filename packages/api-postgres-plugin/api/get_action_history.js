const db = require('./db');

const get_action_history = async query => {
  try {
    const { account_name, actor_name, records_count } = query;
    const limit = Math.min(parseInt(records_count) || 100, 100);
    const statement = `
      ${account_name !== undefined
        ? `
        SELECT transaction_id, action_ordinal, act_account, act_name, act_data, timestamp, block_num, actor, permission
        FROM chain.action_trace
        WHERE creator_action_ordinal = 0 AND act_account = ANY('{${account_name}}')
        `
        : ``
      }
      ${account_name !== undefined && actor_name !== undefined ? `UNION` : ``}
      ${actor_name !== undefined
        ? `
        SELECT transaction_id, action_ordinal, act_account, act_name, act_data, timestamp, block_num, actor, permission
        FROM chain.action_trace
        WHERE creator_action_ordinal = 0 AND actor = ANY('{${actor_name}}')
        `
        : ``
      }
        ORDER BY block_num DESC
        LIMIT ${limit}
    `;

    return (await db.queryAsync(statement, '')).rows;
  } catch (error) {
    console.error(
      'Caught exception in get action history query: ',
      error.stack
    );
    return [];
  }
};

module.exports = get_action_history;
