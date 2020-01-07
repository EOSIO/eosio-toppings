const Postgres = require('../api/db');
const get_actions_with_filter = require('../api/get_actions_with_filter');

const testcaseParameters = [
  [undefined, undefined, undefined, undefined, undefined, undefined, undefined],
  [
    'contract',
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined
  ],
  ['contract', 'eosio', undefined, undefined, undefined, undefined, undefined],
  ['contract', 'eosio', undefined, undefined, 100, undefined, undefined],
  ['contract', 'eosio', undefined, undefined, 100, 'next', undefined],
  ['contract', 'eosio', undefined, undefined, 100, 'prev', undefined],
  ['contract', 'eosio', undefined, undefined, 100, undefined, 'true'],
  ['contract', 'eosio', undefined, undefined, 100, undefined, 'false'],
  ['contract', 'eosio', undefined, undefined, 100, undefined, 'sadfsdf']
];

module.exports = () => {
  it('when `queryAsync` fails, it should return an empty array', async done => {
    const queryAsyncCall = jest
      .spyOn(Postgres, 'queryAsync')
      .mockRejectedValue(new Error('failed for whatever reason'));

    const response = await get_actions_with_filter({
      action_filter: 'contract',
      account_name: 'eosio',
      page_size: 100
    });

    expect(queryAsyncCall).toBeCalledTimes(1);
    expect(response).toBeInstanceOf(Object);
    expect(response.action_filter).toEqual('contract');

    done();
  });

  describe.each(testcaseParameters)(
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
        const queryAsyncCall = jest.spyOn(Postgres, 'queryAsync');

        const response = await get_actions_with_filter({
          action_filter,
          account_name,
          max_rgs,
          current_rgs,
          page_size,
          direction,
          show_data_size
        });

        expect(queryAsyncCall).toBeCalledTimes(
          show_data_size !== undefined && show_data_size !== 'false' ? 2 : 1
        );
        expect(response).toBeInstanceOf(Object);
        expect(response.data).toBeInstanceOf(Array);
        expect(response.max_rgs).toBeDefined();
        expect(response.data.length).toBeLessThanOrEqual(
          Math.min(parseInt(page_size) || 100, 100)
        );

        response.data.forEach((action, index, actions) => {
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

          if (index > 0) {
            expect(parseInt(action.receipt_global_sequence, 10)).toBeLessThan(
              parseInt(actions[index - 1].receipt_global_sequence, 10)
            );
          }
        });

        done();
      });
    }
  );
};
