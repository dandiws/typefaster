import React, { memo, useEffect, useReducer } from 'react'
import { Box, Text } from 'theme-ui'
import { generateWords } from '../utils/stopwords.id'

let initialWords = generateWords().map((w, i) => ({
  idx: i,
  key: w + i,
  originalWord: w,
  letters: `${w}`.split('').map((l) => ({
    original: l,
    typed: undefined,
    correctness: undefined,
  })),
  // hasExtraLetter: false,
  correctness: undefined,
}))

const initialState = {
  words: initialWords,
  cursorPosition: [0, 0],
}

function reducer(state, { type, payload }) {
  const [wordIdx, letterIdx] = state.cursorPosition
  const currentWord = state.words[wordIdx]

  switch (type) {
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
        words: state.words.map((w) => (w.idx === wordIdx ? updatedWord : w)),
        cursorPosition: [wordIdx, letterIdx + 1],
      }
    }
    case 'SPACE_KEY': {
      // if cursor at first letter of word, do nothing
      if (letterIdx === 0) return state

      // go to next word
      return {
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

      return {
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
        words: state.words.map((w) => (w.idx === wordIdx ? updatedWord : w)),
        cursorPosition: [wordIdx, 0],
      }
    }

    default:
      return state
  }
}
// 0 1 0 1 0

const Word = memo(
  ({ word, cursorIndex }) => {
    return (
      <Text
        as="span"
        sx={{
          display: 'inline-block',
        }}
      >
        {word.letters.map((l, i) => (
          <Letter cursor={i === cursorIndex} key={i} letter={l} />
        ))}
        <Letter
          cursor={cursorIndex >= word.originalWord.length}
          letter={{
            original: ' ',
          }}
        />
      </Text>
    )
  },
  (prevProps, nextProps) => prevProps.cursorIndex === nextProps.cursorIndex
)

const Letter = memo(
  ({ letter, cursor }) => (
    <Text
      as="span"
      sx={{
        position: 'relative',
        ':before': cursor && {
          content: '"|"',
          position: 'absolute',
          right: '50%',
          animation: 'opacityBreath  1s steps(1) infinite',
        },
        color:
          letter.correctness === 'correct'
            ? '#55ec47'
            : letter.correctness === 'incorrect'
            ? '#F07178'
            : letter.correctness === 'extra'
            ? '#daae5c'
            : undefined,
      }}
    >
      {letter.original || letter.typed}
    </Text>
  ),
  (prevProps, nextProps) =>
    prevProps.letter.typed === nextProps.letter.typed &&
    prevProps.letter.correctness === nextProps.letter.correctness &&
    prevProps.cursor === nextProps.cursor
)

const TypingArea = memo(() => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const handleKeyDown = (e) => {
      console.log(e)
      if (e.key === 'Backspace' && e.ctrlKey) {
        return dispatch({ type: 'DELETE_WORD' })
      }

      switch (e.key) {
        case ' ':
          return dispatch({ type: 'SPACE_KEY' })
        case 'Backspace':
          return dispatch({ type: 'DELETE_LETTER' })
        default:
          return dispatch({ type: 'INSERT_LETTER', payload: { key: e.key } })
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  // useEffect(() => {
  //   console.log(state.words[state.cursorPosition[0]])
  // }, [state])

  return (
    <Box
      sx={{
        height: 105,
        overflowY: 'hidden',
        position: 'relative',
        px: 1,
      }}
    >
      {state.words.map((w) => (
        <Word
          key={w.key}
          word={w}
          cursorIndex={
            w.idx === state.cursorPosition[0] ? state.cursorPosition[1] : null
          }
        />
      ))}
    </Box>
  )
})

export default TypingArea
