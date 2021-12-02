
const escapeRegExp = (text) => {
  // TODO We decided not to escape space. Consider escaping \n, \t, ... etc.
  return text.replace(/[-[\]{}()*+?.,\\^$|#]/g, '\\$&');
}

exports.re = class {

  result = ''

  str(literalString) {
    const escapedStr = escapeRegExp(literalString)

    console.log(this);
    this.result = `${this.result}${escapedStr}`
    return this;
  }

  regexp(regexpAsString) {
    this.result = `${this.result}${regexpAsString}`
    return this;
  }

  get() {
    return new RegExp(this.result)
  }

};
