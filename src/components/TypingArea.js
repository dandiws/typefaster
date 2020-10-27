import React, {
  memo,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { Box, Flex, Input, Text } from 'theme-ui'
import { WordsContext } from '../hooks/useWords'

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

const DISABLED_KEYS = [
  'arrowup',
  'Arrowdown',
  'arrowleft',
  'arrowright',
  'home',
  'end',
  'tab',
]

const DISABLED_CTRL = ['a', 'c', 'v']

const TypingArea = memo(() => {
  const [typedLetter, setTypedLetter] = useState('')
  const { state, dispatch } = useContext(WordsContext)
  const inputRef = useRef()
  const [blur, setBlur] = useState(false)

  // useHotkeys('shift+enter', () => {
  //   dispatch({ type: 'REFRESH_WORDS' })
  // })

  const documentKeyDownHandler = useCallback(
    (e) => {
      if (e.key === 'Enter' && e.shiftKey)
        return dispatch({ type: 'REFRESH_WORDS' })
    },
    [dispatch]
  )

  useEffect(() => {
    document.addEventListener('keydown', documentKeyDownHandler)
    return () => document.removeEventListener('keydown', documentKeyDownHandler)
  }, [documentKeyDownHandler])

  useEffect(() => {
    const isInputFocused =
      inputRef.current && inputRef.current === document.activeElement

    if (isInputFocused) setBlur(false)
    else setBlur(true)
  }, [inputRef])

  const handleKeyDown = (e) => {
    if (DISABLED_KEYS.includes(e.key.toLowerCase())) {
      e.preventDefault()
      return
    }

    if (DISABLED_CTRL.includes(e.key.toLowerCase()) && e.ctrlKey) {
      e.preventDefault()
      return
    }

    // if (e.key === ' ') {
    //   setTypedLetter('')
    //   dispatch({ type: 'SPACE_KEY' })
    // }
  }

  const focusInput = () => {
    return inputRef.current.focus()
  }

  const handleInputChange = (e) => {
    return setTypedLetter(e.target.value)
  }

  useEffect(() => {
    if (typedLetter.endsWith(' ')) {
      setTypedLetter('')
      dispatch({ type: 'SPACE_KEY' })
      // setTimeout(() => , 0)
      return
    }

    dispatch({ type: 'UPDATE_WORD', payload: { typed: typedLetter } })
  }, [typedLetter, dispatch])

  return (
    <Box
      sx={{
        height: 105,
        overflowY: 'hidden',
        position: 'relative',
        px: 1,
      }}
    >
      <Box sx={{ filter: blur && 'blur(5px)' }}>
        <Input
          ref={inputRef}
          type="text"
          value={typedLetter}
          onChange={handleInputChange}
          onBlur={(_) => setBlur(true)}
          onFocus={(_) => setBlur(false)}
          autoFocus
          sx={{
            width: 10,
            position: 'absolute',
            opacity: 0,
          }}
          onKeyDown={handleKeyDown}
        />
        {state.words.map((w) => (
          <Word
            blur={blur}
            key={w.key}
            word={w}
            cursorIndex={
              w.idx === state.cursorPosition[0] ? state.cursorPosition[1] : null
            }
          />
        ))}
      </Box>
      {blur && (
        <Flex
          onClick={focusInput}
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            // bg: 'ActiveCaption',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
          }}
        >
          <span>Click to type</span>
        </Flex>
      )}
    </Box>
  )
})

export default TypingArea
