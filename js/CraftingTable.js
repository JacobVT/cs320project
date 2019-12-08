/* global Pattern */

/**
 * Get the image path of the given item.
 * @param {Item} item
 * @return {string}
 */
function getItemImage(item) {
  if (item == null) {
    return '';
  }

  return item.imgpath;
}

// eslint-disable-next-line no-unused-vars
class CraftingTable {
  constructor(pattern) {
    if (pattern !== undefined) {
      this.pattern = pattern;
    } else {
      this.clear(); // default to an empty table
    }
  }

  /**
   * Insert an item into the table in the specified row and column.
   * @param {number} row - Must be 0, 1, or 2.
   * @param {number} col - Must be 0, 1, or 2.
   * @param {Item} item - The item to insert.
   */
  insertItem(row, col, item) {
    this.pattern[col][row] = item;
  }

  /**
   * Get item in the table at the specified row and column.
   * @param {number} row - Must be 0, 1, or 2.
   * @param {number} col - Must be 0, 1, or 2.
   * @returns {Item}
   */
  getItem(row, col) {
    return this.pattern[col][row];
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
   * Convert table to renderable HTML.
   * @returns {HTMLElement}
   */
  toHtml() {
    // helper function to generate table tile html
    const generateTile = (row, col, tileId) => `
        <div class="col-sm tile" id="${tileId}">
          <img style="width: 100%; height: 100%"
               src="${getItemImage(this.getItem(row, col))}"
               row="${row}"
               col="${col}"
               ondrop="drop(event)"
               ondragover="allowDrop(event)"
               width="100%"
               height="100%">
        </div>`;

    const tableHtml = document.createElement('div');
    $(tableHtml).className = 'card';

    $(tableHtml).append(`
      <img class="card-img" src="../images/crafting_table.jpg" alt="Crafting Table" width="60%" height="60%">
        <div class="card-img-overlay">
          <div style="height: 100%;" class="container">
            <div class="row" style="height: 100%; padding-right: 6%;">
              <div class="col" style="height: 100%; width: 40%">
                <div class="row" style="height: 33%;">
                  ${generateTile(0, 0, 'tile-topleft')}
                  ${generateTile(0, 1, 'tile-topmid')}
                  ${generateTile(0, 2, 'tile-topright')}
                </div>
                <div class="row" style="height: 33%;">
                  ${generateTile(1, 0, 'tile-midleft')}
                  ${generateTile(1, 1, 'tile-mid')}
                  ${generateTile(1, 2, 'tile-midright')}
                </div>
                <div class="row" style="height: 33%;">
                  ${generateTile(2, 0, 'tile-botleft')}
                  ${generateTile(2, 1, 'tile-botmid')}
                  ${generateTile(2, 2, 'tile-botright')}
                </div>
              </div>
              <div class="col align-self-center" style="height: 50%;">
                <div id="result">
                </div>
              </div>
            </div>
          </div>
        </div>
    `);

    return tableHtml;
  }

  /**
   * Update HTML with table's contents.
   */
  display() {
    $('#crafting_table').html(this.toHtml());
  }

  /**
   * Remove all items from the table.
   */
  clear() {
    this.pattern = [[null, null, null], [null, null, null], [null, null, null]];
    this.display();
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
