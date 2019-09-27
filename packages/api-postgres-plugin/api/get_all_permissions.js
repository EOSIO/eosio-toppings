const db = require('./db');

const get_all_permissions = async (query) => {
  try{
    let { account_name } = query;
    let query_gen = `
      SELECT owner AS account, name AS permission, auth_keys AS public_key, last_updated 
      FROM chain.permission 
      WHERE auth_keys::text <> '{}'::text ${(account_name !== undefined) ? `AND owner = '${account_name}'`:  '' }
      LIMIT 100`;


    let pool = db.getPool();
    const client = await pool.connect();
    try {
      const res = await client.query(query_gen);
      return res.rows;
    } finally {
      client.release();
    }   
  }catch(err){
    console.log("caught exception ", err)
    return err;
  }
}

module.exports = get_all_permissions;
