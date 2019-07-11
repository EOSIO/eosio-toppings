const db = require('./db');

const get_action_details = async (query) => {
  try{
    let { id, action_ordinal } = query;
    let query_gen = `
        SELECT at.*, ata.actor, ata.permission, bi.timestamp, ata.actor, ata.permission, bi.timestamp FROM chain.action_trace at
        INNER JOIN chain.action_trace_authorization ata
        ON at.transaction_id = ata.transaction_id AND at.action_ordinal = ata.action_ordinal
        INNER JOIN chain.block_info bi
        ON at.block_num = bi.block_num
        WHERE at.transaction_id = '${id}' AND at.action_ordinal = ${action_ordinal}`;

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

module.exports = get_action_details;
