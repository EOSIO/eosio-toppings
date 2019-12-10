const db = require('./db');

const get_action_history = async (query) => {
  console.log("request received in api-postgres ", new Date());
  try{
    const { account_name, actor_name, records_count } = query;

    const query_gen = `
      ${account_name !== undefined ?
        `
          SELECT transaction_id, action_ordinal, act_account, act_name, act_data, timestamp, block_num, actor, permission
          FROM chain.action_trace
          WHERE creator_action_ordinal = 0 AND act_account = ANY('{${account_name}}')
        ` : ``
      }
      ${account_name !== undefined && actor_name !== undefined ? `UNION` : ``}
      ${actor_name !== undefined ? 
        `
          SELECT transaction_id, action_ordinal, act_account, act_name, act_data, timestamp, block_num, actor, permission
          FROM chain.action_trace
          WHERE creator_action_ordinal = 0 AND actor = ANY('{${actor_name}}')
        `  : ``
      }
          ORDER BY block_num DESC
          LIMIT ${records_count !== undefined ? parseInt(records_count) : 100}
    `;
     
    console.log("query gen ", query_gen);
    
    const promise = new Promise((resolve, reject) => {
      db.query(query_gen, "", (err, result) => {
        if (err) {
          console.error('Error executing get action history query: ', err.stack);
          resolve([]);
        } else {
          console.log("response received from database, sending to back end", new Date());
          resolve(result.rows);     
        }     
      });
    });

    return await promise;   

  } catch (err) {
    console.log("caught exception ", err);
    return err;
  }
}

module.exports = get_action_history;
