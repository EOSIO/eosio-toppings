
declare namespace Rpc {

  interface GetInfoQuery { endpoint: string }

  function get_info(query: GetInfoQuery) : Promise<any>;
}

export = Rpc;
