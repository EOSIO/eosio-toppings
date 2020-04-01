const db = require('./db');

const get_permission_link = async (query) => {
  try{
    let { account_name } = query;

    let query_gen = `
    SELECT account, code as contract, message_type as action_name, required_permission as permission  FROM chain.permission_link
    WHERE ${(account_name !== undefined) ? `account = '${account_name}'`:  '' }  `;

    let promise = new Promise((resolve, reject)=>{
      db.query(query_gen, "", (err, result) => {
        if (err) {
          console.error('Error executing get actions query:: ', err.stack);
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

module.exports = get_permission_link;
