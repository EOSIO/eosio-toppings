const get_trx_action_list = require('../api/get_trx_action_list');

module.exports = () => {
  describe.each([
    [undefined, undefined],
    ['eosio', undefined],
    ['eosio', 100000],
    ['eosio', '10'],
    ['eosio', 'sdfsdf'],
    ['sdfsdf', 100]
  ])('account_name = %s, records_count = %i', (account_name, records_count) => {
    it('format validation', async done => {
      const actions = await get_trx_action_list({
        account_name,
        records_count
      });

      expect(actions).toBeInstanceOf(Array);
      expect(actions.length).toBeLessThanOrEqual(
        Math.min(parseInt(records_count) || 100, 100)
      );

      actions.forEach(action => {
        expect(action.id).toBeDefined();
        expect(action.block_num).toBeDefined();
        expect(action.timestamp).toBeInstanceOf(Date);
        expect(action.act_account).toBeDefined();
        expect(action.act_name).toBeDefined();
        expect(action.action_ordinal).toBeDefined();
      });

      done();
    });
  });
};
