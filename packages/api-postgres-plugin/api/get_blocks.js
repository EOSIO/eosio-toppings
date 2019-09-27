const db = require('./db');

const get_blocks = async (query) => {
  try{
    let { show_empty, records_count} = query;
    let query_gen = 
      (show_empty === undefined || show_empty !== 'true') 
      ?`SELECT * FROM chain.received_nonempty_block
        ORDER BY block_num DESC
        LIMIT  ${(records_count !== undefined) ? parseInt(records_count) : 100}`
      :`SELECT bi.block_id, bi.block_num, bi.timestamp, bi.transaction_count, bi.producer      
        FROM chain.block_info AS bi        
        ORDER BY block_num DESC
        LIMIT  ${(records_count !== undefined) ? parseInt(records_count) : 100}`
      ;
    
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

module.exports = get_blocks;
