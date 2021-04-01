import Letter from 'utils/Letter'
import {
  getCorrectWordSequence,
  getIncorrectWordSequence,
  calculateWPM,
  calculateAccuracy,
  getStatistics
} from 'utils/statistics'
import Word from 'utils/Word'

describe('getCorrectWordSequence function', () => {
  test('should always return an array', () => {
    const wordSequence = [
      new Word('hello'),
      new Word('world'),
      new Word('I'),
      new Word('love'),
      new Word('javascript')
    ]

    expect(Array.isArray(getCorrectWordSequence(wordSequence))).toEqual(true)
    expect(Array.isArray(getCorrectWordSequence())).toEqual(true)
    expect(Array.isArray(getCorrectWordSequence(null))).toEqual(true)
    expect(Array.isArray(getCorrectWordSequence('string'))).toEqual(true)
    expect(Array.isArray(getCorrectWordSequence(1033))).toEqual(true)
    expect(Array.isArray(getCorrectWordSequence(NaN))).toEqual(true)
    expect(Array.isArray(getCorrectWordSequence([]))).toEqual(true)
    expect(Array.isArray(getCorrectWordSequence({}))).toEqual(true)
    expect(
      Array.isArray(
        getCorrectWordSequence({
          property: 'value'
        })
      )
    ).toEqual(true)
    expect(Array.isArray(getCorrectWordSequence([[[]]]))).toEqual(true)
  })

  test('should return correct output and length', () => {
    const wordSequence = [
      new Word('hello'),
      new Word('world'),
      new Word('I'),
      new Word('love'),
      new Word('javascript')
    ]

    for (let word of wordSequence) {
      word.isTyped = true
    }

    wordSequence[1].letterSequence = wordSequence[0].letterSequence.map(
      letter => new Letter(letter.original, letter.original)
    )
    wordSequence[2].letterSequence = wordSequence[1].letterSequence.map(
      letter => new Letter(letter.original, letter.original)
    )

    let correctSequence = getCorrectWordSequence(wordSequence)
    expect(correctSequence[0]).toEqual(wordSequence[1])
    expect(correctSequence[1]).toEqual(wordSequence[2])
    expect(correctSequence.length).toEqual(2)

    wordSequence[1].isTyped = false
    expect(getCorrectWordSequence(wordSequence)[0]).toEqual(wordSequence[2])
    expect(getCorrectWordSequence(wordSequence).length).toEqual(1)
  })
})

describe('getIncorrectWordSequence function', () => {
  test('should always return an array', () => {
    const wordSequence = [
      new Word('hello'),
      new Word('world'),
      new Word('I'),
      new Word('love'),
      new Word('javascript')
    ]

    expect(Array.isArray(getIncorrectWordSequence(wordSequence))).toEqual(true)
    expect(Array.isArray(getIncorrectWordSequence())).toEqual(true)
    expect(Array.isArray(getIncorrectWordSequence(null))).toEqual(true)
    expect(Array.isArray(getIncorrectWordSequence('string'))).toEqual(true)
    expect(Array.isArray(getIncorrectWordSequence(1033))).toEqual(true)
    expect(Array.isArray(getIncorrectWordSequence(NaN))).toEqual(true)
    expect(Array.isArray(getIncorrectWordSequence([]))).toEqual(true)
    expect(Array.isArray(getIncorrectWordSequence({}))).toEqual(true)
    expect(
      Array.isArray(
        getIncorrectWordSequence({
          property: 'value'
        })
      )
    ).toEqual(true)
    expect(Array.isArray(getIncorrectWordSequence([[[]]]))).toEqual(true)
  })

  test('getIncorrectWordSequence', () => {
    const wordSequence = [
      new Word('hello'),
      new Word('world'),
      new Word('I'),
      new Word('love'),
      new Word('javascript')
    ]

    for (let word of wordSequence) {
      word.isTyped = true
    }

    wordSequence[1].letterSequence = wordSequence[0].letterSequence.map(
      letter => new Letter(letter.original, letter.original)
    )
    wordSequence[2].letterSequence = wordSequence[1].letterSequence.map(
      letter => new Letter(letter.original, letter.original)
    )
    wordSequence[4].letterSequence = wordSequence[1].letterSequence.map(
      letter => new Letter(letter.original, letter.original)
    )

    let incorrectSequence = getIncorrectWordSequence(wordSequence)
    expect(incorrectSequence[0]).toEqual(wordSequence[0])
    expect(incorrectSequence[incorrectSequence.length - 1]).toEqual(
      wordSequence[3]
    )
    expect(incorrectSequence.length).toEqual(2)

    wordSequence[0].isTyped = false
    expect(getIncorrectWordSequence(wordSequence).length).toEqual(1)
  })
})

describe('calculateWPM function', () => {
  test('should always return a number', () => {
    expect(calculateWPM()).toBeNaN()
    expect(calculateWPM(undefined, 10)).toBeNaN()
    expect(calculateWPM(null, -1)).toBeNaN()
    expect(calculateWPM([], 10)).toEqual(0)

    const wordSequence = [
      new Word('hello'),
      new Word('world'),
      new Word('I'),
      new Word('love'),
      new Word('javascript')
    ]

    for (let word of wordSequence) {
      word.isTyped = true
    }

    expect(calculateWPM(wordSequence, 60)).toBeGreaterThan(0)

    wordSequence.letterSequence = wordSequence[0].letterSequence.map(
      letter => new Letter(letter.original, letter.original)
    )

    wordSequence[0] = null

    expect(calculateWPM(wordSequence, 60)).toBeGreaterThan(0)
  })
})

describe('calculateAccuary function', () => {
  test('should always return a number', () => {
    expect(calculateAccuracy()).toBeNaN()
    expect(calculateAccuracy(undefined, 10)).toBeNaN()
    expect(calculateAccuracy(null, -1)).toBeNaN()

    const wordSequence = [
      new Word('hello'),
      new Word('world'),
      new Word('I'),
      new Word('love'),
      new Word('javascript')
    ]

    for (let word of wordSequence) {
      word.isTyped = true
    }

    expect(calculateAccuracy(wordSequence)).toBeGreaterThan(0)

    wordSequence.letterSequence = wordSequence[0].letterSequence.map(
      letter => new Letter(letter.original, letter.original)
    )

    wordSequence[0] = null

    expect(calculateAccuracy(wordSequence)).toBeGreaterThan(0)
  })
})

describe('getStatistics function', () => {
  test('should be numbers', () => {    
    const output = Object.values(getStatistics())
      .map(val => typeof val)
      .every(type => type === 'number')

    expect(output).toEqual(true)
  })
})
