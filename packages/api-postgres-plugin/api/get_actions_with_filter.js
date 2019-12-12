const db = require('./db');

const get_actions_with_filter = async query => {
  const {
    action_filter,
    account_name,
    max_rgs,
    current_rgs,
    page_size,
    direction = 'next',
    show_data_size = 'false'
  } = query;
  const limit = Math.min(parseInt(page_size) || 100, 100);
  const table = `
    chain.action_trace
    WHERE
      ${action_filter !== undefined && account_name !== undefined
        ? action_filter === 'contract' ? `creator_action_ordinal = 0 AND act_account = '${account_name}'` : 
          action_filter === 'signed' ? `creator_action_ordinal = 0 AND actor = '${account_name}'` : 
          action_filter === 'received' ? `receiver = 'eosio.token' AND act_account = 'eosio.token' AND act_name = 'transfer' AND token_to = '${account_name}'` : 
          action_filter === 'sent' ? `receiver = 'eosio.token' AND act_account = 'eosio.token' AND act_name = 'transfer' AND token_from = '${account_name}'` : 
          'transaction_id IS NOT NULL'
        : 'transaction_id IS NOT NULL'}
      ${max_rgs !== undefined
        ? `${direction === 'next'
          ? `${current_rgs !== undefined
            ? `AND receipt_global_sequence < ${current_rgs}`
            : `AND receipt_global_sequence <= ${max_rgs}`
            }`
          : `AND receipt_global_sequence > ${current_rgs} AND receipt_global_sequence <= ${max_rgs}`
          }`
        : ''
      }
  `;

  const statement = `
    SELECT
      transaction_id AS id,
      block_num,
      timestamp,
      act_account,
      act_name,
      actor,
      receipt_global_sequence,
      token_to,
      token_from,
      amount,
      symbol
    FROM
      ${table}
    ORDER BY
      receipt_global_sequence ${direction === 'next' ? 'DESC' : 'ASC'}
    LIMIT ${limit}
  `;

  const count_statement = `SELECT COUNT(transaction_id) AS count FROM ${table}`;

  try {
    const data = (await db.queryAsync(statement, '')).rows;
    let count;

    if (show_data_size !== 'false') {
      count = (await db.queryAsync(count_statement, '')).rows[0].count;
    }

    if (direction === 'prev') {
      data.reverse();
    }
    return {
      action_filter,
      data,
      max_rgs:
        max_rgs !== undefined
          ? max_rgs
          : data.length > 0
          ? data[0].receipt_global_sequence
          : '',
      count
    };
  } catch (error) {
    console.error(
      'Caught exception in get action with filter query:',
      error.stack
    );
    return { action_filter };
  }
};

module.exports = get_actions_with_filter;
