import { createRef, RefObject } from 'react'
import { sampleSize } from 'lodash'
import Letter from './Letter'

class Word {
  key: string;
  originalWord: string;
  elRef: RefObject<any>;
  show: boolean;
  letterSequence: Letter[];
  isTyped: boolean;

  constructor(originalWord: string) {
    this.key = originalWord + Math.round(Math.random() * 999999).toString();
    this.originalWord = originalWord;
    this.elRef = createRef();
    this.show = true;
    this.letterSequence = originalWord.split('').map(c => new Letter(c));
    this.isTyped = false;
  }
}

export function isCorrectlyTyped(word: Word) {
  return word.letterSequence
    .map((letter) => letter.status)
    .every((status) => status === 'correct')
}

export function createWordSequence(arrOfString: string[], n = undefined) {
  if (n) arrOfString = sampleSize(arrOfString, n)

  return arrOfString.map((s, i) => new Word(s))
}

export default Word
