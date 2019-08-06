const db = require('./db');
var sd = require('string_decoder').StringDecoder;

const get_smart_contracts = async () => {
  try{
    let query_gen = `SELECT * FROM chain.account WHERE abi <> '' LIMIT 100`;

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

module.exports = get_smart_contracts;
