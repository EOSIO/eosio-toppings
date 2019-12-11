const db = require('./db');

const get_blocks = async query => {
  try {
    const { records_count, show_empty } = query;
    const limit = Math.min(parseInt(records_count) || 100, 100);
    const statement = `
      ${show_empty === 'true'
        ? `
        SELECT block_id, block_num, timestamp, transaction_count, producer
        FROM chain.block_info
        `
        : `
        SELECT *
        FROM chain.received_nonempty_block
        `
      }
        ORDER BY block_num DESC
        LIMIT ${limit}
    `;

    return (await db.queryAsync(statement, '')).rows;
  } catch (error) {
    console.error('Caught exception in get blocks query: ', error.stack);
    return [];
  }
};

module.exports = get_blocks;
