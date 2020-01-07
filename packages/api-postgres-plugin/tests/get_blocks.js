const Postgres = require('../api/db');
const get_blocks = require('../api/get_blocks');

const testcaseParameters = [
  [undefined, undefined],
  ['true', undefined],
  ['true', 10],
  ['true', 100000],
  ['true', '10'],
  ['true', 'dfdfg'],
  ['false', 100],
  ['sdfsdf', 100]
];

module.exports = () => {
  it('when `queryAsync` fails, it should return an empty array', async done => {
    const queryAsyncCall = jest
      .spyOn(Postgres, 'queryAsync')
      .mockRejectedValue(new Error('failed for whatever reason'));

    const blocks = await get_blocks({
      show_empty: 'true',
      records_count: 100
    });

    expect(queryAsyncCall).toBeCalledTimes(1);
    expect(blocks).toBeInstanceOf(Array);
    expect(blocks.length).toEqual(0);

    done();
  });

  describe.each(testcaseParameters)(
    'empty_block = %s, records_count = %i',
    (show_empty, records_count) => {
      it('format validation', async done => {
        const queryAsyncCall = jest.spyOn(Postgres, 'queryAsync');

        const blocks = await get_blocks({ show_empty, records_count });

        expect(queryAsyncCall).toBeCalledTimes(1);
        expect(blocks).toBeInstanceOf(Array);
        expect(blocks.length).toBeLessThanOrEqual(
          Math.min(parseInt(records_count) || 100, 100)
        );

        blocks.forEach(block => {
          expect(block.block_id).toBeDefined();
          expect(block.block_num).toBeDefined();
          expect(block.timestamp).toBeInstanceOf(Date);
          expect(block.transaction_count).toBeDefined();

          if (show_empty !== 'true') {
            expect(block.transaction_count).toBeGreaterThan(0);
          }
        });

        done();
      });
    }
  );

  describe;
};
