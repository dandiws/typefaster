import { isCorrectlyTyped } from '../utils/Word'

export function getCorrectWordSequence (wordSequence) {
  if (!Array.isArray(wordSequence)) {
    return []
  }

  const typedWordSeq = wordSequence.filter(word => word?.isTyped)
  return typedWordSeq.filter(word => isCorrectlyTyped(word))
}

export function getIncorrectWordSequence (wordSequence) {
  if (!Array.isArray(wordSequence)) {
    return []
  }

  const typedWordSeq = wordSequence.filter(word => word?.isTyped)
  return typedWordSeq.filter(word => !isCorrectlyTyped(word))
}

export function calculateWPM (wordSequence, seconds) {
  if (!Array.isArray(wordSequence) || seconds < 0) {
    return NaN
  }

  const typedWordSeq = wordSequence.filter(word => word?.isTyped)
  const spacesCount = typedWordSeq.length ? typedWordSeq.length - 1 : 0
  const correctlyTypedLetters = getCorrectWordSequence(wordSequence)
    .map(word => word?.originalWord || '')
    .join('')

  return Math.round(
    (spacesCount + correctlyTypedLetters.length) / 5 / (seconds / 60)
  )
}

export function calculateAccuracy (wordSequence) {
  if (!Array.isArray(wordSequence)) {
    return NaN
  }

  const typedWordSeq = wordSequence.filter(word => word?.isTyped)
  const spacesCount = typedWordSeq.length - 1
  const totalKeys =
    spacesCount +
    typedWordSeq
      .map(word => word?.letterSequence?.length || 0)
      .reduce((acc, curr) => acc + curr, 0)

  const correctKeys =
    spacesCount +
    typedWordSeq
      .map(word => word.letterSequence)
      .map(
        letterSeq =>
          letterSeq.filter(letter => letter.status === 'correct').length
      )
      .reduce((acc, curr) => acc + curr, 0)

  return Math.round((correctKeys / totalKeys) * 100) / 100
}

export function getStatistics (wordSequence, seconds) {
  return {
    wpm: calculateWPM(wordSequence, seconds),
    accuracy: calculateAccuracy(wordSequence),
    correctWords: getCorrectWordSequence(wordSequence).length,
    incorrectWords: getIncorrectWordSequence(wordSequence).length,
    time: seconds || NaN
  }
}
