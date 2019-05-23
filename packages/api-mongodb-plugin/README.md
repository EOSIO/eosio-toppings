# api-mongodb-plugin <a href="https://www.npmjs.com/package/@eosio-toppings/api-mongodb-plugin"><img alt="NPM Version" src="https://img.shields.io/npm/v/@eosio-toppings/api-mongodb-plugin.svg"></a>
RESTful API service making use of mongoose obtain data from MongoDB which written by nodeos with mongodb-plugin.

## Manual Usage
Install TypeScript and `tsc` (TypeScript Compiler) globally with
```
yarn global add typescript
```

## Compile and Watch
Compile the source into `js` and watch for changes into `./dist` with the following command:
```
rm -rf dist && tsc -w
```

## Test Service
Do `node dist/run.js` in order to spin a node service that lets you directly call the API for testing

## Currently Available API Functions

The following API functions all accept a single parameter, a query which is basically an object containing several keys composed of the necessary values to query the database.

### `get_abi`

Passing the `account_name` of the account/smart contract, attempt to get the ABI for the contract associated with `account_name`.

* `account_name` - string
* `records_count` - string

### `get_account_details`

Get the details of the account at `account_name`

* `account_name`

### `get_action_details`

Get the details of a particular action based on its `block_num` (block number) and/or `global_sequence`.

* `block_num` - string or number
* `global_sequence` - string or number

### `get_actions`

Get the list of actions based on certain criteria:

* `show_empty` - string - Whether to show empty actions or not
* `id_or_num` - string - Whether to search by ID or action number
* `records_count` - string - Number of actions to show

### `get_all_permissions`

Get the list of all available permissions based on the number of `records_count` to show.

* `records_count` - string

### `get_block_details`

Get the details of the block based on its ID or number as indicated by `id_or_num`.

* `id_or_num` - string

### `get_blocks`

Get the list of blocks based on certain criteria:

* `show_empty` - string - Whether to show empty blocks or not
* `id_or_num` - string - Whether to search by ID or block number
* `records_count` - string - Number of blocks to show

### `get_smart_contracts`

Get the list of all available smart contracts based on the number of `records_count` to show.

* `records_count` - string

### `get_transaction_details`

Get the details for a particular transaction based on its `id`.

* `id` - string

### `get_transactions`

Get the list of transactions based on certain criteria:

* `id` - string - Whether to search by ID or not
* `records_count` - string - Number of transactions to show
