const db = require('./db');
const apiRpc = require('@eosio-toppings/api-rpc').default;

const get_block_details = async (query) => {
  try{    
    let { id_or_num, endpoint} = query;
    let resultObj = null;
    // Transaction trace with action data cannot be retrieved from POstgresDB, so call RPC API
    let blockDetailsRpcRes = await  apiRpc["get_block"]({endpoint: endpoint, id_or_num: id_or_num});
    
    let result = [];
    let query_gen = `
        SELECT * FROM chain.block_info 
        WHERE ${isNaN(Number(id_or_num)) ? `block_id = '${id_or_num}'` : `block_num = ${id_or_num}`}`;      
    

    let pool = db.getPool();
    const client = await pool.connect();
    try {
      const res = await client.query(query_gen);
      resultObj = res.rows;
    } finally {
      client.release();
    }

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
