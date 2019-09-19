import { Api, JsonRpc, Serialize } from 'eosjs';
import JsSignatureProvider from 'eosjs/dist/eosjs-jssig';
import { TextDecoder, TextEncoder } from 'text-encoding';
const fetch = require('node-fetch');

const deploy_contract = async (query: {
  endpoint: string,
  account_name: string,
  private_key: string,
  permission: string,
  payload: any
}) => {
  try{
    let { endpoint, account_name, private_key,  permission, payload } = query;

    const rpc = new JsonRpc(endpoint,{ fetch });
    const signatureProvider = new JsSignatureProvider([private_key]);
    const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });

    // prepare abi from JSON string
    const buffer = new Serialize.SerialBuffer({
      textEncoder: api.textEncoder,
      textDecoder: api.textDecoder,
    });
    let { abi } = payload;
    const abiDefinition = api.abiTypes.get('abi_def');
    // @ts-ignore
    abi = abiDefinition.fields.reduce(
      (res, { name: fieldName }) => ({
        ...res,
        [fieldName]: res[fieldName],
      }),
      JSON.parse(abi)
    );

    return await api.transact(
      {
        actions: [
          {
            account: 'eosio',
            name: 'setcode',
            authorization: [
              {
                actor: account_name,
                permission: permission,
              },
            ],
            data: {
              account: account_name,
              vmtype: 0,
              vmversion: 0,
              code: payload.wasm,
            },
          },
          {
            account: 'eosio',
            name: 'setabi',
            authorization: [
              {
                actor: account_name,
                permission: permission,
              },
            ],
            data: {
              account: account_name,
              abi: Buffer.from(buffer.asUint8Array()).toString('hex'),
            },
          },
        ],
      },
      {
        blocksBehind: 3,
        expireSeconds: 30,
      }
    );

  } catch(e){
    console.log('Caught exception: ' + e);
    throw(e);
  }
}

export default push_action;
