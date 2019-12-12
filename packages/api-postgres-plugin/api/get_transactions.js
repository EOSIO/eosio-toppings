const db = require('./db');

const get_transactions = async query => {
  try {
    const { records_count } = query;
    const limit = Math.min(parseInt(records_count) || 100, 100);
    const statement = `
      SELECT id, block_num, partial_expiration, status
      FROM chain.transaction_trace
      ORDER BY block_num DESC, transaction_ordinal DESC
      LIMIT ${limit}
    `;

    return (await db.queryAsync(statement, '')).rows;
  } catch (error) {
    console.error(
      'Caught exception in get transactions query: ',
      error.stack
    );
    return [];
  }
};

module.exports = get_transactions;
