
const escapeRegExp = (text) => {
  // TODO We decided not to escape space. Consider escaping \n, \t, ... etc.
  return text.replace(/[-[\]{}()*+?.,\\^$|#]/g, '\\$&');
}

exports.re = class {

  result = ''

  /** Добавляет буквальную часть в регулярное выражение */
  str(literalString) {
    const escapedStr = escapeRegExp(literalString)

    console.log(this);
    this.result = `${this.result}${escapedStr}`
    return this;
  }

  /** Добавляет регулярное выражение в регулярное выражение */
  regexp(regexpAsString) {
    this.result = `${this.result}${regexpAsString}`
    return this;
  }

  fullMatch(pattern) {
    this.result = `^${pattern}$`;
    return this;
  }

  maybe(pattern) {
    this.result = `${this.result}(${pattern})?`;
    return this;
  }

  /** Возвращает результат */
  get() {
    return new RegExp(this.result)
  }

};
