
const escapeRegExp = (text) => {
  // TODO We decided not to escape space. Consider escaping \n, \t, ... etc.
  return text.replace(/[-[\]{}()*+?.,\\^$|#]/g, '\\$&');
}

exports.re = {
  str: (literalString)=> {
    const escapedStr = escapeRegExp(literalString)
    return new RegExp(escapedStr)
  },

  regexp: (regexpAsString) => {
    return new RegExp(regexpAsString)
  }
};
