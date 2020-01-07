const Postgres = require('../api/db');
const get_actions = require('../api/get_actions');

const testcaseParameters = [
  [undefined, undefined],
  ['eosio', undefined],
  ['eosio', 100000],
  ['eosio', '10'],
  ['eosio', 'sdfsdf'],
  ['sdfsdf', 100]
];

module.exports = () => {
  it('when `queryAsync` fails, it should return an empty array', async done => {
    const queryAsyncCall = jest
      .spyOn(Postgres, 'queryAsync')
      .mockRejectedValue(new Error('failed for whatever reason'));

    const actions = await get_actions({
      account_name: 'eosio',
      records_count: 100
    });

    expect(queryAsyncCall).toBeCalledTimes(1);
    expect(actions).toBeInstanceOf(Array);
    expect(actions.length).toEqual(0);

    done();
  });

  describe.each(testcaseParameters)(
    'account_name = %s, records_count = %i',
    (account_name, records_count) => {
      it('format validation', async done => {
        const queryAsyncCall = jest.spyOn(Postgres, 'queryAsync');

        const actions = await get_actions({ account_name, records_count });

        expect(queryAsyncCall).toBeCalledTimes(1);
        expect(actions).toBeInstanceOf(Array);
        expect(actions.length).toBeLessThanOrEqual(
          Math.min(parseInt(records_count) || 100, 100)
        );

        actions.forEach(action => {
          expect(action.transaction_id).toBeDefined();
          expect(action.action_ordinal).toBeDefined();
          expect(action.act_account).toBeDefined();
          expect(action.act_name).toBeDefined();
          expect(action.act_data).toBeDefined();
          expect(action.timestamp).toBeInstanceOf(Date);
          expect(action.block_num).toBeDefined();
          expect(action.actor).toBeDefined();
          expect(action.permission).toBeDefined();
        });

        done();
      });
    }
  );
};
