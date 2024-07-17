import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { Box, Flex, Input } from 'theme-ui'
import Word from './Word'
import useTypingStore from '../store/typing'
import actionType from '../store/typing/action'
import { useHotkeys } from 'react-hotkeys-hook'
import Hotkey from './Hotkey'

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

  useHotkeys('shift+Enter', () => {
    dispatch({ type: actionType.REFRESH_TYPING_STORE })
  })

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

  const handleOverlayClick = useCallback(
    (e) => {
      if (typing.typingStatus === 'done')
        dispatch({ type: actionType.REFRESH_TYPING_STORE })

      focusInput()
    },
    [dispatch, typing.typingStatus, focusInput]
  )

  const handleInputChange = useCallback(
    (e) => {
      if (typing.typingStatus === 'pending') {
        dispatch({ type: actionType.START_TYPING })
      }

      const value = e.target.value
      if (value.endsWith(' ')) {
        const seconds = (Date.now() - typing.startTime) / 1000
        dispatch({
          type: actionType.GOTO_NEXT_WORD,
          payload: { typingMinutes: seconds },
        })
      } else {
        dispatch({
          type: actionType.UPDATE_WORD,
          payload: { inputValue: value },
        })
      }
    },
    [dispatch, typing.typingStatus, typing.startTime]
  )

  useEffect(() => {
    const isInputFocused =
      inputRef.current && inputRef.current === document.activeElement

    if (isInputFocused) setBlur(false)
    else setBlur(true)
  }, [inputRef])

  useEffect(() => {
    if (typing.typingStatus === 'done') {
      setBlur(true)
    }
    if (typing.typingStatus === 'pending') {
      focusInput()
    }
  }, [typing.typingStatus, focusInput])

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
          opacity: blur && 0.25,
        }}
      >
        <Box
          sx={{
            px: 1,
            fontFamily: 'monospace',
            fontSize: 21,
            color: 'GrayText',
            height: 70,
            overflow: 'hidden',
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
              // focusInput()
              setBlur(true)
            }}
            onFocus={() => setBlur(false)}
            autoFocus
            sx={{
              width: 10,
              position: 'absolute',
              opacity: 0,
            }}
            onKeyDown={handleKeyDown}
            disabled={typing.typingStatus === 'done'}
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
          onClick={handleOverlayClick}
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            justifyContent: 'center',
            alignItems: 'center',
            color: 'text',
            fontWeight: 500,
            cursor: 'pointer',
            fontSize: 20,
            flexDirection: 'column',
          }}
        >
          {typing.typingStatus === 'done' ? (
            <>
              <div>
                Click or <Hotkey>Shift+Enter</Hotkey> to start new test
              </div>
            </>
          ) : (
            <span>
              Click or <Hotkey>Shift+F</Hotkey> to focus
            </span>
          )}
        </Flex>
      )}
    </Box>
  )
})

export default TypingArea
