
// import get_blocks from './api/get_blocks';
const get_blocks = require('./api/get_blocks');
const get_all_permissions = require('./api/get_all_permissions');
const get_smart_contracts = require('./api/get_smart_contracts');
const get_block_details = require('./api/get_block_details');

module.exports = {
  get_blocks,
  get_all_permissions,
  get_smart_contracts,
  get_block_details
};
