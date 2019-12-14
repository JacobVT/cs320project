/* global items, craftingTable, recipes */

let dragItem;
let dragElement;

// eslint-disable-next-line no-unused-vars
function allowDrop(ev) {
  ev.preventDefault();
}

/**
 * Prepare for drop event into crafting table.
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
 * Add dragItem into crafting table at specified row and column.
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
    craftingTable.removeResult();
    craftingTable.display();
  }
}

/**
 * Clear rendered table in HTML.
 * @param ev
 */
// eslint-disable-next-line no-unused-vars
function clearTable(ev) {
  craftingTable.clear();
  craftingTable.display();
}

/**
 * Attempt to craft an item from the given table, and renders result.
 * @param ev
 */
// eslint-disable-next-line no-unused-vars
function craft(ev) {
  let itemUses;
  const recipeUses = [];

  for (const row of craftingTable.pattern) {
    for (const item of row) {
      if (item != null) {
        itemUses = item.uses;
      }
    }
  }

  if (itemUses !== undefined) {
    for (const use of itemUses) {
      recipeUses.push(recipes.getRecipeForItem(use.id));
    }

    craftingTable.result = craftingTable.tryCraft(recipeUses);
    craftingTable.display();
  }
}

/**
 * Highlight tile when item is dragged over it.
 */
$(document).on('dragover', '.tile', function () {
  $(this).addClass('hover');
});

/**
 * Remove drag highlight when cursor leaves.
 */
$(document).on('dragleave', '.tile', function () {
  $(this).removeClass('hover');
});

/**
 * Update list of items based on search query.
 */
$(document).on('click', '#search-button', function () {
  const search = $('#search').val();
  items.generateTable(search);
});
