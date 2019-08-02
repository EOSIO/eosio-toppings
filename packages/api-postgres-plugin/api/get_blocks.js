const db = require('./db');

const get_block_details = async (query) => {
  try{
    let { show_empty, records_count} = query;
    let query_gen = 
      (show_empty === undefined || show_empty !== 'true') 
      ?`SELECT * FROM chain.received_nonempty_block
        ORDER BY block_num DESC
        LIMIT  ${(records_count !== undefined) ? parseInt(records_count) : 100}`
      :`SELECT bi.block_id, bi.block_num, bi.timestamp, bi.transaction_count, bi.producer      
        FROM chain.block_info AS bi        
        ORDER BY block_num DESC
        LIMIT  ${(records_count !== undefined) ? parseInt(records_count) : 100}`
      ;    

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

module.exports = get_block_details;
