const db = require('./db');

const get_actions = async (query) => {
  try{
    let { account_name, records_count, fetch_failed_action } = query;
    let query_gen = `
      SELECT at.transaction_id, at.action_ordinal, at.act_account, at.act_name, at.act_data, ata.actor, ata.permission, bi.timestamp FROM chain.action_trace at
      INNER JOIN chain.action_trace_authorization ata
      ON at.transaction_id = ata.transaction_id AND at.action_ordinal = ata.action_ordinal
      INNER JOIN chain.block_info bi
      ON at.block_num = bi.block_num
      WHERE at.act_name <> 'onblock' ${(account_name !== undefined) ? `AND at.act_account = '${account_name}'`:  '' }
      ORDER BY at.block_num DESC
      LIMIT ${(records_count !== undefined) ? parseInt(records_count) :  x}`;

    let promise = new Promise((resolve, reject)=>{
      db.query(query_gen, "", (err, result) => {
        if (err) {
          console.error('Error executing query', err.stack);
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
