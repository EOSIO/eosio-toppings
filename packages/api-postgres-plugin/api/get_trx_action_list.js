const db = require('./db');

const get_trx_action_list = async (query) => {
  try{
    let { records_count, account_name, no_limit = false} = query;
    let query_gen = `
      SELECT transaction_id AS id, block_num, timestamp, act_account, act_name
      FROM chain.action_trace 
      WHERE creator_action_ordinal = 0 ${(account_name !== undefined) ? `AND act_account = '${account_name}'`:  '' }
      ORDER BY block_num DESC, action_ordinal DESC
      ${ no_limit ? '' : `LIMIT ${(records_count !== undefined) ? parseInt(records_count) : 100} `}`;

    let promise = new Promise((resolve, reject)=>{
      db.query(query_gen, "", (err, result) => {
        if (err) {
          console.error('Error executing get trx with action query::', err.stack);
          resolve([]);
        }else{
          resolve(result.rows);     
        }     
      })
    })    
    return await promise;   

  }catch(err){
    console.log("caught exception ", err)
    return err;
  }
}

module.exports = get_trx_action_list;
