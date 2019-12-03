const db = require('./db');
const apiRpc = require('@eosio-toppings/api-rpc').default;

const get_action_details = async (query) => {
  try{
    let result = [];
    let { id, action_ordinal, endpoint, block_num } = query;
    id = id.toUpperCase();
    
    let query_gen = `
        SELECT * FROM chain.action_trace
        WHERE transaction_id = '${id}' AND action_ordinal = ${action_ordinal} ${(block_num !== undefined) ? `AND block_num = '${block_num}'` : ''}`;
    
    let promise = new Promise((resolve, reject)=>{
      db.query(query_gen, "", (err, result) => {
        if (err) {
          console.error('Error executing get action details query:: ', err.stack);
          resolve([]);
        }else{          
          resolve(result.rows);     
        }     
      })
    })    
    let resultObj = await promise;
    
    if(resultObj.length > 0 && resultObj[0].hasOwnProperty("transaction_id")){  
      // Delete serialized act data from response
      delete resultObj[0].act_data;
      // Fetch action data from blockchain
      let blockDetailsRpcRes = await apiRpc["get_block"]({endpoint: endpoint, id_or_num: resultObj[0].block_num});
      let transaction = blockDetailsRpcRes.transactions.filter(eachTrx => (eachTrx.trx.id !== undefined ? eachTrx.trx.id.toUpperCase() : eachTrx.id) === resultObj[0].transaction_id);
      let action_data = transaction.length > 0 ? transaction[0].trx.transaction.actions[action_ordinal-1] : {};
      result.push({
        ...resultObj[0],
        "action_data" : action_data
      });
    }else{
      result = resultObj;
    } 
    
    return result;   

  }catch(err){
    console.log("caught exception ", err)
    return err;
  }
}

module.exports = get_action_details;
