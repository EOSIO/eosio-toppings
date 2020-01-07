const Postgres = require('../api/db');
const get_all_permissions = require('../api/get_all_permissions');

const testcaseParameters = [
  [undefined, undefined, undefined],
  ['eosio', undefined, undefined],
  ['eosio', 100, undefined],
  ['eosio', 100, 'true'],
  ['sdfsdf', 100, 'true'],
  ['eosio', 100000, 'true'],
  ['eosio', '10', 'true'],
  ['eosio', 'sdfsdf', 'true'],
  ['eosio', 100, 'false'],
  ['eosio', 100, 'sdfsdfsd']
];

module.exports = () => {
  it('when `queryAsync` fails, it should return an empty array', async done => {
    const queryAsyncCall = jest
      .spyOn(Postgres, 'queryAsync')
      .mockRejectedValue(new Error('failed for whatever reason'));

    const permissions = await get_all_permissions({
      account_name: 'eosio',
      records_count: 100,
      fetch_eosio: 'true'
    });

    expect(queryAsyncCall).toBeCalledTimes(1);
    expect(permissions).toBeInstanceOf(Array);
    expect(permissions.length).toEqual(0);

    done();
  });

  describe.each(testcaseParameters)(
    'account_name = %s, records_count = %i, fetch_eosio = %s',
    (account_name, records_count, fetch_eosio) => {
      it('format validation', async done => {
        const queryAsyncCall = jest.spyOn(Postgres, 'queryAsync');

        const permissions = await get_all_permissions({
          account_name,
          records_count,
          fetch_eosio
        });

        expect(queryAsyncCall).toBeCalledTimes(1);
        expect(permissions).toBeInstanceOf(Array);
        expect(permissions.length).toBeLessThanOrEqual(
          Math.min(parseInt(records_count) || 100, 100)
        );

        permissions.forEach(permission => {
          expect(permission.account).toBeDefined();
          expect(permission.permission).toBeDefined();
          expect(permission.public_key).toBeDefined();
          expect(permission.last_updated).toBeInstanceOf(Date);
        });

        done();
      });
    }
  );
};
