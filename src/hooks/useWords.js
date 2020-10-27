import { createContext, useEffect, useReducer } from 'react'
import { sampleSize } from 'lodash'

export const WordsContext = createContext()

export const WordsProvider = ({ children, lang }) => {
  const words = useWordsProvider(lang)

  return <WordsContext.Provider value={words}>{children}</WordsContext.Provider>
}

const initialState = {
  wordsJson: null,
  words: [],
  cursorPosition: [0, 0],
}

async function fetchWordsJSON(lang) {
  const response = await fetch(`/words/lang/${lang}.json`)
  return await response.json()
}

function reducer(state, { type, payload }) {
  const [wordIdx, letterIdx] = state.cursorPosition
  const currentWord = state.words[wordIdx]
  console.log({ type, payload })

  switch (type) {
    case 'FETCH_WORDS_JSON': {
      return {
        ...state,
        wordsJson: payload.wordsJson,
        words: createWordCollection(payload.wordsJson.words, 100),
      }
    }
    case 'UPDATE_WORD': {
      if (state.words.length <= 0) return state

      const typedWord = payload.typed.split('')
      const currentLetters = currentWord.letters

      const updatedWord = {
        ...currentWord,
        letters: currentLetters.map((l, i) => ({
          ...l,
          typed: typedWord[i],
          correctness:
            typedWord[i] &&
            (l.original === typedWord[i] ? 'correct' : 'incorrect'),
        })),
      }

      const extraLetters = typedWord.slice(currentLetters.length)
      updatedWord.letters = [
        ...updatedWord.letters,
        ...extraLetters.map((l) => ({
          original: undefined,
          typed: l,
          correctness: 'extra',
        })),
      ]

      return {
        ...state,
        words: state.words.map((w) => (w.idx === wordIdx ? updatedWord : w)),
        cursorPosition: [wordIdx, typedWord.length],
      }
    }
    case 'INSERT_LETTER': {
      const isExtraLetter = letterIdx >= currentWord.originalWord.length
      let updatedWord
      if (isExtraLetter) {
        const extraLetter = {
          original: null,
          typed: payload.key,
          correctness: 'extra',
        }
        updatedWord = {
          ...currentWord,
          letters: [...currentWord.letters, extraLetter],
        }
      } else {
        const currentLetter = currentWord.letters[letterIdx]
        const updatedLetter = {
          ...currentLetter,
          typed: payload.key,
          correctness:
            payload.key === currentLetter.original ? 'correct' : 'incorrect',
        }

        updatedWord = {
          ...currentWord,
          letters: currentWord.letters.map((l, i) =>
            i === letterIdx ? updatedLetter : l
          ),
        }
      }

      return {
        ...state,
        words: state.words.map((w) => (w.idx === wordIdx ? updatedWord : w)),
        cursorPosition: [wordIdx, letterIdx + 1],
      }
    }
    case 'SPACE_KEY': {
      // if cursor at first letter of word, do nothing
      if (letterIdx === 0) return state

      // go to next word
      return {
        ...state,
        words: state.words,
        cursorPosition: [wordIdx + 1, 0],
      }
    }
    case 'DELETE_LETTER': {
      // if cursor at first letter of word, delete nothing
      if (letterIdx === 0) return state

      const lastTypedIndex = letterIdx - 1
      const lastTyped = currentWord.letters[lastTypedIndex]
      const isExtraLetter = !lastTyped.original
      let updatedWord

      // if extra letter remove from array of letters,
      // otherwise remove typed and correctness
      if (isExtraLetter) {
        updatedWord = {
          ...currentWord,
          letters: currentWord.letters.slice(0, -1),
        }
      } else {
        const updatedLastTyped = {
          ...lastTyped,
          typed: undefined,
          correctness: undefined,
        }

        updatedWord = {
          ...currentWord,
          letters: currentWord.letters.map((l, i) =>
            i === lastTypedIndex ? updatedLastTyped : l
          ),
        }
      }
      console.log(letterIdx)

      return {
        ...state,
        words: state.words.map((w) => (w.idx === wordIdx ? updatedWord : w)),
        cursorPosition: [wordIdx, letterIdx - 1],
      }
    }
    case 'DELETE_WORD': {
      const updatedWord = {
        ...currentWord,
        letters: currentWord.originalWord.split('').map((l) => ({
          original: l,
          typed: undefined,
          correctness: undefined,
        })),
      }
      return {
        ...state,
        words: state.words.map((w) => (w.idx === wordIdx ? updatedWord : w)),
        cursorPosition: [wordIdx, 0],
      }
    }
    case 'REFRESH_WORDS': {
      return {
        ...state,
        words: createWordCollection(state.wordsJson.words, 100),
        cursorPosition: [0, 0],
      }
    }
    default:
      return state
  }
}

const useWordsProvider = (lang) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    async function fetchWords() {
      const wordsJson = await fetchWordsJSON(lang)
      dispatch({ type: 'FETCH_WORDS_JSON', payload: { wordsJson } })
    }

    fetchWords()
  }, [lang])

  return {
    state,
    dispatch,
  }
}

function createWordObjectFromString(s) {
  return {
    originalWord: s,
    letters: `${s}`.split('').map((l) => ({
      original: l,
      typed: undefined,
      correctness: undefined,
    })),
    correctness: undefined,
  }
}

function createWordCollection(arrOfString, n = undefined) {
  if (n) arrOfString = sampleSize(arrOfString, n)

  return arrOfString.map((s, i) => ({
    ...createWordObjectFromString(s),
    idx: i,
    key: s + i,
  }))
}
