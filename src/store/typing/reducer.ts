import actionType from './action'
import { createWordSequence } from '../../utils/Word'
import Letter from '../../utils/Letter'
import { getStatistics } from '../../utils/statistics'
import { createTypingStore } from '../../utils/store'

function replaceItemInArray(originalArr, index, newItem) {
  return originalArr.map((item, i) => (i === index ? newItem : item))
}

function hideWord(word) {
  return {
    ...word,
    show: false,
  }
}

function markAsTyped(word) {
  return {
    ...word,
    isTyped: true,
  }
}

function typingReducer(state, { type, payload }) {
  const [wordIndex, letterIndex] = state.caretPosition
  const activeWord = state.wordSequence[wordIndex]
  const N_WORD_TOBE_GENERATED = 20 //initial word count
  const APPEND_WORD_TRESHOLD = 20 //minimal word has not been typed which new words will be generated (appended)

  switch (type) {
    case actionType.INITIALIZE_TYPING_STORE: {
      return createTypingStore({
        languageJSON: payload.languageJSON,
        wordSequence: createWordSequence(
          payload.languageJSON.words,
          N_WORD_TOBE_GENERATED
        ),
      })
    }

    case actionType.START_TYPING:
      return {
        ...state,
        typingStatus: 'started',
        startTime: Date.now(),
        inputValue: '',
      }

    case actionType.DONE_TYPING:
      return {
        ...state,
        typingStatus: 'done',
        finishTime: Date.now(),
      }

    case actionType.UPDATE_WORD: {
      if (state.wordSequence.length <= 0) return state

      const inputValueArr = payload.inputValue.split('')
      const originalLetterSeq = activeWord.letterSequence.filter(
        (l) => l.original
      )

      let updatedLetterSeq = originalLetterSeq.map(
        (l, i) => new Letter(l.original, inputValueArr[i])
      )

      const extraLetters = inputValueArr.slice(activeWord.originalWord.length)

      updatedLetterSeq = [
        ...updatedLetterSeq,
        ...extraLetters.map((l) => new Letter(null, l)),
      ]

      const updatedActiveWord = {
        ...activeWord,
        letterSequence: updatedLetterSeq,
      }

      return {
        ...state,
        wordSequence: replaceItemInArray(
          state.wordSequence,
          wordIndex,
          updatedActiveWord
        ),
        caretPosition: [wordIndex, inputValueArr.length],
        inputValue: payload.inputValue,
      }
    }

    case actionType.GOTO_NEXT_WORD: {
      // if cursor at first letter of word, do nothing
      if (letterIndex === 0) return state

      let updatedWord = markAsTyped(activeWord)
      let updatedWordSeq = replaceItemInArray(
        state.wordSequence,
        wordIndex,
        updatedWord
      )

      // if new line detected, hide all word in previous line
      const nextWord = state.wordSequence[wordIndex + 1]
      if (activeWord.elRef.current && nextWord) {
        const activeWordY = activeWord.elRef.current.getBoundingClientRect().y
        const nextWordY = nextWord.elRef.current.getBoundingClientRect().y

        // if new line
        if (activeWordY !== nextWordY) {
          updatedWordSeq = state.wordSequence.map((w, i) => {
            if (i <= wordIndex) return hideWord(w)
            return w
          })

          // if running out of word, generate and append new sequence of word
          const remaining_word_count = state.wordSequence.length - wordIndex + 1
          if (remaining_word_count < APPEND_WORD_TRESHOLD) {
            const newlyGeneratedWordSeq = createWordSequence(
              state.languageJSON.words,
              N_WORD_TOBE_GENERATED
            )
            updatedWordSeq = [...updatedWordSeq, ...newlyGeneratedWordSeq]
          }
        }
      }

      // go to next word
      return {
        ...state,
        wordSequence: updatedWordSeq,
        caretPosition: [wordIndex + 1, 0],
        inputValue: '',
        statistics: getStatistics(updatedWordSeq, payload.typingMinutes),
      }
    }

    case actionType.REFRESH_TYPING_STORE: {
      return createTypingStore({
        languageJSON: state.languageJSON,
        wordSequence: createWordSequence(
          state.languageJSON.words,
          N_WORD_TOBE_GENERATED
        ),
      })
    }

    default:
      return state
  }
}

export default typingReducer
