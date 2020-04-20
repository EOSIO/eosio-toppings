import { JsonRpc } from 'eosjs';
const fetch = require('node-fetch');

const get_currency_stats = async (query: {
  endpoint: string,
  symbol: string
}) => {
  try{
    let { endpoint, symbol } = query;
    const rpc = new JsonRpc(endpoint,{ fetch });
    const result = await rpc.get_currency_stats(
      "code": "eosio.token",
      "symbol": symbol
    );
    return result;
  }catch(e){
    console.log('Caught exception: ' + e);
    throw(e);
  }
}

export default get_currency_stats;
