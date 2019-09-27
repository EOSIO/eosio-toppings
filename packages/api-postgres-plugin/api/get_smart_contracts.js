const db = require('./db');
var sd = require('string_decoder').StringDecoder;

const get_smart_contracts = async (query) => {
  try {
    let { smart_contract_name, records_count } = query;
    let query_gen = `
      SELECT * FROM chain.account 
      WHERE abi <> '' 
      ${(smart_contract_name !== undefined) ? `AND name LIKE '${smart_contract_name}%'` : ''}
      LIMIT ${(records_count !== undefined) ? parseInt(records_count) : 100}`;

    let pool = db.getPool();
    const client = await pool.connect();
    try {
      const res = await client.query(query_gen);
      return res.rows;
    } finally {
      client.release();
    }
  } catch (err) {
    console.log("caught exception ", err)
    return err;
  }
}

module.exports = get_smart_contracts;
