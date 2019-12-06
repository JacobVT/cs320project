const itemList = [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]];
let dragItem;

// eslint-disable-next-line no-unused-vars
function allowDrop(ev) {
  ev.preventDefault();
}

// eslint-disable-next-line no-unused-vars
function drag(ev) {
  dragItem = $(ev.target);
  const attr = dragItem.attr('row');

  if (attr !== undefined) {
    const row = dragItem.attr('row');
    const col = dragItem.attr('col');

    dragItem.attr('draggable', 'false');
    itemList[row][col] = -1;
  }
}

// eslint-disable-next-line no-unused-vars
function drop(ev) {
  $('.tile').removeClass('hover');
  ev.preventDefault();

  $(ev.target).attr('value', dragItem.attr('value'));
  $(ev.target).attr('draggable', 'true');
  $(ev.target).attr('ondragstart', 'drag(event)');
  $(ev.target).attr('src', dragItem.attr('src'));

  if (dragItem.attr('row') !== undefined) {
    dragItem.removeAttr('src');
  }
}

$(document).on('dragover', '.tile', function () {
  $(this).addClass('hover');
});

$(document).on('dragleave', '.tile', function () {
  $(this).removeClass('hover');
});
