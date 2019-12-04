class ItemList {
  constructor() {
    this.items = [];
  }

  getItem(index) {
    return this.items[index];
  }

  processItems(jsonfile) {
    const request = new XMLHttpRequest();
    request.open('GET', jsonfile, false);
    request.send(null)
    const itemsJSON = JSON.parse(request.responseText);
    itemsJSON.forEach((item) => {
      this.items.push(item);
    });
  }
}

const itemList = new ItemList()
