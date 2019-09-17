
declare namespace Rpc {

  interface GetInfoQuery { endpoint: string }
  interface GetBlockQuery { endpoint: string, id_or_num: string|number }

  function get_info(query: GetInfoQuery) : Promise<any>;
  function get_block(query: GetBlockQuery) : Promise<any>;
}

export = Rpc;
