const db = require('./db');

const get_actions = async (query) => {
  try{
    let { account_name, records_count, fetch_failed_action } = query;

    //ORDER BY at.receipt_global_sequence DESC this has to be added back

    let query_gen = `
    SELECT at.transaction_id, at.action_ordinal, at.act_account, at.act_name, at.act_data, at.timestamp, at.block_num,
    (SELECT ata.actor FROM chain.action_trace_authorization ata WHERE ata.block_num = at.block_num AND ata.transaction_id = at.transaction_id AND ata.action_ordinal = at.action_ordinal LIMIT 1),
    (SELECT ata.permission FROM chain.action_trace_authorization ata WHERE ata.block_num = at.block_num AND ata.transaction_id = at.transaction_id AND ata.action_ordinal = at.action_ordinal LIMIT 1)
    FROM chain.action_trace at
    WHERE at.creator_action_ordinal = 0 ${(account_name !== undefined) ? `AND at.act_account = '${account_name}'`:  '' }    
    LIMIT ${(records_count !== undefined) ? parseInt(records_count) :  100}`;

    let pool = db.getPool();
    const client = await pool.connect();
    try {
      const res = await client.query(query_gen);
      return res.rows;
    } finally {
      client.release();
    }
  }catch(err){
    console.log("caught exception ", err)
    return err;
  }
}

module.exports = get_actions;
