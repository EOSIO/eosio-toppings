import { JsonRpc } from 'eosjs';
const fetch = require('node-fetch');

const get_block = async (query: {
  endpoint: string,
  id_or_num: number
}) => {
  try{
    let { endpoint, id_or_num } = query;
    
    const rpc = new JsonRpc(endpoint,{ fetch });
    const result = await rpc.get_block(id_or_num);
    return result;
  }catch(e){
    console.log('Caught exception: ' + e);
    throw(e);
  }
}

export default get_block;
