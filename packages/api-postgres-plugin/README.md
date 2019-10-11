# api-postgres-plugin <a href="https://www.npmjs.com/package/@eosio-toppings/api-postgres-plugin"><img alt="NPM Version" src="https://img.shields.io/npm/v/@eosio-toppings/api-postgres-plugin.svg"></a>
RESTful API service making use of `pg` obtain data from POstgresDB which written by (history-tools)fill-pg with SHiP-plugin.

## Currently Available API Functions

The following API functions all accept a single parameter, a query which is basically an object containing several keys composed of the necessary values to query the database.

### `get_action_details`

Get the details of a particular action based on its `block_num` (block number), `id` (transaction id) and `action_ordinal`.

* `block_num` - string or number
* `id` - string
* `action_ordinal` - number

### `get_actions`

Get the list of actions based on certain criteria:

* `account_name` - string - if this value is passed then it fetches latest 100 transactions for smart contract `account_name`
* `records_count` - string - Number of actions to fetch (default is 100)

### `get_all_permissions`

Get the list of all last permissions based on the number of `records_count` to show.

* `records_count` - string
* `account_name` - if this is passed then fetches the permission for only that `account_name`

### `get_block_details`

Get the details of the block based on its ID or number as indicated by `id_or_num` and RPC `endpoint` to fetch action payload.

* `endpoint` - string
* `id_or_num` - string

### `get_blocks`

Get the list of blocks based on certain criteria:

* `show_empty` - string - Whether to show empty blocks or not
* `records_count` - string - Number of blocks to show

### get_permissions_by_public_key

Get the list of permissions based on its public_key

* `public_key` - string

### `get_smart_contracts`

Get the list of all available smart contracts based on the number of `records_count` to show.

* `records_count` - string

### `get_transaction_details`

Get the details for a particular transaction based on its `id` and RPC `endpoint` to fetch action payload.

* `id` - string
* `endpoint` - string 

### `get_transactions`

Get the list of transactions based on certain criteria:

* `records_count` - string - Number of transactions to show
