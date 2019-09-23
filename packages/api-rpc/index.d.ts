
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

  function get_info(query: GetInfoQuery) : Promise<any>;
  function get_block(query: GetBlockQuery) : Promise<any>;
  function push_action(query: PushActionQuery) : Promise<any>;
  function deploy_contract(query: DeployContractQuery): Promise<any>;
}

export = Rpc;
