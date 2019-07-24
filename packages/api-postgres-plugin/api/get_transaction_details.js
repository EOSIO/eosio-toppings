const db = require('./db');

const get_transaction_details = async (query) => {
  try{
    let { id } = query;
    let result = [];
    let transaction_query_gen = `
        SELECT * FROM chain.transaction_trace 
        WHERE id = '${id}'`;    
    
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
    let resultObj = await transactionPromise;  

    // If block ID/ block num found then get the transaction traces, else return empty array
    if(resultObj.length > 0 && resultObj[0].hasOwnProperty("id")){
      let transaction_query_gen = `
        SELECT * FROM chain.action_trace WHERE transaction_id = '${resultObj[0].id}'`; 

      let actionPromise = new Promise((resolve, reject)=>{
          db.query(transaction_query_gen, "", (err, result) => {
            if (err) {
              console.error('Error executing query', err.stack);
              resolve([]);
            }else{
              resolve(result.rows);     
            }     
          })
        })   
      let action_traces = await actionPromise;
      result.push({
          ...resultObj[0],
          "action_traces" : action_traces
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

module.exports = get_transaction_details;