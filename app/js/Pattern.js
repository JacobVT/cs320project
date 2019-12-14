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

  /**
   * Shift elements as close to the top-left corner of pattern as possible.
   * @param {Array<Array<*>>} pattern
   * @return {Array<Array<*>>}
   */
  static align(pattern) {
    const arrayIsEmpty = (ary) => ary.every((elem) => elem == null);

    if (pattern.every(arrayIsEmpty)) {
      // avoid infinite loops if pattern is empty
      return pattern;
    }

    // copy pattern instead of manipulating the old one
    const newPattern = pattern.map((row) => row.slice(0));

    // shift rows up until the top contains a non-null value.
    while (arrayIsEmpty(newPattern[0])) {
      for (let i = 0; i < newPattern.length; i++) {
        let newRow = [null, null, null];

        if (i < 2) {
          newRow = newPattern[i + 1];
        }

        newPattern[i] = newRow;
      }
    }

    // shift columns left until the left contains a non-null value.
    // essentially same logic as the above while loop, but less concise due to columns not being arrays.
    while (newPattern[0][0] === null && newPattern[1][0] === null && newPattern[2][0] === null) {
      for (let i = 0; i <= 2; i++) {
        for (let j = 0; j <= 2; j++) {
          let newValue = null;

          if (i < 2) {
            newValue = newPattern[j][i + 1];
          }

          newPattern[j][i] = newValue;
        }
      }
    }

    return newPattern;
  }
}
