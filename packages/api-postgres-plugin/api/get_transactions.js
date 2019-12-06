const db = require('./db');

const get_transactions = async (query) => {
  try{
    let { records_count = 100 } = query;
    records_count = isNaN(records_count) ? 100 : parseInt(records_count) <= 100 ? records_count : 100;
    
    let query_gen = `
      SELECT tt.id, tt.block_num, tt.partial_expiration, tt.status FROM chain.transaction_trace tt 
      ORDER BY block_num DESC, transaction_ordinal DESC
      LIMIT ${records_count}`;

    let promise = new Promise((resolve, reject)=>{
      db.query(query_gen, "", (err, result) => {
        if (err) {
          console.error('Error executing get transactions query::', err.stack);
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

module.exports = get_transactions;
