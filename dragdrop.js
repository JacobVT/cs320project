var itemList = [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]];
var count = 1;
var dragItem;
function allowDrop(ev) {
    ev.preventDefault();
}
function drag(ev) {
    dragItem = $(ev.target);
    var attr = dragItem.attr('row');
    if (attr !== undefined) {
        var row = Number(dragItem.attr('row'));
        var col = Number(dragItem.attr('col'));
        dragItem.attr("draggable", "false");
        itemList[row][col] = -1;
    }
}
function drop(ev) {
    $('.tile').removeClass('hover');
    ev.preventDefault();
    $(ev.target).attr('value', dragItem.attr('value'));
    var row = $(ev.target).attr('row');
    var col = $(ev.target).attr('col');
    $(ev.target).attr("draggable", "true");
    $(ev.target).attr("ondragstart", "drag(event)");
    $(ev.target).attr("src", dragItem.attr('src'));
    if (dragItem.attr('row') !== undefined) {
        dragItem.removeAttr("src");
    }
}
$(document).on('dragover', '.tile', function () {
    $(this).addClass('hover');
});
$(document).on('dragleave', '.tile', function () {
    $(this).removeClass('hover');
});
