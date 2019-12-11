/**
 * Type of callback passed to arraysEqual.
 * @callback comparator
 * @param {*} lhs
 * @param {*} rhs
 * @returns {boolean} - Whether or not lhs equals rhs.
 */

/**
 * Compare equality of two arrays.
 * @param {Array<*>} ary1
 * @param {Array<*>} ary2
 * @param {comparator} elemsEqual - Function to compare array elements with. If undefined, `===` is used.
 * @returns {boolean}
 */
function arraysEqual(ary1, ary2, elemsEqual) {
  const tripleEquals = (a, b) => a === b;
  const equals = elemsEqual || tripleEquals; // use `===` if elemsEqual isn't provided
  return ary1.every((elem, i) => equals(elem, ary2[i]));
}

/*
 * A pattern is a 3x3 grid of item names (as strings) that are used in crafting an item,
 * represented as an array of arrays [topRow, middleRow, bottomRow].
 */

// eslint-disable-next-line no-unused-vars
class Pattern {
  /**
   * Check equality of two patterns.
   * @param {Array<Array<*>>} p1
   * @param {Array<Array<*>>} p2
   * @returns {boolean}
   */
  static equals(p1, p2) {
    if (p1 === p2) {
      return true;
    } else if (p1 === undefined || p2 === undefined) {
      return false;
    }

    return arraysEqual(p1, p2, arraysEqual);
  }

  static align(p) {
    let i;
    let j;
    const newP = p;
    while (p[0][0] === null && p[0][1] === null && p[0][2] === null) {
      for (i = 0; i <= 2; i++) {
        for (j = 0; j <= 2; j++) {
          if (i === 2) {
            newP[2][j] = null;
          } else {
            newP[i][j] = newP[i + 1][j];
          }
        }
      }
    }
    while (p[0][0] === null && p[1][0] === null && p[2][0] === null) {
      for (i = 0; i <= 2; i++) {
        for (j = 0; j <= 2; j++) {
          if (i === 2) {
            newP[j][2] = null;
          } else {
            newP[j][i] = newP[j][i + 1];
          }
        }
      }
    }
    return newP;
  }
}
