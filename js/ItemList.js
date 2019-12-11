/* global Item */

// eslint-disable-next-line no-unused-vars
class ItemList {
  constructor() {
    this.items = [];
  }

  getItem(id) {
    this.items.forEach((item) => {
      if (item.id === id) {
        return item;
      }
      return null;
    });

    return null;
  }

  // eslint-disable-next-line class-methods-use-this
  createUsesFromJSON(item, itemsJSON) {
    const uses = [];
    if (item.id in itemsJSON.index) {
      const index = itemsJSON.index[item.id].recipes;
      index.forEach((key) => {
        const { imgpath } = itemsJSON.items[key];
        const { display } = itemsJSON.items[key];
        const newItem = new Item(key, imgpath, display);
        uses.push(newItem);
      });
    }
    return uses;
  }

  processItems(jsonfile) {
    const request = new XMLHttpRequest();
    request.open('GET', jsonfile, false);
    request.send(null);

    const itemsJSON = JSON.parse(request.responseText);
    const itemKeys = Object.keys(itemsJSON.items);

    itemKeys.forEach((key) => {
      const { imgpath } = itemsJSON.items[key];
      const { display } = itemsJSON.items[key];
      const item = new Item(key, imgpath, display);
      item.uses = this.createUsesFromJSON(item, itemsJSON);
      this.items.push(item);
    });
    this.items.sort(function (a, b) {
      return a.name.localeCompare(b.name);
    });
  }

  generateTable(itemPrefix) {
    const filterFn = (item) => item.name.startsWith(itemPrefix || '');
    const tableBody = $('#itemTableBody');

    for (const item of this.items.filter(filterFn)) {
      tableBody.append(`
        <tr>
          <th scope="row" width="10%">
            <img src="../${item.imgpath}"
                  alt=""
                  width="48px"
                  height="48px"
                  id="dragTest1"
                  value="${item.id}"
                  draggable="true"
                  ondragstart="drag(event)"
              >
          </th>
          <td>${item.name}</td>
         </tr>
      `);
    }
  }

  filterItems(search) {
    const filtered = [];
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].name.toLowerCase().includes(search.toLowerCase())) {
        filtered.push(this.items[i]);
      }
    }
    return filtered;
  }
}
