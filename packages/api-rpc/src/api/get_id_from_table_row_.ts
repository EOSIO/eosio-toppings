import { JsonRpc } from 'eosjs';
const fetch = require('node-fetch');

const get_id_from_table_row = async (query: {
  endpoint: string,
  contract_name: string,
  table_name: string,
  scope_name: string,
  index_position: string,
  key_type: string,
  encode_type: string,
  lower_bound: string
}) => {
  try{
    let { endpoint, contract_name, table_name, scope_name, index_position='',key_type='',encode_type='', upper_bound='', lower_bound=''  } = query;
    const rpc = new JsonRpc(endpoint,{ fetch });
    const result = await rpc.get_table_rows({
      "json": true,
      "limit": 1
      "code": contract_name,    // contract who owns the table
      "scope": scope_name,   // scope of the table
      "table": table_name,  // name of the table as specified by the contract abi
      "index_position": index_position,
      "key_type": key_type,
      "encode_type": encode_type,
      "lower_bound": lower_bound
    });
    return result.rows;
  }catch(e){
    console.log('Caught exception: ' + e);
    throw(e);
  }
}

export default get_id_from_table_row;
