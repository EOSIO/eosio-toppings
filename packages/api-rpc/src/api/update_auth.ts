import { Api, JsonRpc } from 'eosjs';
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig';
import { TextDecoder, TextEncoder } from 'text-encoding';
const fetch = require('node-fetch');

const update_auth = async (query: {
  endpoint: string,
  account_name: string,
  private_key: string,
  new_key: string,
  permission: string,
  parent: string
}) => {
  try{
    let { endpoint, account_name, private_key, new_key, permission, parent } = query;
    const rpc = new JsonRpc(endpoint,{ fetch });
    const signatureProvider = new JsSignatureProvider([private_key]);
    const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });

    let generatedActions =  [ generate_action(account_name, permission, parent, new_key) ];

    const result = await api.transact({
      actions: generatedActions
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

const generate_action = (
  account_name: string,
  permission: string,
  parent: string,
  new_key: string
) => {
  return {
    account: "eosio",
    name: "updateauth",
    authorization: [{
      actor: account_name,
      permission: permission,
    }],
    data: {
      account: account_name,
      permission: permission,
      parent: parent,
      auth: {
        "threshold":1,
        "keys": [
          {
            "key": new_key,
            "weight": 1
          }
        ],
        "accounts": [],
        "waits": []
      }
    }
  }
}

export default update_auth;
