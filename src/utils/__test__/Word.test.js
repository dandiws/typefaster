import Letter from 'utils/Letter'
import Word, { isCorrectlyTyped, createWordSequence } from 'utils/Word'

describe('isCorrectlyTyped function', () => {
  test('isCorrectlyTyped is true', () => {
    const word = new Word('javascript')
    const letterSequence = 'javascript'
      .split('')
      .map(char => new Letter(char, char))
    word.letterSequence = letterSequence
    expect(isCorrectlyTyped(word)).toEqual(true)
  })

  test('isCorrectlyTyped is false', () => {
    const word = new Word('javascript')
    const letterSequence = 'javascript'
      .split('')
      .map(char => new Letter(char, 'a'))
    word.letterSequence = letterSequence
    expect(isCorrectlyTyped(word)).toEqual(false)
  })
})

describe('createWordSequence function', () => {
  test('should return correct length', () => {
    const wordArr = `
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
      Possimus magnam iste ratione ipsam laborum consequatur, doloribus
      labore maiores aperiam impedit. 
      Blanditiis, minus tenetur repellat 
      accusantium provident incidunt 
      reiciendis assumenda illo?
      `.split(/[^a-zA-Z]+/)
    
    expect(createWordSequence(wordArr,10).length).toEqual(10)
    expect(createWordSequence(wordArr).length).toEqual(wordArr.length)
  })
})
