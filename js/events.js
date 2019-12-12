/* global items, craftingTable, recipes */

let dragItem;
let dragElement;

// eslint-disable-next-line no-unused-vars
function allowDrop(ev) {
  ev.preventDefault();
}

/**
 * Prepares for drop event into crafting table.
 * @param ev
 */
// eslint-disable-next-line no-unused-vars
function drag(ev) {
  dragElement = $(ev.target);
  if (dragElement.attr('row') !== undefined) {
    const row = dragElement.attr('row');
    const col = dragElement.attr('col');
    dragItem = craftingTable.getItem(row, col);
  } else {
    const value = dragElement.attr('value');
    dragItem = items.getItem(value);
  }
}

/**
 * Adds dragItem into crafting table at specified row and column.
 * @param ev
 */
// eslint-disable-next-line no-unused-vars
function drop(ev) {
  $('.tile').removeClass('hover');
  ev.preventDefault();
  const tile = $(ev.target);
  const row = tile.attr('row');
  const col = tile.attr('col');
  if (row !== undefined) {
    if (dragElement.attr('row') !== undefined) {
      const oldRow = dragElement.attr('row');
      const oldCol = dragElement.attr('col');
      craftingTable.insertItem(oldRow, oldCol, null);
    }
    craftingTable.insertItem(row, col, dragItem);
    craftingTable.display();
  }
}

/**
 * Clears rendered table in HTML.
 * @param ev
 */
function clearTable(ev) {
  craftingTable.clear();
  craftingTable.display();
}

/**
 * Attempts to craft an item from the given table, and renders result.
 * @param ev
 */
function craft(ev) {
  let itemUses;
  const recipeUses = [];
  let i;
  let j;

  for (i = 0; i <= 2; i++) {
    for (j = 0; j <= 2; j++) {
      if (craftingTable.pattern[i][j] != null) {
        itemUses = craftingTable.pattern[i][j].uses;
      }
    }
  }

  for (i = 0; i < itemUses.length; i++) {
    recipeUses.push(recipes.getRecipeForItem(itemUses[i].id));
  }

  console.log(craftingTable.tryCraft(recipeUses));
}

$(document).on('dragover', '.tile', function () {
  $(this).addClass('hover');
});

$(document).on('dragleave', '.tile', function () {
  $(this).removeClass('hover');
});

$(document).on('click', '#search-button', function () {
  const search = $('#search').val();
  items.generateTable(search);
});
