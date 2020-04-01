const db = require('./db');
const apiRpc = require('@eosio-toppings/api-rpc').default;

const get_latest_dgood_action = async (query) => {
  try{
    let result = [];
    let { id, endpoint } = query;
    id = id.toUpperCase();

    let query_gen = `
        SELECT * FROM chain.contract_index64
        WHERE primary_key = '${id}'`;

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

    if(resultObj.length > 0 && resultObj[0].hasOwnProperty("block_num")){
      let blockDetailsRpcRes = await  apiRpc["get_block"]({endpoint: endpoint, id_or_num: resultObj[0].block_num});
      let id_or_num = resultObj[0].block_num.toUpperCase();

      let query_block = `
          SELECT * FROM chain.block_info
          WHERE ${isNaN(Number(id_or_num)) ? `block_id = '${id_or_num}'` : `block_num = ${id_or_num}`}`;

      let blocksPromise = new Promise((resolve, reject)=>{
        db.query(query_block, "", (err, result) => {
          if (err) {
            console.error('Error executing get block details query:: ', err.stack);
            resolve([]);
          }else{
            resolve(result.rows);
          }
        })
      })

      let resultBlockObj = await blocksPromise;
      result.push({
        ...resultBlockObj[0],
        "transactions" : blockDetailsRpcRes.transactions
      });
      return result;
    } else {
      result = resultObj;
    }

  }catch(err){
    console.log("caught exception ", err)
    return err;
  }
}

module.exports = get_latest_dgood_action;
