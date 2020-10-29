/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Flex } from 'theme-ui'
import useTypingStore from '../store/typing'

const ListItem = (props) => (
  <div sx={{ fontSize: 2, color: 'secondaryText', mx: 3, mb: 3 }} {...props} />
)

const Statistic = () => {
  const { typing } = useTypingStore()
  const { statistics } = typing
  const { accuracy, wpm, correctWords, incorrectWords } = statistics

  return (
    <Flex
      sx={{
        width: '100%',
        justifyContent: 'center',
        flexDirection: ['column', 'row'],
      }}
    >
      <ListItem>WPM : {wpm >= 0 ? wpm : '-'}</ListItem>
      <ListItem>Acc : {accuracy >= 0 ? accuracy : '-'}</ListItem>
      <ListItem>
        Correct words : {correctWords >= 0 ? correctWords : '-'}
      </ListItem>
      <ListItem>
        Incorrect words: {incorrectWords >= 0 ? incorrectWords : '-'}
      </ListItem>
      {/* <ListItem>Time: {time >= 0 ? time : '-'}</ListItem> */}
    </Flex>
  )
}

export default Statistic
