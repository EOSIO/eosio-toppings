import { JsonRpc } from 'eosjs';
const fetch = require('node-fetch');

const get_info = async (query: { endpoint: string }) => {
  try{
    let { endpoint } = query;
    
    const rpc = new JsonRpc(endpoint,{ fetch });
    let response = await rpc.get_info();
    return response;

  }catch(e){
    console.log('Caught exception: ' + e);
    throw(e);
  }
}

export default get_info;
