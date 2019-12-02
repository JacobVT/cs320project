let itemList: number[][] = [[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]];
let dragItem: JQuery<HTMLBaseElement>;

function allowDrop(ev) {
	ev.preventDefault();
}

function drag(ev) {
	dragItem = $(ev.target);

	if (dragItem.attr('row') !== undefined) {
		const row: number = Number(dragItem.attr('row'));
		const col: number = Number(dragItem.attr('col'));
		dragItem.attr("draggable", "false");
		itemList[row][col] = -1;
	}
}

function drop(ev) {
	$('.tile').removeClass('hover');
	ev.preventDefault();

	$(ev.target).attr('value', dragItem.attr('value'));

	const target: JQuery<HTMLBaseElement> = $(ev.target);

	target.attr("draggable", "true");
	target.attr("ondragstart", "drag(event)");
	target.attr("src", dragItem.attr('src'));

	if (dragItem.attr('row') !== undefined) {
		dragItem.removeAttr("src");
	}
}

$(document).on('dragover', '.tile', function(){
  $(this).addClass('hover')
});

$(document).on('dragleave', '.tile', function(){
  $(this).removeClass('hover');
});