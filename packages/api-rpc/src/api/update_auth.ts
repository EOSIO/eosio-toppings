import { Api, JsonRpc } from 'eosjs';
import JsSignatureProvider from 'eosjs/dist/eosjs-jssig';
import { TextDecoder, TextEncoder } from 'text-encoding';

const update_auth = async (query: {
  endpoint: string,
  account_name: string,
  private_key: string,
  new_active_key: string,
  new_owner_key: string
}) => {
  try{
    let { endpoint, account_name, private_key, new_active_key, new_owner_key } = query;

    const rpc = new JsonRpc(endpoint);
    const signatureProvider = new JsSignatureProvider([private_key]);
    const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });


    let generatedActions;
    console.log(new_active_key);
    if (new_active_key && new_owner_key){
      let generateActiveAction = generate_action(account_name, "active", "owner", new_active_key);
      let generateOwnerAction = generate_action(account_name, "owner", "", new_owner_key);
      generatedActions = [ generateActiveAction, generateOwnerAction ];
    }
    else if (new_active_key){
      generatedActions =  [ generate_action(account_name, "active", "owner", new_active_key) ] ;
    }
    else if (new_owner_key){
      generatedActions = [ generate_action(account_name, "owner", "", new_owner_key) ];
    }

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
      permission: "owner",
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
