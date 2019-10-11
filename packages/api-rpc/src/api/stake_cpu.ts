import { Api, JsonRpc, Serialize } from 'eosjs';
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig';
import { TextDecoder, TextEncoder } from 'text-encoding';
const fetch = require('node-fetch');

const stake_cpu = async (query: {
  endpoint: string,
  private_key: string,
  actor: string,
  permission: string,
  quantity: any
}) => {
  try{
    let { endpoint, private_key, actor, permission, quantity = '1.0000 TNT' } = query;
    console.log("stake cpu query ", query)
    const rpc = new JsonRpc(endpoint,{ fetch });
    const signatureProvider = new JsSignatureProvider([private_key]);
    const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });

    const result = await api.transact({
      actions: [{
        account: "eosio",
        name: "delegatebw",
        authorization: [{
          actor: actor,
          permission: permission,
        }],
        data: {
          from: actor,
          receiver: actor,
          stake_cpu_quantity: quantity,
          stake_net_quantity: '0.0000 TNT',
          transfer: false,
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

export default stake_cpu;
