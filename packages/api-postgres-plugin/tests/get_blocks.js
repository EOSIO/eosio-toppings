const get_blocks = require('../api/get_blocks');

module.exports = () => {
  describe.each([
    [undefined, undefined],
    ['true', undefined],
    ['true', 10],
    ['true', 100000],
    ['true', '10'],
    ['true', 'dfdfg'],
    ['false', 100],
    ['sdfsdf', 100]
  ])('empty_block = %s, records_count = %i', (show_empty, records_count) => {
    it('format validation', async done => {
      const blocks = await get_blocks({ show_empty, records_count });

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
  });
};
