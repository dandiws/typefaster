import { memo } from 'react'
import { Text } from 'theme-ui'
import Letter from 'utils/Letter'

const LetterComponent = memo(
  ({ letter, cursor }: { letter: Letter, cursor?: boolean }) => (
    <Text
      data-testid="letter"
      as="span"
      sx={{
        // @ts-ignore
        position: 'relative',
        // @ts-ignore
        ':before': cursor && {
          content: '"|"',
          color: 'caret',
          position: 'absolute',
          right: '50%',
          animation: 'opacityBreath  1s steps(1) infinite',
        },
        // @ts-ignore
        color: letter.status && `${letter.status}Letter`,
      }}
    >
      {letter.typed || letter.original}
    </Text>
  ),
  (prevProps, nextProps) =>
    prevProps.letter.typed === nextProps.letter.typed &&
    prevProps.cursor === nextProps.cursor
)

export default LetterComponent
