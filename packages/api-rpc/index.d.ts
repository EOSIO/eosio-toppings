
declare namespace Rpc {

  interface GetInfoQuery { endpoint: string }
  interface PushActionQuery {
    endpoint: string,
    account_name: string,
    private_key: string,
    actor: string,
    permission: string,
    action_name: string,
    payload: any
  }

  function get_info(query: GetInfoQuery) : Promise<any>;
  function push_action(query: PushActionQuery) : Promise<any>;
}

export = Rpc;
