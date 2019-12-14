/* eslint-env mocha, chai */
/*  global getItemImage, getItemName, Item, Recipe, CraftingTable, chai */

const coal = new Item('coal', '../textures/coal.png', 'Coal');
const stick = new Item('stick', '../textures/stick.png', 'Stick');
const torch = new Item('torch', '../textures/torch.png', 'Torch');
const testRecipe = new Recipe([[coal, null, null], [stick, null, null], [null, null, null]], torch, 1);

describe('CraftingTable', function () {
  this.slow(0);
  this.timeout(10);

  context('clear()', function () {
    it('should initialize an empty pattern.', function () {
      const craftingTable = new CraftingTable();
      const emptyPattern = [[null, null, null], [null, null, null], [null, null, null]];

      chai.expect(craftingTable.pattern).to.eql(emptyPattern);
    });
  });

  context('insertItem()', function () {
    it('should add testItem to the table.', function () {
      const craftingTable = new CraftingTable();
      craftingTable.display = () => {}; // mock display() since it requires jquery
      craftingTable.insertItem(1, 2, stick);

      chai.expect(craftingTable.pattern[2][1]).to.eql(stick);
    });
  });

  context('getItem()', function () {
    it('should retrieve an Item from the table.', function () {
      const craftingTable = new CraftingTable();
      craftingTable.display = () => {}; // mock display() since it requires jquery
      craftingTable.pattern[2][1] = coal;

      chai.expect(craftingTable.getItem(1, 2)).to.eql(coal);
    });
  });

  context('isRecipe()', function () {
    it('should return false for an invalid recipe.', function () {
      const craftingTable = new CraftingTable();
      craftingTable.insertItem(0, 0, coal);

      chai.expect(craftingTable.isRecipe(testRecipe)).to.eql(false);
    });

    it('should return true for a valid recipe.', function () {
      const craftingTable = new CraftingTable();
      craftingTable.insertItem(0, 0, coal);
      craftingTable.insertItem(1, 0, stick);
      chai.expect(craftingTable.isRecipe(testRecipe)).to.eql(true);
    });
  });

  context('getItemImage()', function () {
    it('should get the image path for an Item.', function () {
      const testItem = new Item('apple', '../textures/apple.png', 'Apple');
      chai.expect(getItemImage(testItem)).to.eql('../textures/apple.png');
    });
  });

  context('getItemName()', function () {
    it('should get the name for an Item.', function () {
      const testItem = new Item('apple', '../textures/apple.png', 'Apple');
      chai.expect(getItemName(testItem)).to.eql('Apple');
    });
  });
});
