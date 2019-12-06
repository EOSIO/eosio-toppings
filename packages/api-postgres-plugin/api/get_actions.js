const db = require('./db');

const get_actions = async (query) => {
  try{
    let { account_name, records_count = 100, fetch_failed_action } = query;
    records_count = isNaN(records_count) ? 100 : parseInt(records_count) <= 100 ? records_count : 100;

    let query_gen = `
    SELECT transaction_id, action_ordinal, act_account, act_name, act_data, timestamp, block_num, actor, permission
    FROM chain.action_trace
    WHERE creator_action_ordinal = 0 ${(account_name !== undefined) ? `AND act_account = '${account_name}'` : '' }  
    ORDER BY block_num DESC
    LIMIT ${records_count}`;
    

    let promise = new Promise((resolve, reject)=>{
      db.query(query_gen, "", (err, result) => {
        if (err) {
          console.error('Error executing get actions query:: ', err.stack);
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

module.exports = get_actions;
