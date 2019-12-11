/* global Item */

// eslint-disable-next-line no-unused-vars
class ItemList {
  constructor() {
    this.items = [];
  }

  /**
   * Returns a copy of an item from the item list.
   * @param {string} id - The id of the item as represented in the JSON database.
   * @return {null|any}
   */
  getItem(id) {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].id === id) {
        return Object.assign({}, this.items[i]);
      }
    }
    return null;
  }

  /**
   * @param {Item} item - Item to get uses of.
   * @param {Object} itemsJSON - JSON file containing item information.
   * @return {Array<Item>}
   */
  // eslint-disable-next-line class-methods-use-this
  createUsesFromJSON(item, itemsJSON) {
    const uses = [];
    if (item.id in itemsJSON.index) {
      const index = itemsJSON.index[item.id].recipes;
      index.forEach((key) => {
        const newItem = Item.createItemFromJSON(key, itemsJSON);
        uses.push(newItem);
      });
    }
    return uses;
  }

  /**
   * Initialize items through the given JSON file.
   * @param {string} jsonfile
   */
  processItems(jsonfile) {
    const request = new XMLHttpRequest();
    request.open('GET', jsonfile, false);
    request.send(null);

    const itemsJSON = JSON.parse(request.responseText);
    const itemKeys = Object.keys(itemsJSON.items);

    itemKeys.forEach((key) => {
      const item = Item.createItemFromJSON(key, itemsJSON);
      item.uses = this.createUsesFromJSON(item, itemsJSON);
      this.items.push(item);
    });
    this.items.sort(function (a, b) {
      return a.name.localeCompare(b.name);
    });
  }

  /**
   * Render ItemList in HTML.
   * @param {string} itemName - String to filter items by. If non-empty, only items with names containing this string
   *                            will be rendered.
   */
  generateTable(itemName) {
    const filterFn = (item) => {
      const lowerItem = item.name.toLowerCase();
      const search = itemName || '';
      return lowerItem.includes(search.toLowerCase());
    };

    const tableBody = $('#itemTableBody');
    tableBody.html(''); // clear table before adding search results

    for (const item of this.items.filter(filterFn)) {
      tableBody.append(`
        <tr>
          <th scope="row" width="10%">
            <img src="../${item.imgpath}"
                  alt=""
                  width="48px"
                  height="48px"
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
}
