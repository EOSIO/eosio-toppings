const db = require('./db');

const get_block_details = async (query) => {
  try{
    let { show_empty, records_count} = query;
    let query_gen = `
      SELECT bi.block_id, bi.block_num, bi.timestamp, count(tt.id) AS num_of_transactions
      FROM chain.block_info AS bi
      LEFT OUTER JOIN (SELECT itt.block_num, itt.id FROM chain.transaction_trace itt 
      INNER JOIN chain.action_trace iat
      ON itt.id = iat.transaction_id
      WHERE iat.act_name <> 'onblock') AS tt
      ON tt.block_num = bi.block_num
      GROUP BY bi.block_num
      ${(show_empty === undefined || show_empty !== 'true') ? `HAVING count(tt.id)>0`  : ``}
      ORDER BY block_num DESC
      LIMIT ${(records_count !== undefined) ? parseInt(records_count) : 100}`;

    let promise = new Promise((resolve, reject)=>{
      db.query(query_gen, "", (err, result) => {
        if (err) {
          console.error('Error executing query', err.stack);
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

module.exports = get_block_details;
