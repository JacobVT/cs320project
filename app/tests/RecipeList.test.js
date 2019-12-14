/* eslint-env mocha, chai */
/*  global Item, Recipe, RecipeList, chai */

const coal = new Item('coal', '../textures/coal.png', 'Coal');
const stick = new Item('stick', '../textures/stick.png', 'Stick');
const torch = new Item('torch', '../textures/torch.png', 'Torch');

describe('RecipeList', function () {
  this.slow(0);
  this.timeout(10);

  context('processRecipes()', function () {
    const recipeList = new RecipeList();

    before(function () {
      recipeList.processRecipes('../mc_r4.json');
    });

    it('recipes should not be empty.', function () {
      chai.expect(recipeList.recipes.length).to.not.eql(0);
    });

    it('recipes should contain Patterns with Items.', function () {
      const isItem = recipeList.recipes[0].pattern[0][0] instanceof Item;
      chai.expect(isItem).to.eql(true);
    });
  });

  context('getRecipeForItem()', function () {
    it('should return the Recipe that crafts the given item.', function () {
      const recipeList = new RecipeList();
      const expectedPattern = [[coal, null, null], [stick, null, null], [null, null, null]];
      const expectedRecipe = new Recipe(expectedPattern, torch, 1);

      recipeList.recipes.push(expectedRecipe);
      chai.expect(recipeList.getRecipeForItem('torch')).to.eql(expectedRecipe);
    });
  });
});
