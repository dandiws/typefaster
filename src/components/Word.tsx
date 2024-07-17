import { memo } from 'react'
import { Text } from 'theme-ui'
import Word, { isCorrectlyTyped } from '../utils/Word'
import LetterComponent from './Letter'
import Letter from 'utils/Letter'

const WordComponent = memo(
  ({ word, cursorIndex }: { word: Word, cursorIndex?: number }) => {
    return (
      word.show && (
        <Text ref={word.elRef} as="span">
          <Text
            data-testid="word"
            as="span"
            sx={(theme) => ({
              display: 'inline-block',
              textDecorationColor: theme.colors.incorrectLetter,
              textDecoration:
                word.isTyped && !isCorrectlyTyped(word)
                  ? 'line-through'
                  : 'none',
            })}
          >
            {word.letterSequence.map((l, i) => (
              <LetterComponent cursor={i === cursorIndex} key={i} letter={l} />
            ))}
          </Text>
          <LetterComponent
            cursor={cursorIndex >= word.originalWord.length}
            letter={new Letter(' ')}
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

export default WordComponent
