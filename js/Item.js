// eslint-disable-next-line no-unused-vars
class Item {
  constructor(id, imgpath, name) {
    this.id = id;
    this.imgpath = imgpath;
    this.name = name;
    this.uses = []; // Items that this item can be used to craft
  }

  /**
   * Convert item name to an item object.
   * @param {string} itemName
   * @returns {Item}
   */
  static fromString(itemName) {
    // TODO fully implement this (check if itemName is valid, then get corresponding id and imgpath)
    return new Item(undefined, undefined, itemName);
  }
}
