/* eslint-env mocha, chai */
/*  global getItemImage, getItemName, Item, Recipe, CraftingTable chai */

describe('CraftingTable', function () {
  const craftingTable = new CraftingTable();
  describe('clear()', function () {
    it('should initialize an empty pattern.', function () {
      this.slow(0);
      this.timeout(10);
      chai.expect(craftingTable.pattern).to.eql([[null, null, null], [null, null, null], [null, null, null]]);
    });
  });
  describe('insertItem()', function () {
    it('should add testItem to the table.', function () {
      const testItem = new Item('apple', '../textures/apple.png', 'Apple');
      craftingTable.display = () => {}; // mock display() since it requires jquery
      craftingTable.insertItem(1, 2, testItem);
      this.slow(0);
      this.timeout(10);
      chai.expect(craftingTable.pattern[2][1]).to.eql(testItem);
    });
  });
  describe('getItem()', function () {
    it('should retrieve an Item from the table.', function () {
      craftingTable.display = () => {}; // mock display() since it requires jquery
      const expectedItem = new Item('apple', '../textures/apple.png', 'Apple');
      craftingTable.pattern[2][1] = expectedItem;
      const testItem = craftingTable.getItem(1, 2);
      this.slow(0);
      this.timeout(10);
      chai.expect(testItem).to.eql(expectedItem);
    });
  });
  describe('isRecipe()', function () {
    craftingTable.clear();
    const coal = new Item('coal', '../textures/coal.png', 'Coal');
    const stick = new Item('stick', '../textures/stick.png', 'Stick');
    const torch = new Item('torch', '../textures/torch.png', 'Torch');
    const testRecipe = new Recipe([[coal, null, null], [stick, null, null], [null, null, null]], torch, 1);
    it('should return false for an invalid recipe.', function () {
      craftingTable.clear();
      craftingTable.insertItem(0, 0, coal);
      this.slow(0);
      this.timeout(10);
      chai.expect(craftingTable.isRecipe(testRecipe)).to.eql((false));
    });
    it('should return true for a valid recipe.', function () {
      craftingTable.clear();
      craftingTable.insertItem(0, 0, coal);
      craftingTable.insertItem(1, 0, stick);
      this.slow(0);
      this.timeout(10);
      chai.expect(craftingTable.isRecipe(testRecipe)).to.eql((true));
    });
  });
  describe('getItemImage()', function () {
    it('should get the image path for an Item.', function () {
      const testItem = new Item('apple', '../textures/apple.png', 'Apple');
      this.slow(0);
      this.timeout(10);
      chai.expect(getItemImage(testItem)).to.eql('../textures/apple.png');
    });
  });
  describe('getItemName()', function () {
    it('should get the name for an Item.', function () {
      const testItem = new Item('apple', '../textures/apple.png', 'Apple');
      this.slow(0);
      this.timeout(10);
      chai.expect(getItemName(testItem)).to.eql('Apple');
    });
  });
});
