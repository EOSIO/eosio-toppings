import { JsonRpc } from 'eosjs';

const get_block = async (query: {
  endpoint: string,
  id_or_num: number
}) => {
  try{
    let { endpoint, id_or_num } = query;
    console.log("block num ", id_or_num);
    const rpc = new JsonRpc(endpoint);
    const result = await rpc.get_block(id_or_num);
    return result;
  }catch(e){
    console.log('Caught exception: ' + e);
    throw(e);
  }
}

export default get_block;
