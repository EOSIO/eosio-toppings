const db = require('./db');
const apiRpc = require('@eosio-toppings/api-rpc').default;

const get_transaction_details = async (query) => {
  try{
    let { id, endpoint } = query;
    id = id.toUpperCase();
    let result = [];
    let query_gen = `
        SELECT tt.*,
        (SELECT ata.actor FROM chain.action_trace_authorization ata WHERE ata.block_num = tt.block_num AND ata.transaction_id = tt.id AND ata.action_ordinal=1 LIMIT 1),
        (SELECT ata.permission FROM chain.action_trace_authorization ata WHERE ata.block_num = tt.block_num AND ata.transaction_id = tt.id AND ata.action_ordinal=1 LIMIT 1) 
        FROM chain.transaction_trace as tt
        WHERE id = '${id}'`;    
    
    let transactionPromise = new Promise((resolve, reject)=>{
      db.query(query_gen, "", (err, result) => {
        if (err) {
          console.error('Error executing get transaction details query:: ', err.stack);
          resolve([]);
        }else{
          resolve(result.rows);     
        }     
      })
    })    
    let resultObj = await transactionPromise;  

    if(resultObj.length > 0 && resultObj[0].hasOwnProperty("block_num")){     

      let blockDetailsRpcRes = await apiRpc["get_block"]({endpoint: endpoint, id_or_num: resultObj[0].block_num});

      let transaction = blockDetailsRpcRes.transactions.filter(eachTrx => eachTrx.trx.id.toUpperCase() === resultObj[0].id);
      let action_traces = transaction.length > 0 ? transaction[0].trx.transaction : [];
        
      result.push({
          ...resultObj[0],
          "transaction" : action_traces
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
