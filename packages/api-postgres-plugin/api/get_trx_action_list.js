const db = require('./db');

const get_trx_action_list = async (query) => {
  try{
    let { records_count, account_name, no_limit = false} = query;
    let query_gen = `
      SELECT transaction_id AS id, block_num, timestamp, act_account, act_name
      FROM chain.action_trace 
      WHERE creator_action_ordinal = 0 ${(account_name !== undefined) ? `AND act_account = '${account_name}'`:  '' }
      ORDER BY block_num DESC      
      ${ no_limit ? '' : `LIMIT ${(records_count !== undefined) ? parseInt(records_count) : 100} `}`;
         
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

module.exports = get_trx_action_list;
