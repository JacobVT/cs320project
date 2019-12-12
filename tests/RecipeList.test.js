/* eslint-env mocha, chai */
/*  global Item, Recipe, RecipeList chai */

describe('RecipeList', function () {
  const recipeList = new RecipeList();
  describe('processRecipes()', function () {
    recipeList.processRecipes('../mc_r4.json');
    it('recipes should not be empty.', function () {
      this.slow(0);
      chai.expect(recipeList.recipes.length).to.not.eql(0);
    });
    it('recipes should contain Patterns with Items.', function () {
      const isItem = recipeList.recipes[0].pattern[0][0] instanceof Item;
      this.slow(0);
      chai.expect(isItem).to.eql(true);
    });
  });
});
