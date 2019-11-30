let itemList = [[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]]
let count = 1
let dragItem;

function allowDrop(ev) {
	ev.preventDefault();
}
  
function drag(ev) {
	dragItem = $(ev.target)
	attr = dragItem.attr('row');
	if (typeof attr !== typeof undefined && attr !== false) {
		let row = dragItem.attr('row')
		let col = dragItem.attr('col')
		dragItem.attr("draggable", "false")
		itemList[row][col] = -1
	}
}
  
function drop(ev) {
	$('.tile').removeClass('hover');
	ev.preventDefault();
	$(ev.target).attr('value', dragItem.attr('value'))
	let row = $(ev.target).attr('row')
	let col = $(ev.target).attr('col')
	$(ev.target).attr("draggable", "true")
	$(ev.target).attr("ondragstart", "drag(event)")
	$(ev.target).attr("src", dragItem.attr('src'))
	if (typeof dragItem.attr('row') !== typeof undefined && dragItem.attr('row') !== false) {
		dragItem.removeAttr("src")
	}
}

$(document).on('dragover', '.tile', function(){
  $(this).addClass('hover')
});

$(document).on('dragleave', '.tile', function(){
  $(this).removeClass('hover');
});