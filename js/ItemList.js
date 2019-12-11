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
      this.items.push(item);
    });
  }

  generateTable(tableBody) {
    for (let i = 0; i < this.items.length; i++) {
      tableBody.append(`
        <tr>
          <th scope="row" width="7%">
            <img src="../${this.items[i].imgpath}" 
                  alt=""
                  width="32px" 
                  height="32px"
                  id="dragTest1" 
                  value="${this.items[i].id}" 
                  draggable="true" 
                  ondragstart="drag(event)"
              >
          </th>
          <td>${this.items[i].name}</td>
         </tr>
      `);
    }
  }
}
