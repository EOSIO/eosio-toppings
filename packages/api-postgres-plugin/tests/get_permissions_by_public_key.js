const Postgres = require('../api/db');
const get_permissions_by_public_key = require('../api/get_permissions_by_public_key');

const testcaseParameters = [
  [undefined, undefined],
  ['EOS8GAuHPARBLr8xNrAGNfFfc4mTLZixrFepdTpH22Vp81SiFh94g', undefined],
  ['EOS8GAuHPARBLr8xNrAGNfFfc4mTLZixrFepdTpH22Vp81SiFh94g', 100],
  ['sdfsdf', 100],
  ['EOS8GAuHPARBLr8xNrAGNfFfc4mTLZixrFepdTpH22Vp81SiFh94g', 100000],
  ['EOS8GAuHPARBLr8xNrAGNfFfc4mTLZixrFepdTpH22Vp81SiFh94g', '10'],
  ['EOS8GAuHPARBLr8xNrAGNfFfc4mTLZixrFepdTpH22Vp81SiFh94g', 'sdfsdf']
];

module.exports = () => {
  it('when `queryAsync` fails, it should return an empty array', async done => {
    const queryAsyncCall = jest
      .spyOn(Postgres, 'queryAsync')
      .mockRejectedValue(new Error('failed for whatever reason'));

    const permissions = await get_permissions_by_public_key({
      public_key: 'EOS8GAuHPARBLr8xNrAGNfFfc4mTLZixrFepdTpH22Vp81SiFh94g',
      records_count: 100
    });

    expect(queryAsyncCall).toBeCalledTimes(1);
    expect(permissions).toBeInstanceOf(Array);
    expect(permissions.length).toEqual(0);

    done();
  });

  describe.each(testcaseParameters)(
    'public_key = %s, records_count = %i',
    (public_key, records_count) => {
      it('format validation', async done => {
        const queryAsyncCall = jest.spyOn(Postgres, 'queryAsync');

        const permissions = await get_permissions_by_public_key({
          public_key,
          records_count
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
