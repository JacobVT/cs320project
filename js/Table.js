/* global Pattern */

// eslint-disable-next-line no-unused-vars
class Table {
  constructor(pattern) {
    if (pattern !== undefined) {
      this.pattern = pattern;
    } else {
      this.clear(); // default to an empty table
    }
  }

  /**
   * Insert an item into the table in the specified row and column.
   *
   * @param {number} row - The row to insert into (must be 0, 1, or 2).
   * @param {number} col - The column to insert into (must be 0, 1, or 2).
   * @param {Item} item - The item to insert.
   */
  insertItem(row, col, item) {
    this.pattern[col][row] = item;
  }

  /**
   * Get the table items' names.
   * @returns {string[][]}
   */
  getNames() {
    const getName = (item) => item.name;
    return this.pattern.map((items) => items.map(getName));
  }

  /**
   * Check if table matches recipe.
   * @param {Recipe} recipe
   * @returns {boolean}
   */
  isRecipe(recipe) {
    return Pattern.equals(this.pattern.getNames(), recipe.pattern);
  }

  /**
   * Remove all items from the table.
   */
  clear() {
    this.pattern = [[null, null, null], [null, null, null], [null, null, null]];
  }

  /**
   * Convert table to renderable HTML.
   * @returns {HTMLElement}
   */
  toHTML() {
    // TODO implement this
    return undefined;
  }

  /**
   * Attempt to craft an item with the given table layout.
   * @returns {undefined | Item}
   */
  tryCraft() {
    const recipes = undefined; // TODO get list of valid recipes to search
    const targetRecipe = recipes.find((r) => this.isRecipe(r));

    if (targetRecipe === undefined) {
      return undefined;
    }

    return targetRecipe.yield;
  }
}
