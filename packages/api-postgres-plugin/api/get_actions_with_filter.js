const db = require('./db');

const get_actions_with_filter = async (query) => {
  const { action_filter, account_name, max_rgs, page_size = 100, page_num = 1, show_data_size = "false" } = query;
  const table = `
    chain.action_trace
    WHERE  
      ${(action_filter === 'contract') ? `creator_action_ordinal = 0 AND act_account = '${account_name}'` : ''}
      ${(action_filter === 'signed') ? `creator_action_ordinal = 0 AND actor = '${account_name}'` : ''}
      ${(action_filter === 'received') ? `receiver = 'eosio.token' AND act_account = 'eosio.token' AND act_name = 'transfer' AND token_to = '${account_name}'` : ''}
      ${(action_filter === 'sent') ? `receiver = 'eosio.token' AND act_account = 'eosio.token' AND act_name = 'transfer' AND token_from = '${account_name}'` : ''}
      ${(max_rgs !== undefined) ? `AND receipt_global_sequence <= ${max_rgs}` : ''}
  `;

  const result_statement = `
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
      receipt_global_sequence DESC
    LIMIT ${page_size}
    ${(max_rgs !== undefined) ? `OFFSET ${page_size * (page_num - 1)}` : ''}
  `;

  const count_statement = `SELECT COUNT(*) AS count FROM ${table}`;
  
  try {
    const data = (await db.queryAsync(result_statement, "")).rows;
    const result = {
      action_filter,
      data,
      page_num,
      max_rgs: max_rgs !== undefined ? max_rgs : data.length > 0 ? data[0].receipt_global_sequence : ''
    };

    if (show_data_size !== "false") {
      result.count = (await db.queryAsync(count_statement, "")).rows[0].count;
    }

    return result;
  } catch (error) {
    console.error('Error executing get trx with action query::', error.stack);

    return {
      action_filter,
      page_num
    };
  }
}

module.exports = get_actions_with_filter;
