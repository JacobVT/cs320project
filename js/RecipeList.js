/* global Item, Recipe */
// eslint-disable-next-line no-unused-vars
class RecipeList {
  constructor() {
    this.recipes = [];
  }

  getRecipeForItem(itemID) {
    for (let i = 0; i < this.recipes.length; i++) {
      if (this.recipes[i].result === itemID) {
        return this.recipes[i];
      }
    }
    return null;
  }

  // eslint-disable-next-line class-methods-use-this
  createPattern(array, itemsJSON) {
    const pattern = [[null, null, null], [null, null, null], [null, null, null]];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const key = array[i][j];
        if (key !== '_') {
          const { imgpath } = itemsJSON.items[key];
          const { display } = itemsJSON.items[key];
          const item = new Item(key, imgpath, display);
          pattern[i][j] = item;
        }
      }
    }
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
