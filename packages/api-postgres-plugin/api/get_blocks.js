const db = require('./db');

const get_blocks = async (query) => {
  try{
    let { show_empty, records_count = 100} = query;
    records_count = isNaN(records_count) ? 100 : parseInt(records_count) <= 100 ? records_count : 100;
    
    let query_gen = 
      (show_empty === undefined || show_empty !== 'true') 
      ?`SELECT * FROM chain.received_nonempty_block
        ORDER BY block_num DESC
        LIMIT ${records_count}`
      :`SELECT bi.block_id, bi.block_num, bi.timestamp, bi.transaction_count, bi.producer      
        FROM chain.block_info AS bi        
        ORDER BY block_num DESC
        LIMIT ${records_count}`
      ;    

    let promise = new Promise((resolve, reject)=>{
      db.query(query_gen, "", (err, result) => {
        if (err) {
          console.error('Error executing get blocks query:: ', err.stack);
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

module.exports = get_blocks;
