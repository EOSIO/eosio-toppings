const db = require('./db');

const get_transactions = async (query) => {
  try{
    let { records_count} = query;
    let query_gen = `
      SELECT tt.id, tt.block_num, tt.partial_expiration, tt.status FROM chain.transaction_trace tt 
      ORDER BY block_num DESC, transaction_ordinal DESC
      LIMIT ${(records_count !== undefined) ? parseInt(records_count) : 100}`;

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

module.exports = get_transactions;
