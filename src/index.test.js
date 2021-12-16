
const RegExpExtension = require('./index').re

describe('Simple strings', ()=>{
  test('"some word"', () => {
    const re = new RegExpExtension()
    const generatedRegExp = re.str('some word').get()
    expect(generatedRegExp).toEqual(/some word/)
  })

  test('Another simple strings', ()=>{
    const re = new RegExpExtension()
    const generatedRegExp = re.str('another word').get()
    expect(generatedRegExp).toEqual(/another word/)
  })


  describe('Special characters in .str() should be escaped', ()=>{
    test('Wildcard (*)', ()=>{
      const re = new RegExpExtension()
      const generatedRegExp = re.str('*word').get()
      expect(generatedRegExp).toEqual(/\*word/)
    })
    test('All special chars: [ ] \\ ^ $ . | ? * + ( )', ()=>{
      const re = new RegExpExtension()
      const generatedRegExp = re.str('[ ] \\ ^ $ . | ? * + ( )').get()
      expect(generatedRegExp).toEqual(/\[ \] \\ \^ \$ \. \| \? \* \+ \( \)/)
    })

  })

})

describe('.regexp() method', () => {
  test('Add arbitrary RegExp as a string', ()=>{
    const re = new RegExpExtension();
    const generatedRegExp = re.regexp('Hello,? World').get();
    expect(generatedRegExp).toEqual(/Hello,? World/);
  })
})


describe('Chaining: Combine regexp with several methods', ()=>{
  test('Several .str() methods', () => {
    const re = new RegExpExtension();
    const generatedRegExp = re.str('Super').str('Man').get();

    expect(generatedRegExp).toEqual(/SuperMan/);
  })
})

describe('Anchor comparison', () => {
  test('Full string comparison', () => {
    const re = new RegExpExtension();
    const generatedRegExp = re.fullMatch('A dog123').get();

    expect(generatedRegExp).toEqual(/^A dog123$/);
  })

  // ...
})

describe('Quantifiers', () => {
  test('Maybe', () => {
    const re = new RegExpExtension();
    const generatedRegExp = re.maybe('A dog123').get();

    expect(generatedRegExp).toEqual(/(A dog123)?/);
  })

  test('Maybe with chaining', () => {
    const re = new RegExpExtension();
    const generatedRegExp = re.str('Hello').maybe('!').get();

    expect(generatedRegExp).toEqual(/Hello(!)?/);
  })

  describe('Number of occurrences', () => {
    test('min count of a string', () => {
      const re = new RegExpExtension();

      const generatedRegExp = re.str('Hello').quantity('!', 3).get();

      expect(generatedRegExp).toEqual(/Hello(!){3}/);
    })

    test('min and max count of a string', () => {
      const re = new RegExpExtension();

      const generatedRegExp = re.quantity('buy', 1, 3).get();

      expect(generatedRegExp).toEqual(/(buy){1,3}/);
    })
  })

  describe('Boundaries', () => {
    test('word boundaries', () => {
      const re = new RegExpExtension();

      const generatedRegExp = re.str('Hello World').findWord('Hello').get();

      expect(generatedRegExp).toEqual(/\bHello\b/);
    })

    test('numeral concatanations', () => {
      const re = new RegExpExtension();

      const generatedRegExp = re.str('0 00 000 00 0').findNumerals(3).get();

      expect(generatedRegExp).toEqual(/\b\d\d\d\b/);
    })
  })
})