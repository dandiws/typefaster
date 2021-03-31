import { memo } from 'react'
import { Text } from 'theme-ui'

const Letter = memo(
  ({ letter, cursor }) => (
    <Text
      data-testid="letter"
      as="span"
      sx={{
        position: 'relative',
        ':before': cursor && {
          content: '"|"',
          color: 'caret',
          position: 'absolute',
          right: '50%',
          animation: 'opacityBreath  1s steps(1) infinite',
        },
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

export default Letter
