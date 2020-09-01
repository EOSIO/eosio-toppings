import { Api, JsonRpc, Serialize } from 'eosjs';
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig';
const fetch = require('node-fetch');

const buy_ram = async (query: {
  endpoint: string,
  private_key: string,
  actor: string,
  permission: string,
  quantity: any
}) => {
  try{
    let { endpoint, private_key, actor, permission, quantity = '10000' } = query;
    console.log("query ", query)
    const rpc = new JsonRpc(endpoint, { fetch });
    const signatureProvider = new JsSignatureProvider([private_key]);
    const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });

    const result = await api.transact({
      actions: [{
        account: "eosio",
        name: "buyrambytes",
        authorization: [{
          actor: actor,
          permission: permission,
        }],
        data: {
          payer: actor,
          receiver: actor,
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

export default buy_ram;
