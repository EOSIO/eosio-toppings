const get_actions_with_filter = require('../api/get_actions_with_filter');

module.exports = () => {
  describe.each([
    [
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    ],
    [
      'contract',
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined
    ],
    ['contract', 'eosio', undefined, undefined, undefined, undefined, undefined]
  ])(
    'action_filter = %s, account_name = %s, max_rgs = %s, current_rgs = %s, page_size = %i, direction = %s, show_data_size = %s',
    (
      action_filter,
      account_name,
      max_rgs,
      current_rgs,
      page_size,
      direction,
      show_data_size
    ) => {
      it('format validation', async done => {
        const response = await get_actions_with_filter({
          action_filter,
          account_name,
          max_rgs,
          current_rgs,
          page_size,
          direction,
          show_data_size
        });

        expect(response).toBeInstanceOf(Object);
        expect(response.data).toBeInstanceOf(Array);
        expect(response.max_rgs).toBeDefined();
        expect(response.data.length).toBeLessThanOrEqual(
          Math.min(parseInt(page_size) || 100, 100)
        );

        response.data.forEach(action => {
          expect(action.id).toBeDefined();
          expect(action.block_num).toBeDefined();
          expect(action.timestamp).toBeInstanceOf(Date);
          expect(action.act_account).toBeDefined();
          expect(action.act_name).toBeDefined();
          expect(action.receipt_global_sequence).toBeDefined();
          expect(action.token_to).toBeDefined();
          expect(action.token_from).toBeDefined();
          expect(action.amount).toBeDefined();
          expect(action.symbol).toBeDefined();
        });

        done();
      });
    }
  );
};
