
const re = require('./index').re

console.log(re);
// TDD rulez

test('Simple strings', ()=>{
  // Arrange

  // Act
  const generatedRegExp = re.str('some word')

  // Assert
  expect(generatedRegExp).toEqual(/some word/)
})

test('Another simple strings', ()=>{
  // Act
  const generatedRegExp = re.str('another word')

  // Assert
  expect(generatedRegExp).toEqual(/another word/)
})