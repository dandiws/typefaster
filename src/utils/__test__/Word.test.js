import Letter from 'utils/Letter'
import Word, { isCorrectlyTyped } from 'utils/Word'

test('isCorrectlyTyped is true', ()=>{
  const word = new Word("javascript")
  const letterSequence = "javascript".split('').map(char=>new Letter(char,char))
  word.letterSequence = letterSequence
  expect(isCorrectlyTyped(word)).toEqual(true)
})

test('isCorrectlyTyped is false', ()=>{
  const word = new Word("javascript")
  const letterSequence = "javascript".split('').map(char=>new Letter(char,'a'))
  word.letterSequence = letterSequence
  expect(isCorrectlyTyped(word)).toEqual(false)
})