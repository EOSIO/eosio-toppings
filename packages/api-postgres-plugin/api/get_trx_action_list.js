const db = require('./db');

const get_trx_action_list = async (query) => {
  try{
    let { records_count=100, account_name, no_limit = false} = query;
    records_count = isNaN(records_count) ? 100 : parseInt(records_count) <= 100 ? records_count : 100;
    
    let query_gen = `
      SELECT transaction_id AS id, block_num, timestamp, act_account, act_name, action_ordinal
      FROM chain.action_trace 
      WHERE creator_action_ordinal = 0 ${(account_name !== undefined) ? `AND act_account = '${account_name}'`:  '' }
      ORDER BY block_num DESC
      LIMIT ${records_count}`;

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
