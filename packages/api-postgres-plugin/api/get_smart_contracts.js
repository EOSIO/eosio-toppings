const db = require('./db');

const get_smart_contracts = async query => {
  try {
    const { smart_contract_name, records_count } = query;
    const limit = Math.min(parseInt(records_count) || 100, 100);
    const statement = `
      SELECT *
      FROM chain.account 
      WHERE abi <> '' ${smart_contract_name !== undefined ? `AND name LIKE '${smart_contract_name}%'` : ''}
      LIMIT ${limit}
    `;

    return (await db.queryAsync(statement, '')).rows;
  } catch (error) {
    console.error(
      'Caught exception in get smart contracts query: ',
      error.stack
    );
    return [];
  }
};

module.exports = get_smart_contracts;
