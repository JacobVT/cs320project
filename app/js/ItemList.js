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
    if (id == null) {
      return null;
    }

    for (const item of this.items) {
      if (item.id === id) {
        return item;
      }
    }

    return null;
  }

  /**
   * @param {Item} item - Item to get uses of.
   * @param {Object} itemsJson - JSON containing item information.
   * @return {Array<Item>} - Items that are craftable with given item.
   */
  createUsesFromJSON(item, itemsJson) {
    const uses = [];
    const jsonItem = itemsJson.index[item.id];

    if (jsonItem === undefined) {
      return [];
    }

    for (const key of jsonItem.recipes) {
      const newItem = Item.createItemFromJSON(key, itemsJson);
      uses.push(newItem);
    }

    return uses;
  }

  /**
   * Initialize items through the given JSON file.
   * @param {string} jsonFile - Path to JSON database
   */
  processItems(jsonFile) {
    const request = new XMLHttpRequest();
    request.open('GET', jsonFile, false);
    request.send(null);

    const itemsJSON = JSON.parse(request.responseText);
    const itemKeys = Object.keys(itemsJSON.items);

    for (const key of itemKeys) {
      const item = Item.createItemFromJSON(key, itemsJSON);
      item.uses = this.createUsesFromJSON(item, itemsJSON);
      this.items.push(item);
    }

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
    const predicate = (item) => {
      const lowerItem = item.name.toLowerCase();
      const search = itemName || '';
      return lowerItem.includes(search.toLowerCase());
    };

    const tableBody = $('#itemTableBody');
    tableBody.html(''); // clear table before adding search results

    for (const item of this.items.filter(predicate)) {
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
