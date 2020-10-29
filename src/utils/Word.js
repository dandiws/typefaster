import { createRef } from 'react'
import { sampleSize } from 'lodash'
import Letter from './Letter'

function Word(originalWord) {
  this.key = originalWord + Math.round(Math.random() * 999999)
  this.originalWord = originalWord
  this.elRef = createRef()
  this.show = true
  this.letterSequence = originalWord.split('').map((c) => new Letter(c))
  this.isTyped = false
}

export function isCorrectlyTyped(word) {
  return word.letterSequence
    .map((letter) => letter.status)
    .every((status) => status === 'correct')
}

export function createWordSequence(arrOfString, n = undefined) {
  if (n) arrOfString = sampleSize(arrOfString, n)

  return arrOfString.map((s, i) => new Word(s))
}

export default Word
