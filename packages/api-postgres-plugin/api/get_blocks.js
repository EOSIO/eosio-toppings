const db = require('./db');

const get_blocks = async () => {
  try{
    let query_gen = "SELECT block_id, block_num FROM chain.block_info ORDER BY block_num DESC LIMIT 100";
 
    await db.query(query_gen, "", (err, result) => {
      if (err) {
        console.error('Error executing query', err.stack)
      }else{
        console.log("get blocks response ,",result.rows);
      }      
      return result;
    })
  }catch(err){
    console.log("caught exception ", err)
    return err;
  }
}

module.exports = get_blocks;
