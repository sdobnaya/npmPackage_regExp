
const re = require('./index').re

test('Simple strings', ()=>{
  const generatedRegExp = re.str('some word')
  expect(generatedRegExp).toEqual(/some word/)
})

test('Another simple strings', ()=>{
  const generatedRegExp = re.str('another word')
  expect(generatedRegExp).toEqual(/another word/)
})

describe('Special characters in .str() should be escaped', ()=>{
  test('Wildcard (*)', ()=>{
    const generatedRegExp = re.str('*word')
    expect(generatedRegExp).toEqual(/\*word/)
  })

})