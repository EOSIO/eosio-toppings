const { startConnection, endConnection } = require('./connection');
const get_blocks = require('./get_blocks');
const get_actions = require('./get_actions');
const get_actions_with_filter = require('./get_actions_with_filter');
const get_trx_action_list = require('./get_trx_action_list');
const get_transactions = require('./get_transactions');
const get_action_history = require('./get_action_history');
const get_all_permissions = require('./get_all_permissions');
const get_permissions_by_public_key = require('./get_permissions_by_public_key');

describe('PostgreSQL Plugin Tests', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('Check connection to PostgreSQL', async done => {
    await startConnection();
    await endConnection();
    done();
  });

  describe('Check API methods', () => {
    beforeAll(async () => await startConnection());

    describe('get_blocks', get_blocks);
    describe('get_actions', get_actions);
    describe('get_actions_with_filter', get_actions_with_filter);
    describe('get_trx_action_list', get_trx_action_list);
    describe('get_transactions', get_transactions);
    describe('get_action_history', get_action_history);
    describe('get_all_permissions', get_all_permissions);
    describe('get_permissions_by_public_key', get_permissions_by_public_key);

    afterAll(() => endConnection());
  });
});
