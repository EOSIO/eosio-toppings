import { JsonRpc } from 'eosjs';
const fetch = require('node-fetch');

const get_account_details = async (query: {
  endpoint: string,
  account_name: string
}) => {
  try{
    let { endpoint, account_name } = query;
    
    const rpc = new JsonRpc(endpoint,{ fetch });
    const result = await rpc.get_account(account_name);
    return result;
  }catch(e){
    console.log('Caught exception: ' + e);
    throw(e);
  }
}

export default get_account_details;
