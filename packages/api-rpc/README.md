# api-rpc <a href="https://www.npmjs.com/package/@eosio-toppings/api-rpc"><img alt="NPM Version" src="https://img.shields.io/npm/v/@eosio-toppings/api-rpc.svg"></a>
RESTful API service making use of the nodeos RPC API wrapper `eosjs` to obtain data from nodeos.

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

## Currently Available API Functions

The following API functions all accept a single parameter, a query which is basically an object containing several keys composed of the necessary values to make the RPC API call.

### `buy_ram`

Given a connected `endpoint` with `private_key, actor, permission, quantity` details, buys ram for the account `actor`.

* `endpoint` - string
* `private_key` - string
* `actor` - string
* `permission` - string
* `quantity` - number 

### `create_account`

Given a connected `endpoint` with `private_key, actor, permission` credentials, make an account consisting of `new_account_name` with the public `new_account_owner_key` and public `new_account_active_key`.
If you want to stake cpu, stake net and buy ram, pass the required parameters.

* `endpoint` - string
* `private_key` - string
* `actor` - string
* `permission` - string
* `new_account_name` - string
* `new_account_owner_key` - string
* `new_account_active_key` - string
* `delagate` - boolean (If the delagate is true then buy ram, stake cpu, and stake net actions are executed)
* `ram_bytes_buy_quantity` - number (default to 8192)
* `stake_net_quantity` - string (default to '1.0000 SYS')
* `stake_cpu_quantity` - string (default to '1.0000 SYS')

### `deploy_contract`

Given a connected `endpoint` with `private_key, account_name, permission, payload ` details, deploys contract to the `account_name` 

* `endpoint` - string
* `private_key` - string
* `account_name` - string
* `permission` - string
* `payload` - {
                `abi`: '<abi_file_content>',
                `wasm`: '<wasm_file_content>'
              }

### `get_abi`

Given a connected `endpoint`, try to get the abi details of `account_name` directly from the RPC API

* `endpoint` - string
* `account_name` - string

### `get_account_details`

Given a connected `endpoint`, try to get the account details of `account_name` directly with the RPC API

* `endpoint` - string
* `account_name` - string

### `get_block`

Given a connected `endpoint`, try to get the block details of `id_or_num` directly from the RPC API

* `endpoint` - string
* `id_or_num` - string (it can accept either block ID or block number)

### `get_info`

Given a connected `endpoint`, try to get basic information about the blockchain at `endpoint`

* `endpoint` - string

### `get_producer_schedule`

Given a connected `endpoint`, try to get producer schedule in the blockchain at `endpoint`

* `endpoint` - string

### `get_producers`

Given a connected `endpoint`, try to get producers details in the blockchain at `endpoint`

* `endpoint` - string

### `get_table_rows`

Given a connected `endpoint`, try to get the rows of multi-index table `table_name` of `contract_name`, if present

* `endpoint` - string
* `contract_name` - string
* `table_name` - string

### `push_action`

Given a connected `endpoint` with `private_key, actor, permission` credentials, push an action of `action_name` of the `account_name` smart contract with parameters contained in `payload`

* `endpoint` - string
* `account_name` - string
* `private_key` - string
* `actor` - string
* `permission` - string
* `action_name` - string
* `payload` - object

### `sell_ram`

Given a connected `endpoint` with `private_key, actor, permission, quantity` details, sell ram from the account `actor`.

* `endpoint` - string
* `private_key` - string
* `actor` - string
* `permission` - string
* `quantity` - number 

### stake_cpu

Given a connected `endpoint` with `private_key, actor, permission, quantity` details, stake cpu for the account `actor`.

* `endpoint` - string
* `private_key` - string
* `actor` - string
* `permission` - string
* `quantity` - number 

### stake_net

Given a connected `endpoint` with `private_key, actor, permission, quantity` details, stake net for the account `actor`.

* `endpoint` - string
* `private_key` - string
* `actor` - string
* `permission` - string
* `quantity` - number 

### unstake_cpu 

Given a connected `endpoint` with `private_key, actor, permission, quantity` details, unstake cpu for the account `actor`.

* `endpoint` - string
* `private_key` - string
* `actor` - string
* `permission` - string
* `quantity` - number 

### unstake_net

Given a connected `endpoint` with `private_key, actor, permission, quantity` details, unstake net for the account `actor`.

* `endpoint` - string
* `private_key` - string
* `actor` - string
* `permission` - string
* `quantity` - number 

### `update_auth`

Given a connected `endpoint` with `private_key, account_name` credentials, push one or two `updateauth` actions in a single transaction in order to update the public key(s) of `account_name`
The `new_active_key` and `new_owner_key` denote public keys, and can either be passed at the same time or passed one at a time.

* `endpoint` - string
* `account_name` - string
* `private_key` - string
* `new_active_key` - string
* `new_owner_key` - string
