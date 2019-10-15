const db = require('./db');

const get_trx_action_list = async (query) => {
  try{
    let { account_name, signed_name, no_limit = false, records_count = 100 } = query;
    let query_gen = `
      SELECT
        a.transaction_id AS id, a.block_num, a.timestamp, a.act_account, a.act_name
      FROM
        chain.action_trace AS a
      ${(signed_name !== undefined) ? `
      LEFT JOIN
        chain.action_trace_authorization AS b
      ON
        a.block_num = b.block_num AND a.transaction_id = b.transaction_id AND a.action_ordinal=b.action_ordinal
      ` : ''}
      WHERE
        a.creator_action_ordinal = 0
        ${(account_name !== undefined) ? `AND a.act_account = '${account_name}'` : ''}
        ${(signed_name !== undefined) ? `AND b.actor = '${signed_name}'` : ''}
      ORDER BY
        a.block_num DESC
      ${ !no_limit ? `LIMIT ${records_count} ` : ''}
    `;

    let promise = new Promise((resolve, reject) => {
      db.query(query_gen, "", (err, result) => {
        if (err) {
          console.error('Error executing get trx with action query::', err.stack);
          resolve([]);
        }else{
          resolve(result.rows);     
        }     
      })
    })    
    return await promise;   

  }catch(err){
    console.log("caught exception ", err)
    return err;
  }
}

module.exports = get_trx_action_list;
