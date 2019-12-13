/* eslint-env mocha, chai */
/*  global Item, Recipe, RecipeList chai */

describe('RecipeList', function () {
  let recipeList = new RecipeList();
  describe('processRecipes()', function () {
    recipeList.processRecipes('../mc_r4.json');
    it('recipes should not be empty.', function () {
      this.slow(0);
      this.timeout(10);
      chai.expect(recipeList.recipes.length).to.not.eql(0);
    });
    it('recipes should contain Patterns with Items.', function () {
      const isItem = recipeList.recipes[0].pattern[0][0] instanceof Item;
      this.slow(0);
      this.timeout(10);
      chai.expect(isItem).to.eql(true);
    });
  });
  describe('getRecipeForItem()', function () {
    it('should return the Recipe that crafts the given item.', function () {
      recipeList = new RecipeList();
      const coal = new Item('coal', '../textures/coal.png', 'Coal');
      const stick = new Item('stick', '../textures/stick.png', 'Stick');
      const torch = new Item('torch', '../textures/torch.png', 'Torch');
      const expectedRecipe = new Recipe([[coal, null, null], [stick, null, null], [null, null, null]], torch, 1);
      recipeList.recipes.push(expectedRecipe);
      this.slow(0);
      this.timeout(10);
      chai.expect(recipeList.getRecipeForItem('torch')).to.eql(expectedRecipe);
    });
  });
});
