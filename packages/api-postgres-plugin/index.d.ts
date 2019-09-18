
declare namespace Postgres {

  interface ListQuery { records_count: number }

  interface BlocksQuery extends ListQuery { show_empty: string }
  interface BlockDetailsQuery { id_or_num: string }

  interface TransactionsQuery extends ListQuery { }
  interface TransactionDetailsQuery { id: string }

  interface ActionsQuery extends ListQuery { account_name: string, fetch_failed_action: boolean, no_limit: boolean}
  interface ActionDetailsQuery { id: string, action_ordinal: number }

  interface BlockResult {
    block_num: string,
    block_id: string,
    transaction_count: number,
    timestamp: Date
  }
  
  interface BlockDetailsResult {
    block_num: string,
    block_id: string,
    timestamp: string,
    producer: string,
    confirmed: boolean,
    previous: string,
    transaction_count: number,
    transaction_mroot: string,
    action_mroot: string,
    schedule_version: string
    new_producers_version: string
    new_producers?: string,
    transactions: Array<any>
  }

  interface TransactionResult {
    id: string,
    block_num: string,
    partial_expiration: string,
    status: string
  }

  interface ActionData {
    type: string,
    data: any
  }

  interface ActionResult {
    transaction_id: string,
    action_ordinal: number,
    act_account: string,
    act_name: string,
    act_data: ActionData,
    timestamp: string,
    block_num: string,
    actor: string,
    permission: string
  }

  interface ActionTrace {
    block_num: string,
    timestamp: string,
    transaction_id: string,
    transaction_status: string,
    action_ordinal: number,
    creator_action_ordinal: number,
    receipt_present: boolean,
    receipt_receiver: string,
    receipt_act_digest: string,
    receipt_global_sequence: string,
    receipt_recv_sequence: string,
    receipt_code_sequence: string,
    receipt_abi_sequence: string,
    receiver: string,
    act_account: string,
    act_name: string,
    act_data: ActionData,
    context_free: boolean,
    elapsed: string,
    console: string,
    except: any,
    error_code: number
  }

  interface ActionDetailsResult {
    block_num: string,
    transaction_ordinal: number,
    failed_dtrx_trace: string,
    id: string,
    status: string,
    cpu_usage_us: string,
    net_usage_words: string,
    elapsed: string,
    net_usage: string,
    scheduled: boolean,
    account_ram_delta_present: boolean,
    account_ram_delta_account: string,
    account_ram_delta_delta: string,
    except: any,
    error_code: string,
    partial_present: boolean,
    partial_expiration: string,
    partial_ref_block_num: number,
    partial_ref_block_prefix: string,
    partial_max_net_usage_words: string,
    partial_max_cpu_usage_ms: number,
    partial_delay_sec: string,
    partial_signatures: string[],
    partial_context_free_data: any[],
    action_traces: ActionTrace[]
  }

  function get_blocks(query: BlocksQuery) : Promise<BlockResult[]>;
  function get_block_details(query: BlockDetailsQuery) : Promise<BlockDetailsResult>;

  function get_transactions(query: TransactionsQuery) : Promise<TransactionResult[]>;
  function get_trx_action_list(query: ActionsQuery) : Promise<TransactionResult[]>;
  function get_transaction_details(query: TransactionDetailsQuery) : Promise<any>;

  function get_actions(query: ActionsQuery) : Promise<ActionResult[]>;
  function get_action_details(query: ActionDetailsQuery) : Promise<ActionDetailsResult>;
}

export = Postgres;
