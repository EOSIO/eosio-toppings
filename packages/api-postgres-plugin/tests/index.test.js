const {
  startConnection,
  endConnection,
  testConnection,
  testQuery,
  testQueryAsync
} = require('./db');
const get_blocks = require('./get_blocks');
const get_actions = require('./get_actions');
const get_actions_with_filter = require('./get_actions_with_filter');
const get_trx_action_list = require('./get_trx_action_list');
const get_transactions = require('./get_transactions');
const get_action_history = require('./get_action_history');

describe('PostgreSQL Plugin Tests', () => {
  beforeEach(() => jest.restoreAllMocks());

  describe('Check connection to PostgreSQL', testConnection);

  describe('Check PG query methods', () => {
    beforeAll(async () => await startConnection());

    describe('Postgres.query', testQuery);
    describe('Postgres.queryAsync', testQueryAsync);

    afterAll(() => endConnection());
  });

  describe('Check API methods', () => {
    beforeAll(async () => await startConnection());

    describe('get_blocks', get_blocks);
    describe('get_actions', get_actions);
    describe('get_actions_with_filter', get_actions_with_filter);
    describe('get_trx_action_list', get_trx_action_list);
    describe('get_transactions', get_transactions);
    describe('get_action_history', get_action_history);

    afterAll(() => endConnection());
  });
});
