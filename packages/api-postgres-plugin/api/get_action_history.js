const db = require('./db');

const get_action_history = async (query) => {
  try{
    let { account_name, actor_name, records_count } = query;

    let query_gen = `
    SELECT transaction_id, action_ordinal, act_account, act_name, act_data, timestamp, block_num, actor, permission
    FROM chain.action_trace
    WHERE creator_action_ordinal = 0 
    ${(account_name !== undefined && actor_name !== undefined) ? 
      `AND (act_account = ANY('{${account_name}}') OR actor = ANY('{${actor_name}}'))` :
    (account_name !== undefined) ?
      `AND act_account = ANY('{${account_name}}')` :
    (actor_name !== undefined) ? 
      `AND actor = ANY('{${actor_name}}')` :
    ``}
    ORDER BY block_num DESC
    LIMIT ${(records_count !== undefined) ? parseInt(records_count) :  100}`;
    

    let promise = new Promise((resolve, reject)=>{
      db.query(query_gen, "", (err, result) => {
        if (err) {
          console.error('Error executing get action history query: ', err.stack);
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

module.exports = get_action_history;
