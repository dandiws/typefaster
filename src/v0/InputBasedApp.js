import {
  memo,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react'
import './App.css'
import { generateWords } from './utils/stopwords.id'

const Container = ({ children }) => {
  return <div className="container">{children}</div>
}

const TypeField = memo(({ value, onChange, onKeyUp, progress }) => (
  <input
    onKeyUp={onKeyUp}
    onChange={onChange}
    value={value}
    type="text"
    placeholder={
      progress === 'fresh'
        ? 'Type to start'
        : progress === 'done'
        ? 'Press CTRL + ENTER to start over'
        : ''
    }
    className="type__field"
  />
))

function formatTimer(seconds) {
  const minute = Math.floor(seconds / 60)
  const second = seconds % 60
  return `${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}`
}

const Timer = memo(({ start, mode, initialTime }) => {
  const [seconds, setSeconds] = useState(initialTime)
  const timerRef = useRef()

  const incrementTime = useCallback(() => {
    setSeconds((value) => value + 1)
  }, [setSeconds])

  const decrementTime = useCallback(() => {
    setSeconds((value) => value - 1)
  }, [setSeconds])

  useEffect(() => {
    if (start) {
      const handler = mode === 'time' ? decrementTime : incrementTime
      timerRef.current = setInterval(handler, 1000)
    } else {
      clearInterval(timerRef.current)
      setSeconds(initialTime)
    }

    return () => clearInterval(timerRef.current)
  }, [initialTime, start, mode, incrementTime, decrementTime])

  return <div className="timer">{formatTimer(seconds)}</div>
})

const N_WORDS = 100

const getInitialState = () => ({
  mode: 'time', // word || time
  timer: 60, //seconds
  nWords: N_WORDS,
  words: generateWords(N_WORDS).map((word) => ({ word, status: null })),
  currentWordIndex: 0,
  progress: 'fresh', //fresh || typing || done
  startTime: null,
  result: {
    wpm: null,
    accuracy: null,
    correctWords: null,
    incorrectWords: null,
  },
})

const calculateResult = (state) => {
  const typedWords =
    state.mode === 'time'
      ? state.words.filter((item) => item.status !== null)
      : state.words
  const typingTimeInMinutes = (Date.now() - state.startTime) / 60000
  const totalKey = typedWords.map((item) => item.word).join(' ').length
  const incorrectKey = typedWords
    .filter((item) => item.status === 'incorrect')
    .map((item) => item.word)
    .join('').length
  // correctkeys include spaces
  const correctKeys = totalKey - incorrectKey

  return {
    wpm: Math.round(correctKeys / (5 * typingTimeInMinutes)),
    accuracy: Math.round((correctKeys * 100) / totalKey),
    correctWords: typedWords.filter((item) => item.status === 'correct').length,
    incorrectWords: typedWords.filter((item) => item.status === 'incorrect')
      .length,
  }
}

function reducer(state, { type, payload }) {
  switch (type) {
    case 'START_TYPING':
      return {
        ...state,
        progress: 'typing',
        startTime: Date.now(),
      }
    case 'TYPE_A_WORD':
      return {
        ...state,
        currentWordIndex: state.currentWordIndex + 1,
        words: state.words.map((item, i) => {
          if (i === state.currentWordIndex)
            return {
              word: item.word,
              status: item.word === payload.typed ? 'correct' : 'incorrect',
            }
          return item
        }),
      }
    case 'DONE_TYPING':
      return {
        ...state,
        progress: 'done',
        startTime: null,
        result: calculateResult(state),
      }
    case 'RESET':
      return getInitialState()
    default:
      return state
  }
}

function App() {
  const [error, setError] = useState(false)
  const [typed, setTyped] = useState('')
  const [state, dispatch] = useReducer(reducer, getInitialState())

  const stopTyping = useCallback(() => {
    dispatch({ type: 'DONE_TYPING' })
    setTyped('')
  }, [dispatch, setTyped])

  const startOver = useCallback(() => {
    dispatch({ type: 'RESET' })
    setTyped('')
  }, [dispatch, setTyped])

  const handleChange = useCallback(
    (e) => state.progress !== 'done' && setTyped(e.target.value.trimEnd()),
    [setTyped, state.progress]
  )

  const handleKeyUp = useCallback(
    (e) => {
      if (state.progress === 'fresh' && typed !== '')
        dispatch({ type: 'START_TYPING' })

      if (state.progress === 'typing') {
        if (e.key === ' ' && typed !== '') {
          dispatch({
            type: 'TYPE_A_WORD',
            payload: {
              typed: typed,
            },
          })

          setTyped('')

          // last word
          if (state.currentWordIndex === state.words.length - 1) {
            stopTyping()
          }
        }
      }
    },
    [
      state.progress,
      state.currentWordIndex,
      state.words,
      dispatch,
      typed,
      stopTyping,
    ]
  )

  const handleKeyboardShorcut = useCallback(
    (e) => {
      switch (e.key) {
        case 'Enter':
          if (e.ctrlKey) return startOver()
          break
        default:
          return
      }
    },
    [startOver]
  )

  useEffect(() => {
    if (state.currentWordIndex < state.words.length)
      setError(!state.words[state.currentWordIndex].word.startsWith(typed))
  }, [state.currentWordIndex, state.words, typed])

  useEffect(() => {
    console.log(state)
  }, [state])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyboardShorcut)
  }, [handleKeyboardShorcut])

  useEffect(() => {
    if (state.progress === 'typing' && state.mode === 'time') {
      setTimeout(() => {
        stopTyping()
      }, 1000 * state.timer)
    }
  }, [state.progress, state.mode, state.timer, stopTyping])

  return (
    <Container>
      <h1 className="heading__title">Type Faster</h1>
      <Timer
        start={state.progress === 'typing'}
        mode={state.mode}
        initialTime={state.mode === 'time' ? state.timer : 0}
      />
      <div className="words__container">
        {state.words.map((item, i) => {
          const styles = [
            'word',
            item.status,
            state.currentWordIndex === i
              ? `active ${error ? 'error' : ''}`
              : '',
          ]
          return (
            <span className={styles.join(' ')} key={item.word}>
              {item.word}
            </span>
          )
        })}
      </div>
      <div>
        <span></span>
      </div>
      <div className="type__field__container">
        <TypeField
          value={typed}
          onChange={handleChange}
          onKeyUp={handleKeyUp}
          progress={state.progress}
        />
        <button className="btn" type="button" onClick={startOver}>
          Start over
        </button>
      </div>

      <div className="result__container">
        <div>
          <span>Typing speed</span>{' '}
          <span>{state.result.wpm ? `${state.result.wpm} WPM` : '-'}</span>
        </div>
        <div>
          <span>Accuracy</span>{' '}
          <span>
            {state.result.accuracy ? `${state.result.accuracy}%` : '-'}
          </span>
        </div>
        <div>
          <span>Correct words</span>{' '}
          <span>
            {state.result.correctWords !== null
              ? state.result.correctWords
              : '-'}
          </span>
        </div>
        <div>
          <span>Incorrect words</span>{' '}
          <span>
            {state.result.incorrectWords !== null
              ? state.result.incorrectWords
              : '-'}
          </span>
        </div>
      </div>
    </Container>
  )
}

export default App
