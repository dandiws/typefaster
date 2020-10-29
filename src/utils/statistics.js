import { isCorrectlyTyped } from '../utils/Word'

export function getCorrectWordSequence(wordSequence) {
  const typedWordSeq = wordSequence.filter((word) => word.isTyped)
  return typedWordSeq.filter((word) => isCorrectlyTyped(word))
}

export function getIncorrectWordSequence(wordSequence) {
  const typedWordSeq = wordSequence.filter((word) => word.isTyped)
  return typedWordSeq.filter((word) => !isCorrectlyTyped(word))
}

export function calculateWPM(wordSequence, typingMinutes) {
  const typedWordSeq = wordSequence.filter((word) => word.isTyped)
  const spacesCount = typedWordSeq.length - 1
  const correctlyTypedLetters = getCorrectWordSequence(wordSequence)
    .map((word) => word.originalWord)
    .join('')

  return Math.round(
    (spacesCount + correctlyTypedLetters.length) / 5 / typingMinutes
  )
}

export function calculateAccuracy(wordSequence) {
  const typedWordSeq = wordSequence.filter((word) => word.isTyped)
  const spacesCount = typedWordSeq.length - 1
  const totalKeys =
    spacesCount +
    typedWordSeq
      .map((word) => word.letterSequence.length)
      .reduce((acc, curr) => acc + curr, 0)

  const correctKeys =
    spacesCount +
    typedWordSeq
      .map((word) => word.letterSequence)
      .map(
        (letterSeq) =>
          letterSeq.filter((letter) => letter.status === 'correct').length
      )
      .reduce((acc, curr) => acc + curr, 0)

  return Math.round((correctKeys / totalKeys) * 100) / 100
}

export function getStatistics(wordSequence, typingMinutes) {
  return {
    wpm: calculateWPM(wordSequence, typingMinutes),
    accuracy: calculateAccuracy(wordSequence),
    correctWords: getCorrectWordSequence(wordSequence).length,
    incorrectWords: getIncorrectWordSequence(wordSequence).length,
  }
}
