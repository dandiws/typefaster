import Letter from 'utils/Letter'
import {  
  getCorrectWordSequence,
  getIncorrectWordSequence,  
} from 'utils/statistics'
import Word from 'utils/Word'

test('getCorrectWordSequence', ()=>{

  const wordSequence = [
    new Word("hello"),
    new Word("world"),
    new Word("I"),
    new Word("love"),
    new Word("javascript")
  ]

  for (let word of wordSequence){
    word.isTyped = true
  }

  wordSequence[1].letterSequence = wordSequence[0].letterSequence.map(letter=>new Letter(letter.original, letter.original))
  wordSequence[2].letterSequence = wordSequence[1].letterSequence.map(letter=>new Letter(letter.original, letter.original))

  let correctSequence = getCorrectWordSequence(wordSequence)
  expect(correctSequence[0]).toEqual(wordSequence[1])
  expect(correctSequence[1]).toEqual(wordSequence[2])
  expect(correctSequence.length).toEqual(2)

  wordSequence[1].isTyped = false
  expect(getCorrectWordSequence(wordSequence)[0]).toEqual(wordSequence[2])
  expect(getCorrectWordSequence(wordSequence).length).toEqual(1)  
})


test('getIncorrectWordSequence', ()=>{

  const wordSequence = [
    new Word("hello"),
    new Word("world"),
    new Word("I"),
    new Word("love"),
    new Word("javascript")
  ]

  for (let word of wordSequence){
    word.isTyped = true
  }

  wordSequence[1].letterSequence = wordSequence[0].letterSequence.map(letter=>new Letter(letter.original, letter.original))
  wordSequence[2].letterSequence = wordSequence[1].letterSequence.map(letter=>new Letter(letter.original, letter.original))
  wordSequence[4].letterSequence = wordSequence[1].letterSequence.map(letter=>new Letter(letter.original, letter.original))

  let incorrectSequence = getIncorrectWordSequence(wordSequence)
  expect(incorrectSequence[0]).toEqual(wordSequence[0])
  expect(incorrectSequence[incorrectSequence.length-1]).toEqual(wordSequence[3])
  expect(incorrectSequence.length).toEqual(2)

  wordSequence[0].isTyped = false
  expect(getIncorrectWordSequence(wordSequence).length).toEqual(1)
})