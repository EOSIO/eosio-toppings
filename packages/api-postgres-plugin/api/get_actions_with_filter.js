const db = require('./db');

const get_actions_with_filter = async (query) => {
  const { action_filter, account_name, max_rgs, page_size = 100, page_num = 1, show_data_size = "false" } = query;
  const table = `
    chain.action_trace AS a
    ${(action_filter === 'signed') ? `
      LEFT JOIN
        chain.action_trace_authorization AS b
      ON
        a.block_num = b.block_num AND a.transaction_id = b.transaction_id AND a.action_ordinal=b.action_ordinal
      ` : ''}
      WHERE
        a.creator_action_ordinal = 0
        ${(max_rgs !== undefined) ? `AND a.receipt_global_sequence <= ${max_rgs}` : ''}
        ${(action_filter === 'contract') ? `AND a.act_account = '${account_name}'` : ''}
        ${(action_filter === 'signed') ? `AND b.actor = '${account_name}'` : ''}
  `;

  const result_statement = `
    SELECT
      a.transaction_id AS id,
      a.block_num,
      a.timestamp,
      a.act_account,
      a.act_name,
      a.receipt_global_sequence
    FROM
      ${table}
    ORDER BY
      a.block_num DESC
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
