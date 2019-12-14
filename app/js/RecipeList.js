/* global Item, Recipe */
// eslint-disable-next-line no-unused-vars
class RecipeList {
  constructor() {
    this.recipes = [];
  }

  /**
   * Find the recipe needed to make the given item.
   * @param {string} itemId - The ID of the target item.
   * @return {Recipe | null}
   */
  getRecipeForItem(itemId) {
    for (const recipe of this.recipes) {
      if (recipe.result.id === itemId) {
        return recipe;
      }
    }

    return null;
  }

  /**
   * Create a pattern from a grid of item IDs.
   * @param {Array<Array<string>>} idGrid - A 3x3 grid of item IDs to create a pattern from.
   * @param {Object} itemsJson - JSON containing item information.
   * @return {Array<Array<Item>>} - The resulting pattern.
   */
  // eslint-disable-next-line class-methods-use-this
  createPattern(idGrid, itemsJson) {
    const pattern = [[null, null, null], [null, null, null], [null, null, null]];

    idGrid.forEach((row, i) => row.forEach((id, j) => {
      const key = idGrid[i][j];

      if (key !== '_') {
        const { imgpath } = itemsJson.items[key];
        const { display } = itemsJson.items[key];
        const item = new Item(key, imgpath, display);
        pattern[i][j] = item;
      }
    }));

    return pattern;
  }

  processRecipes(jsonfile) {
    const request = new XMLHttpRequest();
    request.open('GET', jsonfile, false);
    request.send(null);

    const itemsJSON = JSON.parse(request.responseText);
    const recipeKeys = Object.keys(itemsJSON.recipes);

    recipeKeys.forEach((key) => {
      const { imgpath } = itemsJSON.items[key];
      const { display } = itemsJSON.items[key];
      const result = new Item(key, imgpath, display);
      const pattern = this.createPattern(itemsJSON.recipes[key].ingredients, itemsJSON);
      const recipe = new Recipe(pattern, result, itemsJSON.recipes[key].pattern);
      this.recipes.push(recipe);
    });
  }
}
