import { Api, JsonRpc } from 'eosjs';
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig';
import { TextDecoder, TextEncoder } from 'text-encoding';
const fetch = require('node-fetch');

/**
  * request_tokens
  * Requests {quantity} tokens from account {requested_from}, for account {requested_by}. 
  * Limited to a request every {limit} minutes.
  * Only used in testnet for requesting TNT.
  * @param endpoint
  * @param private_key
  * @param actor
  * @param permission
  * @param quantity
  * @param limit
  * @param action_name
  * @param requested_from
  * @param requested_by
  * @returns request result
  */
const request_tokens = async (query: {
  endpoint: string,
  private_key: string,
  actor: string,
  permission: string,
  quantity: any,
  limit: any,
  action_name: string,
  requested_from: string,
  requested_by: string
}) => {
  try {
    let { endpoint, private_key, actor, permission, limit = 60, quantity = '1.0000 TNT', action_name, requested_from, requested_by } = query;
    const rpc = new JsonRpc(endpoint, { fetch });
    const signatureProvider = new JsSignatureProvider([private_key]);
    const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });
    
    const result = await api.transact({
      actions: [{
        account: requested_from,
        name: action_name,
        authorization: [{
          actor: actor,
          permission: permission,
        }],
        data: {
          to: requested_by,
          quantity: quantity,
          limit: limit
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
