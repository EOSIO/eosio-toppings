import { Api, JsonRpc, Serialize } from 'eosjs';
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig';
import { TextDecoder, TextEncoder } from 'text-encoding';
const fetch = require('node-fetch');

const sell_ram = async (query: {
  endpoint: string,
  private_key: string,
  actor: string,
  permission: string,
  quantity: any
}) => {
  try{
    let { endpoint, private_key, actor, permission, quantity = '10000' } = query;
    const rpc = new JsonRpc(endpoint,{ fetch });
    const signatureProvider = new JsSignatureProvider([private_key]);
    const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });

    const result = await api.transact({
      actions: [{
        account: "eosio",
        name: "sellram",
        authorization: [{
          actor: actor,
          permission: permission,
        }],
        data: {
          account: actor,
          bytes: quantity
        }
      }]
    }, {
      blocksBehind: 3,
      expireSeconds: 30,
    });

    return result;

  }catch(e){
    console.log('Caught exception: ' + e);
    throw(e);
  }
}

export default sell_ram;
