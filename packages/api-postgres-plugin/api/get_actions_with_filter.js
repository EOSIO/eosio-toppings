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
  var table = `
    chain.action_trace
    WHERE
      ${action_filter !== undefined && account_name !== undefined
        ? action_filter === 'contract' ? `creator_action_oridnal = 0 AND act_account = '${account_name}'` : 
          action_filter === 'signed' ? `creator_action_oridnal = 0 AND actor = '${account_name}'` : 
          // action_filter === 'received' ? `receiver = 'eosio.token' AND act_account = 'eosio.token' AND act_name = 'transfer' AND token_to = '${account_name}'` : 
          // action_filter === 'sent' ? `receiver = 'eosio.token' AND act_account = 'eosio.token' AND act_name = 'transfer' AND token_from = '${account_name}'` : 
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

  let statement = `
    SELECT
      transaction_id AS id,
      block_num,
      timestamp,
      act_account,
      act_name,
      actor,
      receipt_global_sequence
    FROM
      ${table}
    ORDER BY
      receipt_global_sequence ${direction === 'next' ? 'DESC' : 'ASC'}
    LIMIT ${limit}
  `;

  let count_statement = `SELECT COUNT(transaction_id) AS count FROM ${table}`;


  if(action_filter === 'received'){
    statement = `
    SELECT
      chain.transfer_t.transaction_id AS id,
      chain.transfer_t.block_num AS block_num,
      chain.transfer_t.timestamp AS timestamp,
      chain.action_trace.act_account AS act_account,
      chain.action_trace.act_name AS act_name,
      chain.action_trace.actor AS actor,
      chain.action_trace.receipt_global_sequence AS receipt_global_sequence,
      chain.transfer_t.token_to AS token_to,
      chain.transfer_t.token_from AS token_from,
      chain.transfer_t.quantity_amount as amount,
      chain.transfer_t.quantity_symbol as symbol
    FROM chain.transfer_t
    INNER JOIN chain.action_trace ON chain.action_trace.transaction_id = chain.transfer_t.transaction_id
    WHERE
      token_to = '${account_name}'
    ORDER BY
      chain.action_trace.receipt_global_sequence ${direction === 'next' ? 'DESC' : 'ASC'}
    LIMIT ${limit}
    `

    count_statement = `SELECT COUNT(transaction_id) AS count FROM chain.transfer_t WHERE token_to = '${account_name}'`
  }


  if(action_filter === 'sent'){
    statement = `
    SELECT
      chain.transfer_t.transaction_id AS id,
      chain.transfer_t.block_num AS block_num,
      chain.transfer_t.timestamp AS timestamp,
      chain.action_trace.act_account AS act_account,
      chain.action_trace.act_name AS act_name,
      chain.action_trace.actor AS actor,
      chain.action_trace.receipt_global_sequence AS receipt_global_sequence,
      chain.transfer_t.token_to AS token_to,
      chain.transfer_t.token_from AS token_from,
      chain.transfer_t.quantity_amount as amount,
      chain.transfer_t.quantity_symbol as symbol
    FROM chain.transfer_t
    INNER JOIN chain.action_trace ON chain.action_trace.transaction_id = chain.transfer_t.transaction_id
    WHERE
      token_from = '${account_name}'
    ORDER BY
      chain.action_trace.receipt_global_sequence ${direction === 'next' ? 'DESC' : 'ASC'}
    LIMIT ${limit}
    `

    count_statement = `SELECT COUNT(transaction_id) AS count FROM chain.transfer_t WHERE token_from = '${account_name}'`
  }



  console.log(statement)

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
