import { JsonRpc } from 'eosjs';

const get_abi = async (query: {
  endpoint: string,
  account_name: string
}) => {
  try{
    let { endpoint, account_name } = query;
    
    const rpc = new JsonRpc(endpoint);
    const result = await rpc.get_abi(account_name);
    return result;
  }catch(e){
    console.log('Caught exception: ' + e);
    throw(e);
  }
}

export default get_abi;
