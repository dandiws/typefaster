import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { Box, Flex, Input } from 'theme-ui'
import Word from './Word'
import useTypingStore from '../store/typing'
import actionType from '../store/typing/action'
import { useHotkeys } from 'react-hotkeys-hook'

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
  const { typing, dispatch } = useTypingStore()
  const inputRef = useRef()
  const [blur, setBlur] = useState(false)
  const startTime = useRef(null)

  useHotkeys('shift+Enter', () =>
    dispatch({ type: actionType.REFRESH_TYPING_STORE })
  )

  useHotkeys('shift+f', () => focusInput(), {
    keydown: false,
    keyup: true,
  })

  const focusInput = useCallback(() => {
    return inputRef.current.focus()
  }, [])

  const handleKeyDown = useCallback((e) => {
    if (DISABLED_KEYS.includes(e.key.toLowerCase())) {
      e.preventDefault()
      return
    }

    if (DISABLED_CTRL.includes(e.key.toLowerCase()) && e.ctrlKey) {
      e.preventDefault()
      return
    }
  }, [])

  const handleInputChange = useCallback(
    (e) => {
      if (startTime.current === null) startTime.current = Date.now()

      const value = e.target.value
      if (value.endsWith(' ')) {
        const typingMinutes = (Date.now() - startTime.current) / 60000
        dispatch({
          type: actionType.GOTO_NEXT_WORD,
          payload: { typingMinutes },
        })
      } else {
        dispatch({
          type: actionType.UPDATE_WORD,
          payload: { inputValue: value },
        })
      }
    },
    [dispatch]
  )

  useEffect(() => {
    const isInputFocused =
      inputRef.current && inputRef.current === document.activeElement

    if (isInputFocused) setBlur(false)
    else setBlur(true)
  }, [inputRef])

  return (
    <Box
      sx={{
        position: 'relative',
      }}
    >
      <Box
        sx={{
          bg: 'typingBackground',
          borderRadius: 5,
          p: 3,
          filter: blur && 'blur(5px)',
        }}
      >
        <Box
          sx={{
            px: 1,
            fontFamily: 'monospace',
            fontSize: 21,
            color: 'GrayText',
            height: 70,
            overflowY: 'hidden',
            lineHeight: '35px',
            whiteSpace: 'pre-wrap',
          }}
        >
          <Input
            ref={inputRef}
            type="text"
            value={typing.inputValue}
            onChange={handleInputChange}
            onBlur={() => {
              focusInput()
              // setBlur(true)
            }}
            onFocus={() => setBlur(false)}
            autoFocus
            sx={{
              width: 10,
              position: 'absolute',
              opacity: 0,
            }}
            onKeyDown={handleKeyDown}
          />
          {typing.wordSequence.map((w, i) => (
            <Word
              blur={blur}
              key={w.key}
              word={w}
              cursorIndex={
                i === typing.caretPosition[0] ? typing.caretPosition[1] : null
              }
            />
          ))}
        </Box>
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
            justifyContent: 'center',
            alignItems: 'center',
            color: 'goldenrod',
            fontWeight: 600,
            cursor: 'pointer',
            fontSize: 17,
          }}
        >
          Click or Press Shift+F to focus
        </Flex>
      )}
    </Box>
  )
})

export default TypingArea
