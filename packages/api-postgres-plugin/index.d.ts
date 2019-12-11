
declare namespace Postgres {

  interface ListQuery { records_count?: number }

  interface BlocksQuery extends ListQuery { show_empty: string }
  interface BlockDetailsQuery { id_or_num: string, endpoint: string }

  interface TransactionsQuery extends ListQuery { }
  interface TransactionDetailsQuery { id: string, endpoint: string }

  interface ActionsQuery extends ListQuery { account_name?: string }
  interface ActionHistoryQuery extends ListQuery { account_name?: string | string[], actor_name?: string | string[] }
  interface ActionsWithFilterQuery extends ListQuery {
    action_filter: 'sent' | 'received' | 'signed' | 'contract',
    account_name: string,
    page_size?: number,
    direction?: 'next' | 'prev',
    max_rgs?: string,
    show_data_size?: boolean
  }

  interface ActionDetailsQuery { id: string, action_ordinal: number, endpoint: string, block_num: number }

  interface SmartContractsQuery extends ListQuery { smart_contract_name: string }

  interface PermissionQuery extends ListQuery { public_key: string }

  interface ErrorResult {
    json: {
      code: number;
      message: string;
      error: {
        code: number;
        name: string;
        what: string;
        details: string[];
      }
    }
  }

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

  interface SmartContractsResult {
    abi: any,
    block_num: string,
    creation_date: string,
    name: string,
    present: boolean
  }

  interface DBConnectionQuery {
    host?: string,
    user?: string,
    database?: string,
    password?: string,
    port?: string | number,
    max?: string | number
  }

  interface PermissionResult {
    account: string;
    permission: string;
    public_key: string;
    last_updated: string;
  }

  interface GetAllPermissionsQuery extends ListQuery {
    account_name?: string;
    fetch_eosio?: string;
  }

  interface GetPermissionQuery extends ListQuery {
    account_name: string;
  }

  function get_blocks(query: BlocksQuery): Promise<BlockResult[]>;
  function get_block_details(query: BlockDetailsQuery): Promise<BlockDetailsResult | ErrorResult>;

  function get_transactions(query: TransactionsQuery): Promise<TransactionResult[]>;
  function get_trx_action_list(query: ActionsQuery): Promise<TransactionResult[]>;
  function get_transaction_details(query: TransactionDetailsQuery): Promise<any>;

  function get_actions(query: ActionsQuery): Promise<ActionResult[]>;
  function get_action_history(query: ActionHistoryQuery): Promise<ActionResult[]>;
  function get_action_details(query: ActionDetailsQuery): Promise<ActionDetailsResult>;
  function get_actions_with_filter(query: ActionsWithFilterQuery): Promise<TransactionResult[]>;

  function get_smart_contracts(query: SmartContractsQuery): Promise<SmartContractsResult>;
  function connectToDB(query?: DBConnectionQuery): Promise<string>
  function get_permissions_by_public_key(query: PermissionQuery): Promise<PermissionResult>;
  function get_all_permissions(query: GetAllPermissionsQuery): Promise<any>
  function get_permission_link(query: GetPermissionQuery): Promise<any>
}

export = Postgres;
