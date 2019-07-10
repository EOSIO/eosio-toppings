import { JsonRpc } from 'eosjs';

const get_producer_schedule = async (query: { endpoint: string }) => {
  try{
    let { endpoint } = query;
    
    const rpc = new JsonRpc(endpoint);
    let response = await rpc.get_producer_schedule();
    return response;

  }catch(e){
    console.log('Caught exception: ' + e);
    throw(e);
  }
}

export default get_producer_schedule;