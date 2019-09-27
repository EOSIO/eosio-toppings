
// import get_blocks from './api/get_blocks';
const get_blocks = require('./api/get_blocks');
const get_block_details = require('./api/get_block_details');
const get_transactions = require('./api/get_transactions');
const get_trx_action_list = require('./api/get_trx_action_list');
const get_transaction_details = require('./api/get_transaction_details');
const get_all_permissions = require('./api/get_all_permissions');
const get_smart_contracts = require('./api/get_smart_contracts');
const get_actions = require('./api/get_actions');
const get_action_details = require('./api/get_action_details');
const get_permission_by_public_key = require('./api/get_permission_by_public_key');
const { connectToDB } = require('./api/db');

module.exports = {
  get_blocks,
  get_block_details,
  get_transactions,
  get_trx_action_list,
  get_transaction_details,
  get_all_permissions,
  get_smart_contracts,
  get_actions,
  get_action_details,
  get_permission_by_public_key,
  connectToDB
};
