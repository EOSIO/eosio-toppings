import { Api, JsonRpc } from 'eosjs';
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig';
import { TextDecoder, TextEncoder } from 'text-encoding';
const fetch = require('node-fetch');

const create_account = async (query: {
  endpoint: string,
  private_key: string,
  actor: string,
  permission: string,
  new_account_name: string,
  new_account_owner_key: string,
  new_account_active_key: string,
  delegate?: boolean,
  ram_bytes_buy_quantity?: number,
  stake_net_quantity?: string,
  stake_cpu_quantity?: string,
  initial_transfer_quantity?: string
}) => {
  try {
    let {
      endpoint,
      private_key: creator_private_key,
      actor: creator_account_name,
      permission: creator_account_permission,
      new_account_name,
      new_account_owner_key,
      new_account_active_key,
      delegate = false,
      ram_bytes_buy_quantity = 8192,
      stake_net_quantity = '1.0000 SYS',
      stake_cpu_quantity = '1.0000 SYS',
      initial_transfer_quantity = '1.0000 SYS'
    } = query;
    const rpc = new JsonRpc(endpoint, { fetch });
    const signatureProvider = new JsSignatureProvider([creator_private_key]);
    const api = new Api({
      rpc,
      signatureProvider,
      textDecoder: new TextDecoder(),
      textEncoder: new TextEncoder()
    });

    const actions: { [key: string]: any }[] = [
      {
        account: 'eosio',
        name: 'newaccount',
        authorization: [
          {
            actor: creator_account_name,
            permission: creator_account_permission
          }
        ],
        data: {
          creator: creator_account_name,
          name: new_account_name,
          owner: {
            threshold: 1,
            keys: [
              {
                key: new_account_owner_key,
                weight: 1
              }
            ],
            accounts: [],
            waits: []
          },
          active: {
            threshold: 1,
            keys: [
              {
                key: new_account_active_key,
                weight: 1
              }
            ],
            accounts: [],
            waits: []
          }
        }
      }
    ];

    if (delegate) {
      actions.push(
        {
          account: 'eosio',
          name: 'buyrambytes',
          authorization: [
            {
              actor: creator_account_name,
              permission: creator_account_permission
            }
          ],
          data: {
            payer: 'eosio',
            receiver: new_account_name,
            bytes: ram_bytes_buy_quantity
          }
        },
        {
          account: 'eosio',
          name: 'delegatebw',
          authorization: [
            {
              actor: creator_account_name,
              permission: creator_account_permission
            }
          ],
          data: {
            from: 'eosio',
            receiver: new_account_name,
            stake_net_quantity: stake_net_quantity,
            stake_cpu_quantity: stake_cpu_quantity,
            transfer: true
          }
        },
        {
          account: 'eosio.token',
          name: 'transfer',
          authorization: [
            {
              actor: process.env.EOSIO_OWNER_ACCOUNT_NAME,
              permission: process.env.EOSIO_OWNER_ACCOUNT_PERMISSION
            }
          ],
          data: {
            from: 'eosio',
            to: new_account_name,
            quantity: initial_transfer_quantity,
            memo: 'Initial transfer'
          }
        }
      )
    }

    const result = await api.transact(
      {
        actions: actions
      },
      {
        blocksBehind: 3,
        expireSeconds: 30
      }
    );

    return result;
  } catch (e) {
    console.log('Caught exception: ' + e);
    throw e;
  }
};

export default create_account;
