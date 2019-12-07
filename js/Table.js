/* global Pattern */

/**
 * Get the image path of the given item.
 * @param {Item} item
 * @return {string}
 */
function getItemImage(item) {
  if (item == null) {
    // TODO replace empty string with a blank tile icon
    return '';
  }

  return item.imgpath;
}

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
   * Remove all items from the table.
   */
  clear() {
    this.pattern = [[null, null, null], [null, null, null], [null, null, null]];
  }

  /**
   * Convert table to renderable HTML.
   * @returns {HTMLElement}
   */
  toHtml() {
    // helper function to generate table tile html
    const generateTile = (row, col) => {
      let rowName;
      let colName;

      if (row === 0) {
        rowName = 'top';
      } else if (row === 1) {
        rowName = 'mid';
      } else {
        rowName = 'bot';
      }

      if (col === 0) {
        colName = 'left';
      } else if (col === 1) {
        colName = 'mid';
      } else {
        colName = 'right';
      }

      if (rowName === colName) {
        // avoid names like 'midmid'
        colName = '';
      }

      return `
        <div class="col-sm tile" id="tile-${rowName}${colName}">
          <img style="width: 100%; height: 100%"
               src="${getItemImage(this.getItem(row, col))}" row="${row}" col="${col}"
               ondrop="drop(event)"
               ondragover="allowDrop(event)"
               width="100%"
               height="100%">
        </div>`;
    };

    const tableHtml = document.createElement('div');
    $(tableHtml).className = 'card crafting_table';

    $(tableHtml).append(`
      <img class="card-img" src="../images/crafting_table.jpg" alt="Crafting Table" width="60%" height="60%">
        <div class="card-img-overlay">
          <div style="height: 100%;" class="container">
            <div class="row" style="height: 100%; padding-right: 6%;">
              <div class="col" style="height: 100%; width: 40%">
                <div class="row" style="height: 33%;">
                  ${generateTile(0, 0)}
                  ${generateTile(0, 1)}
                  ${generateTile(0, 2)}
                </div>
                <div class="row" style="height: 33%;">
                    ${generateTile(1, 0)}
                    ${generateTile(1, 1)}
                    ${generateTile(1, 2)}
                </div>
                <div class="row" style="height: 33%;">
                  ${generateTile(2, 0)}
                  ${generateTile(2, 1)}
                  ${generateTile(2, 2)}
                </div>
              </div>
              <div class="col align-self-center" style="height: 50%;">
                <div class="result">
                </div>
              </div>
            </div>
          </div>
        </div>
    `);

    return tableHtml;
  }

  display() {
    $('#crafting_table').html(this.toHtml());
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
