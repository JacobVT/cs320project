/**
 * @callback predicate
 * @param {*} value - Value to check.
 * @returns {boolean}
 */

/**
 * Compare equality of two arrays.
 *
 * @param {Array<*>} ary1
 * @param {Array<*>} ary2
 * @param {predicate} elemsEqual - Function to compare array elements with. If undefined, `===` is used.
 * @returns {boolean}
 */
function arraysEqual(ary1, ary2, elemsEqual) {
  const equals = elemsEqual || ((a, b) => a === b); // use strict equals if elemsEqual isn't provided
  return ary1.every((elem, idx) => equals(elem, ary2[idx]));
}

/*
 * A pattern is a 3x3 grid of item names (as strings) that are used in crafting an item,
 * represented as an array of arrays [topRow, middleRow, bottomRow].
 */

// eslint-disable-next-line no-unused-vars
class Pattern {
  static equals(p1, p2) {
    if (p1 === p2) {
      return true;
    }

    if (p1 === undefined || p2 === undefined) {
      return false;
    }

    return arraysEqual(p1, p2, arraysEqual);
  }
}
