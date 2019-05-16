# api-rpc <img alt="NPM Version" src="https://img.shields.io/npm/v/EOSIO/api-rpc.svg">
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

### `create_account`

Given a connected `endpoint` with `private_key, actor, permission` credentials, make an account consisting of `new_account_name` with the public `new_account_owner_key` and public `new_account_active_key`.

* `endpoint` - string
* `private_key` - string
* `actor` - string
* `permission` - string
* `new_account_name` - string
* `new_account_owner_key` - string
* `new_account_active_key` - string

### `get_account_details`

Given a connected `endpoint`, try to get the account details of `account_name` directly with the RPC API

* `endpoint` - string
* `account_name` - string

### `get_info`

Given a connected `endpoint`, try to get basic information about the blockchain at `endpoint`

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
