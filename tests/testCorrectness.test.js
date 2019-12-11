/* eslint-env mocha, chai */
/*  global Item, ItemList, Recipe, CraftingTable chai */

describe('ItemList', function () {
  const itemList = new ItemList();
  describe('processItems()', function () {
    itemList.processItems('../mc_r4.json');
    it('items should not be empty.', function () {
      chai.expect(itemList.items.length).to.not.eql(0);
    });
    it('items should contain Item instances.', function () {
      const isItem = itemList.items[0] instanceof Item;
      chai.expect(isItem).to.eql(true);
    });
  });
  describe('getItem()', function () {
    it('should return the correct item instance for apple', function () {
      chai.expect(itemList.getItem('apple').name).to.eql('Apple');
    });
    it('should return the null for banana', function () {
      chai.expect(itemList.getItem('banana')).to.eql(null);
    });
  });
});
