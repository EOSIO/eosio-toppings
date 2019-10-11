const db = require('./db');

const get_all_permissions = async (query) => {
  try{
    let { account_name, records_count, fetch_eosio=false } = query;
    let query_gen = `
      (SELECT owner AS account, name AS permission, auth_keys AS public_key, last_updated 
      FROM chain.permission 
      WHERE auth_keys::text <> '{}'::text ${(account_name !== undefined) ? `AND owner = '${account_name}'`:  '' }
      ORDER BY block_num DESC
      LIMIT ${(records_count !== undefined) ? parseInt(records_count) :  100})
      ${(fetch_eosio) ?
      `UNION
      SELECT owner AS account, name AS permission, auth_keys AS public_key, last_updated FROM chain.permission WHERE owner='eosio'`
      : ''}`;

      let promise = new Promise((resolve, reject)=>{
        db.query(query_gen, "", (err, result) => {
          if (err) {
            console.error('Error executing get all permissions query:: ', err.stack);
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

module.exports = get_all_permissions;
