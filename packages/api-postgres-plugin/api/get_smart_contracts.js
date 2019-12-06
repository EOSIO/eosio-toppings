const db = require('./db');
var sd = require('string_decoder').StringDecoder;

const get_smart_contracts = async (query) => {
  try {
    let { smart_contract_name, records_count = 100 } = query;
    records_count = isNaN(records_count) ? 100 : parseInt(records_count) <= 100 ? records_count : 100;
    let query_gen = `
      SELECT * FROM chain.account 
      WHERE abi <> '' 
      ${(smart_contract_name !== undefined) ? `AND name LIKE '${smart_contract_name}%'` : ''}
      LIMIT ${(records_count !== undefined) ? parseInt(records_count) : 100}`;

    let promise = new Promise((resolve, reject) => {
      db.query(query_gen, "", (err, result) => {
        if (err) {
          console.error('Error executing get smart contracts query:: ', err.stack);
          resolve([]);
        } else {
          resolve(result.rows);
        }
      })
    })
    return await promise;

  } catch (err) {
    console.log("caught exception ", err)
    return err;
  }
}

module.exports = get_smart_contracts;
