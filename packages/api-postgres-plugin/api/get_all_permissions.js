const db = require('./db');

const get_all_permissions = async () => {
  try{
    let query_gen = "SELECT owner AS account, name AS permission, auth_keys AS public_key, last_updated FROM permission WHERE auth_keys::text <> '{}'::text;";
 
    await db.query(query_gen, "", (err, result) => {
      if (err) {
        console.error('Error executing query', err.stack)
      }else{
        console.log("get all permissions response ,",result.rows);
      }      
      return result;
    })
  }catch(err){
    console.log("caught exception ", err)
    return err;
  }
}

module.exports = get_all_permissions;
