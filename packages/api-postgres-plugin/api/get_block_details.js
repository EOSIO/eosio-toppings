const db = require('./db');
const apiRpc = require('@eosio-toppings/api-rpc').default;

const get_block_details = async (query) => {
  try{    
    let { id_or_num, endpoint} = query;
    
    // Transaction trace with action data cannot be retrieved from POstgresDB, so call RPC API
    let blockDetailsRpcRes = await  apiRpc["get_block"]({endpoint: endpoint, id_or_num: id_or_num});
    id_or_num = id_or_num.toUpperCase();
    let result = [];
    let query_gen = `
        SELECT * FROM testnet.block_info 
        WHERE ${isNaN(Number(id_or_num)) ? `block_id = '${id_or_num}'` : `block_num = ${id_or_num}`}`;      
    
    let blocksPromise = new Promise((resolve, reject)=>{
      db.query(query_gen, "", (err, result) => {
        if (err) {
          console.error('Error executing get block details query:: ', err.stack);
          resolve([]);
        }else{
          resolve(result.rows);     
        }     
      })
    })    
    let resultObj = await blocksPromise; 

    result.push({
      ...resultObj[0],
      "transactions" : blockDetailsRpcRes.transactions
    });
    return result;  
  }catch(err){
    console.log("caught exception ", err)
    return err;
  }
}

module.exports = get_block_details;
