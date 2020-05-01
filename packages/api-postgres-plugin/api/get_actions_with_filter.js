const db = require('./db');

const get_actions_with_filter = async (query) => {
  const { action_filter, account_name, max_rgs, current_rgs, market_action="", page_size=100, direction = 'next', show_data_size = "false" } = query;
  console.log("query ", query)
  const table = `
    chain.action_trace
    WHERE
      ${(action_filter === 'marketplace') ? `creator_action_ordinal = 0 AND act_account = '${account_name}' AND act_name = '${market_action}'` : ''}
      ${(action_filter === 'contract') ? `creator_action_ordinal = 0 AND act_account = '${account_name}'` : ''}
      ${(action_filter === 'signed') ? `creator_action_ordinal = 0 AND actor = '${account_name}'` : ''}
      ${(action_filter === 'received') ? `receiver = 'eosio.token' AND act_account = 'eosio.token' AND act_name = 'transfer' AND token_to = '${account_name}'` : ''}
      ${(action_filter === 'sent') ? `receiver = 'eosio.token' AND act_account = 'eosio.token' AND act_name = 'transfer' AND token_from = '${account_name}'` : ''}
      ${(max_rgs !== undefined)
        ? `${(direction === 'next')
          ? `${(current_rgs !== undefined)
            ? `AND receipt_global_sequence < ${current_rgs}`
            : `AND receipt_global_sequence <= ${max_rgs}`}`
          : `AND receipt_global_sequence > ${current_rgs} AND receipt_global_sequence <= ${max_rgs}` }`
        : ''}
  `;

  const result_statement = `
    SELECT
      transaction_id AS id,
      block_num,
      timestamp,
      act_account,
      act_name,
      act_data,
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
    LIMIT ${page_size}
  `;

  const count_statement = `SELECT COUNT(*) AS count FROM ${table}`;

  try {
    const data = (await db.queryAsync(result_statement, "")).rows;
    if(direction === 'prev'){
      data.reverse();
    }
    const result = {
      action_filter,
      data,
      max_rgs: max_rgs !== undefined ? max_rgs : data.length > 0 ? data[0].receipt_global_sequence : ''
    };

    if (show_data_size !== "false") {
      result.count = (await db.queryAsync(count_statement, "")).rows[0].count;
    }

    return result;
  } catch (error) {
    console.error('Error executing get trx with action query::', error.stack);

    return {
      action_filter
    };
  }
}

module.exports = get_actions_with_filter;
