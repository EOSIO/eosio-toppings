const Postgres = require('../api/db');
const get_transactions = require('../api/get_transactions');

const testcaseParameters = [
  [undefined],
  [10],
  [100000],
  ['10'],
  ['dfdfg'],
  [100]
];

module.exports = () => {
  it('when `queryAsync` fails, it should return an empty array', async done => {
    const queryAsyncCall = jest
      .spyOn(Postgres, 'queryAsync')
      .mockRejectedValue(new Error('failed for whatever reason'));

    const blocks = await get_transactions({
      records_count: 100
    });

    expect(queryAsyncCall).toBeCalledTimes(1);
    expect(blocks).toBeInstanceOf(Array);
    expect(blocks.length).toEqual(0);

    done();
  });

  describe.each(testcaseParameters)('records_count = %i', records_count => {
    it('format validation', async done => {
      const queryAsyncCall = jest.spyOn(Postgres, 'queryAsync');

      const transactions = await get_transactions({ records_count });

      expect(queryAsyncCall).toBeCalledTimes(1);
      expect(transactions).toBeInstanceOf(Array);
      expect(transactions.length).toBeLessThanOrEqual(
        Math.min(parseInt(records_count) || 100, 100)
      );

      transactions.forEach(transaction => {
        expect(transaction.id).toBeDefined();
        expect(transaction.block_num).toBeDefined();
        expect(transaction.partial_expiration).toBeInstanceOf(Date);
        expect(transaction.status).toBeDefined();
      });

      done();
    });
  });

  describe;
};
