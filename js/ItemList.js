class Item {
  constructor(id, imgpath, name) {
    this.id = id;
    this.imgpath = imgpath;
    this.name = name;
  }
}

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
    const itemKeys = Object.keys(itemsJSON.items)
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
            <img src="${this.items[i].imgpath}" 
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
          <td>${this.items[i].id}</td>
         </tr>
      `);
    }
  }
}

const list = new ItemList();
list.processItems('../mc_r1.json')
const itemTable = $('#itemTableBody');
list.generateTable(itemTable);
