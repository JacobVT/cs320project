/* global Pattern */

/**
 * Get the image path of the given item.
 * @param {Item} item
 * @return {string}
 */
function getItemImage(item) {
  if (item == null) {
    return 'images/empty.png';
  }

  return item.imgpath;
}

/**
 * Get the display name of the given item.
 * @param {Item} item
 * @return {string}
 */
function getItemName(item) {
  if (item == null) {
    return '';
  }

  return item.name;
}


// eslint-disable-next-line no-unused-vars
class CraftingTable {
  constructor(pattern) {
    this.result = null;
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
    this.display();
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
    const getName = (item) => {
      if (item == null) {
        return null;
      }

      return item.name;
    };

    return this.pattern.map((items) => items.map(getName));
  }

  /**
   * Check if table matches recipe.
   * @param {Recipe} recipe
   * @returns {boolean}
   */
  isRecipe(recipe) {
    const tableIds = [[null, null, null], [null, null, null], [null, null, null]];
    const recipeIds = [[null, null, null], [null, null, null], [null, null, null]];

    if (recipe.isStrict) {
      for (let i = 0; i <= 2; i++) {
        for (let j = 0; j <= 2; j++) {
          if (this.pattern[j][i] !== null) {
            tableIds[i][j] = this.pattern[j][i].id;
          }

          if (recipe.pattern[i][j] !== null) {
            recipeIds[i][j] = recipe.pattern[i][j].id;
          }
        }
      }

      return Pattern.equals(Pattern.align(tableIds), recipeIds);
    } else {
      const t = [];
      const r = [];

      for (let i = 0; i <= 2; i++) {
        for (let j = 0; j <= 2; j++) {
          if (this.pattern[i][j] != null) {
            t.push(this.pattern[i][j].id);
          }

          if (recipe.pattern[i][j] != null) {
            r.push(recipe.pattern[i][j].id);
          }
        }
      }

      const compare = (a, b) => a.localeCompare(b);
      t.sort(compare);
      r.sort(compare);

      return t.toString() === r.toString();
    }
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
               src="../${getItemImage(this.getItem(row, col))}"
               row="${row}"
               col="${col}"
               ondrop="drop(event)"
               ondragover="allowDrop(event)"
               draggable="true" 
                ondragstart="drag(event)"
               width="100%"
               height="100%">
        </div>`;

    const generateResult = (result) => `
      <div id="result">
        <img style="width: 100%; height: 100%"
           src="../${getItemImage(result)}"
           width="100%"
           height="100%">
       </div>
       <div class="minecraft result-tag">${getItemName(result)}</div>
    `;

    const tableHtml = document.createElement('div');
    $(tableHtml).className = 'card';

    $(tableHtml).append(`
      <img class="card-img" src="../images/crafting_table.jpg" alt="Crafting Table" width="100%" height="100%">
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
              <div class="col align-self-center">
                ${generateResult(this.result)}
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
    this.removeResult();
    this.pattern = [[null, null, null], [null, null, null], [null, null, null]];
  }

  removeResult() {
    this.result = null;
  }

  /**
   * Attempt to craft an item with the given table layout.
   * @returns {Item | undefined}
   */
  tryCraft(recipes) {
    const targetRecipe = recipes.find((r) => this.isRecipe(r));

    if (targetRecipe === undefined) {
      return undefined;
    }

    return targetRecipe.result;
  }
}
