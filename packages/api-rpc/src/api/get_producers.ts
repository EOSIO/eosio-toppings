import { JsonRpc } from 'eosjs';

const get_producers = async (query: { endpoint: string }) => {
  try{
    let { endpoint } = query;
    
    const rpc = new JsonRpc(endpoint);
    let response = await rpc.get_producers();
    return response;

  }catch(e){
    console.log('Caught exception: ' + e);
    throw(e);
  }
}

export default get_producers;