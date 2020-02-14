import { promises } from "fs";

declare namespace Rpc {

  interface GetInfoQuery { endpoint: string }

  interface CreateAccountQuery {
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
  }

  interface GetAccountQuery {
    endpoint: string,
    account_name: string
  }

  interface GetBlockQuery {
    endpoint: string,
    id_or_num: string | number
  }

  interface GetTableRowsQuery {
    endpoint: string,
    contract_name: string,
    table_name: string,
    scope_name: string,
    index_position?: number,
    key_type?: string,
    encode_type?: string,
    upper_bound?: string,
    lower_bound?: string,
    reverse?: boolean
  }

  interface PushActionQuery {
    endpoint: string,
    account_name: string,
    private_key: string,
    actor: string,
    permission: string,
    action_name: string,
    payload: any
  }

  interface DeployContractQuery {
    endpoint: string,
    account_name: string,
    private_key: string,
    permission: string,
    payload: {
      wasm: string;
      abi: string;
    }
  }

  interface RequestTokensQuery {
    endpoint: string,
    private_key: string,
    actor: string,
    permission: string,
    quantity: any,
    limit: any,
    action_name: string,
    requested_from: string,
    requested_by: string
  }

  interface BuyRamQuery {
    endpoint: string,
    private_key: string,
    actor: string,
    permission: string,
    quantity: any
  }

  interface SellRamQuery {
    endpoint: string,
    private_key: string,
    actor: string,
    permission: string,
    quantity: any
  }

  interface StakeCpuQuery {
    endpoint: string,
    private_key: string,
    actor: string,
    permission: string,
    quantity: any
  }

  interface UnstakeCpuQuery {
    endpoint: string,
    private_key: string,
    actor: string,
    permission: string,
    quantity: any
  }

  interface StakeNetQuery {
    endpoint: string,
    private_key: string,
    actor: string,
    permission: string,
    quantity: any
  }

  interface UnstakeNetQuery {
    endpoint: string,
    private_key: string,
    actor: string,
    permission: string,
    quantity: any
  }

  interface UpdateAuthQuery {
    endpoint: string,
    account_name: string,
    private_key: string,
    new_key: string,
    permission: string,
    parent: string
  }

  function get_info(query: GetInfoQuery) : Promise<any>;
  function create_account(query: CreateAccountQuery): Promise<any>;
  function deploy_contract(query: DeployContractQuery): Promise<any>;
  function get_abi(query: GetAccountQuery): Promise<any>
  function get_account_details(query: GetAccountQuery): Promise<any>
  function get_block(query: GetBlockQuery): Promise<any>;
  function get_producer_schedule(query: GetInfoQuery): Promise<any>;
  function get_producers(query: GetInfoQuery): Promise<any>;
  function get_table_rows(query: GetTableRowsQuery): Promise<any>
  function push_action(query: PushActionQuery): Promise<any>;
  function buy_ram(query: BuyRamQuery): Promise<any>;
  function sell_ram(query: SellRamQuery): Promise<any>;
  function stake_cpu(query: StakeCpuQuery): Promise<any>;
  function unstake_cpu(query: UnstakeCpuQuery): Promise<any>;
  function stake_net(query: StakeNetQuery): Promise<any>;
  function unstake_net(query: UnstakeNetQuery): Promise<any>;
  function update_auth(query: UpdateAuthQuery): Promise<any>

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
  function request_tokens(query: RequestTokensQuery): Promise<any>;
}

export = Rpc;
