import { Api, JsonRpc, Serialize } from 'eosjs';
import JsSignatureProvider from 'eosjs/dist/eosjs-jssig';
import { TextDecoder, TextEncoder } from 'text-encoding';
const fetch = require('node-fetch');

const request_tokens = async (query: {
  endpoint: string,
  private_key: string,
  actor: string,
  permission: string,
  quantity: any,
  requested_by: string
}) => {
  try {
    let { endpoint, private_key, actor, permission, quantity = '1.0000 TNT', requested_by } = query;
    console.log("request_tokens query ", query)
    const rpc = new JsonRpc(endpoint, { fetch });
    const signatureProvider = new JsSignatureProvider([private_key]);
    const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });

    const result = await api.transact({
      actions: [{
        account: 'eosio.token',
        name: 'transfer',
        authorization: [{
          actor: actor,
          permission: permission,
        }],
        data: {
          from: 'eosio',
          to: requested_by,
          quantity: quantity,
          memo: "Requested Tokens"
        }
      }]
    }, {
        blocksBehind: 3,
        expireSeconds: 30,
      });

    return result;

  } catch (e) {
    console.log('Caught exception: ' + e);
    throw (e);
  }
}

export default request_tokens;
