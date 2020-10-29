import { memo } from 'react'
import { Text } from 'theme-ui'
import { isCorrectlyTyped } from '../utils/Word'
import Letter from './Letter'

const Word = memo(
  ({ word, cursorIndex }) => {
    return (
      word.show && (
        <Text ref={word.elRef} as="span">
          <Text
            as="span"
            sx={(theme) => ({
              display: 'inline-block',
              textDecoration:
                word.isTyped && !isCorrectlyTyped(word)
                  ? `line-through ${theme.colors.incorrectLetter}`
                  : 'none',
            })}
          >
            {word.letterSequence.map((l, i) => (
              <Letter cursor={i === cursorIndex} key={i} letter={l} />
            ))}
          </Text>
          <Letter
            cursor={cursorIndex >= word.originalWord.length}
            letter={{
              original: ' ',
            }}
          />
        </Text>
      )
    )
  },
  (prevProps, nextProps) =>
    prevProps.cursorIndex === nextProps.cursorIndex &&
    prevProps.word.show === nextProps.word.show &&
    prevProps.word.isTyped === nextProps.word.isTyped
)

export default Word
