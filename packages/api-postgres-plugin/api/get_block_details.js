const db = require('./db');

const get_block_details = async (query) => {
  try{
    let { id_or_num } = query;
    let result = [];
    let block_query_gen = `
        SELECT * FROM chain.block_info 
        WHERE ${isNaN(Number(id_or_num)) ? `block_id = '${id_or_num}'` : `block_num = ${id_or_num}`}`;      
    
    let blocksPromise = new Promise((resolve, reject)=>{
      db.query(block_query_gen, "", (err, result) => {
        if (err) {
          console.error('Error executing query', err.stack);
          resolve([]);
        }else{
          resolve(result.rows);     
        }     
      })
    })    
    let resultObj = await blocksPromise;  

    // If block ID/ block num found then get the transaction traces, else return empty array
    if(resultObj.length > 0 && resultObj[0].hasOwnProperty("block_num")){
      let transaction_query_gen = `
        SELECT tt.* FROM chain.transaction_trace tt 
        INNER JOIN chain.action_trace AT
        ON tt.id = at.transaction_id
        WHERE tt.block_num = ${resultObj[0].block_num} AND at.act_name <> 'onblock'`; 

      let transactionPromise = new Promise((resolve, reject)=>{
          db.query(transaction_query_gen, "", (err, result) => {
            if (err) {
              console.error('Error executing query', err.stack);
              resolve([]);
            }else{
              resolve(result.rows);     
            }     
          })
        })   
      let transaction_traces = await transactionPromise;
      result.push({
          ...resultObj[0],
          "transactions" : transaction_traces
      });
      return result;
    }else{
      return resultObj;
    }    
  }catch(err){
    console.log("caught exception ", err)
    return err;
  }
}

module.exports = get_block_details;
