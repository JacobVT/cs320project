/* global items, craftingTable, recipes */

let dragItem;
let dragElement;

// eslint-disable-next-line no-unused-vars
function allowDrop(ev) {
  ev.preventDefault();
}

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
      craftingTable.insertItem( oldRow, oldCol, null);
    }
    craftingTable.insertItem(row, col, dragItem);
    craftingTable.display();
  }
}

$(document).on('dragover', '.tile', function () {
  $(this).addClass('hover');
});

$(document).on('dragleave', '.tile', function () {
  $(this).removeClass('hover');
});
