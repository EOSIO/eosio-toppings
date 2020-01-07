const Postgres = require('../api/db');
const get_action_history = require('../api/get_action_history');

const testcaseParameters = [
  [undefined, undefined, undefined],
  ['eosio', undefined, undefined],
  ['eosio', 'eosio', undefined],
  ['eosio', 'eosio', 100000],
  ['eosio', 'eosio', '10'],
  ['eosio', 'eosio', 'sdfsdf'],
  ['sdfsdf', 'eosio', 100]
];

module.exports = () => {
  it('when `queryAsync` fails, it should return an empty array', async done => {
    const queryAsyncCall = jest
      .spyOn(Postgres, 'queryAsync')
      .mockRejectedValue(new Error('failed for whatever reason'));

    const actions = await get_action_history({
      account_name: 'eosio',
      actor_name: 'eosio',
      records_count: 100
    });

    expect(queryAsyncCall).toBeCalledTimes(1);
    expect(actions).toBeInstanceOf(Array);
    expect(actions.length).toEqual(0);

    done();
  });

  describe.each(testcaseParameters)(
    'account_name = %s, actor_name = %s, records_count = %i',
    (account_name, actor_name, records_count) => {
      it('format validation', async done => {
        const queryAsyncCall = jest.spyOn(Postgres, 'queryAsync');

        const actions = await get_action_history({
          account_name,
          actor_name,
          records_count
        });

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
