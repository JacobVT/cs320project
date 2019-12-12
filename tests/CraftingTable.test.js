/* eslint-env mocha, chai */
/*  global getItemImage, Item, CraftingTable chai */

describe('CraftingTable', function () {
  const craftingTable = new CraftingTable();
  describe('clear()', function () {
    it('should initialize an empty pattern.', function () {
      this.slow(0);
      chai.expect(craftingTable.pattern).to.eql([[null, null, null], [null, null, null], [null, null, null]]);
    });
  });
  describe('insertItem()', function () {
    it('should add testItem to the table.', function () {
      const testItem = new Item('apple', '../textures/apple.png', 'Apple');
      craftingTable.display = () => {}; // mock display() since it requires jquery
      craftingTable.insertItem(1, 2, testItem);
      this.slow(0);
      chai.expect(craftingTable.pattern[2][1]).to.eql(testItem);
    });
  });
  describe('getItem()', function () {
    it('should add testItem to the table.', function () {
      craftingTable.display = () => {}; // mock display() since it requires jquery
      const expectedItem = new Item('apple', '../textures/apple.png', 'Apple');
      craftingTable.pattern[2][1] = expectedItem;
      const testItem = craftingTable.getItem(1, 2);
      this.slow(0);
      chai.expect(testItem).to.eql(expectedItem);
    });
  });
  describe('getItemImage()', function () {
    it('should add testItem to the table.', function () {
      const testItem = new Item('apple', '../textures/apple.png', 'Apple');
      this.slow(0);
      chai.expect(getItemImage(testItem)).to.eql('../textures/apple.png');
    });
  });
});
