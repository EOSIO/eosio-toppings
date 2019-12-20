const { startConnection, endConnection } = require('./connection');
const get_blocks = require('./get_blocks');
const get_actions = require('./get_actions');
const get_actions_with_filter = require('./get_actions_with_filter');
const get_trx_action_list = require('./get_trx_action_list');

describe('PostgreSQL Plugin Tests', () => {
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

    afterAll(() => endConnection());
  });
});
