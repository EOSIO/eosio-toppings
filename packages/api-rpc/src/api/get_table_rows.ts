import { JsonRpc } from 'eosjs';
const fetch = require('node-fetch');

const get_table_rows = async (query: {
  endpoint: string,
  contract_name: string,
  table_name: string,
  scope_name: string,
  index_position: string,
  key_type: string,
  encode_type: string,
  upper_bound: string,
  lower_bound: string
}) => {
  try{
    let { endpoint, contract_name, table_name, scope_name, index_position='',key_type='',encode_type='', upper_bound='', lower_bound=''  } = query;
    const rpc = new JsonRpc(endpoint,{ fetch });
    const result = await rpc.get_table_rows({
      "json": true,
      "code": contract_name,    // contract who owns the table
      "scope": scope_name,   // scope of the table
      "table": table_name,  // name of the table as specified by the contract abi
      "index_position": index_position,
      "key_type": key_type,
      "encode_type": encode_type,
      "upper_bound": upper_bound,
      "lower_bound": lower_bound
    });
    return result.rows;
  }catch(e){
    console.log('Caught exception: ' + e);
    throw(e);
  }
}

export default get_table_rows;
