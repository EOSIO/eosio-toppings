const Postgres = require('../api/db');
const get_permission_link = require('../api/get_permission_link');

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

    const permissionLinks = await get_permission_link({
      account_name: 'eosio',
      records_count: 100
    });

    expect(queryAsyncCall).toBeCalledTimes(1);
    expect(permissionLinks).toBeInstanceOf(Array);
    expect(permissionLinks.length).toEqual(0);

    done();
  });

  describe.each(testcaseParameters)(
    'account_name = %s, records_count = %i',
    (account_name, records_count) => {
      it('format validation', async done => {
        const queryAsyncCall = jest.spyOn(Postgres, 'queryAsync');

        const permissionLinks = await get_permission_link({
          account_name,
          records_count
        });

        expect(queryAsyncCall).toBeCalledTimes(1);
        expect(permissionLinks).toBeInstanceOf(Array);
        expect(permissionLinks.length).toBeLessThanOrEqual(
          Math.min(parseInt(records_count) || 100, 100)
        );

        permissionLinks.forEach(permissionLink => {
          expect(permissionLink.account).toBeDefined();
          expect(permissionLink.contract).toBeDefined();
          expect(permissionLink.action_name).toBeDefined();
          expect(permissionLink.permission).toBeDefined();
        });

        done();
      });
    }
  );
};
