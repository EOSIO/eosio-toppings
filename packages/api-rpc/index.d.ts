
declare namespace Rpc {

  interface GetInfoQuery { endpoint: string }

  interface GetBlockQuery { endpoint: string, id_or_num: string|number }

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

  function get_info(query: GetInfoQuery) : Promise<any>;
  function get_block(query: GetBlockQuery) : Promise<any>;
  function push_action(query: PushActionQuery) : Promise<any>;
  function deploy_contract(query: DeployContractQuery): Promise<any>;
  function request_tokens(query: RequestTokensQuery): Promise<any>;
  function buy_ram(query: BuyRamQuery): Promise<any>;
  function sell_ram(query: SellRamQuery): Promise<any>;
  function stake_cpu(query: StakeCpuQuery): Promise<any>;
  function unstake_cpu(query: UnstakeCpuQuery): Promise<any>;  
  function stake_net(query: StakeNetQuery): Promise<any>;
  function unstake_net(query: UnstakeNetQuery): Promise<any>;  
}

export = Rpc;
