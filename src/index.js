
const escapeRegExp = (text) => {
  // TODO We decided not to escape space. Consider escaping \n, \t, ... etc.
  return text.replace(/[-[\]{}()*+?.,\\^$|#]/g, '\\$&');
}

exports.re = class {

  result = ''

  /** Добавляет буквальную часть в регулярное выражение */
  str(literalString) {
    const escapedStr = escapeRegExp(literalString)

    this.result = `${this.result}${escapedStr}`
    return this;
  }

  /** Добавляет регулярное выражение в регулярное выражение */
  regexp(regexpAsString) {
    this.result = `${this.result}${regexpAsString}`
    return this;
  }

  quantity(pattern, minCount, maxCount = null) {
    this.result = `${this.result}(${pattern}){${minCount}${
      maxCount !== null ? `,${maxCount}` : ''
    }}`
    return this;
  }

  fullMatch(pattern) {
    this.result = `^${pattern}$`;
    return this;
  }

  /**
   * TODO: consider placing it in "newbie-friendly" layer
   * @param {*} pattern 
   * @returns 
   */
  maybe(pattern) {
    this.result = `${this.result}(${pattern})?`;
    return this;
  }

  /** Возвращает результат */
  get() {
    return new RegExp(this.result)
  }

  findWord(expectedWord) {
    this.result = `\\b${expectedWord}\\b`;
    return this;
  }

  findNumerals(quantity){
    const midterm = '\\d'.repeat(quantity);
    this.result = `${midterm}`;

    return this;
  }

};
