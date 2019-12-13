// eslint-disable-next-line no-unused-vars
class Item {
  constructor(id, imgpath, name) {
    this.id = id;
    this.imgpath = imgpath;
    this.name = name;
    this.uses = []; // Items that this item can be used to craft
  }

  /**
   * Convert item id to an item object.
   * @param {string} itemID
   * @returns {Item}
   */
  static createItemFromJSON(itemID, itemsJSON) {
    const { imgpath } = itemsJSON.items[itemID];
    const { display } = itemsJSON.items[itemID];
    return new Item(itemID, imgpath, display);
  }
}
