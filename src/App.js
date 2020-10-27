import { Box, Flex, Heading } from 'theme-ui'
import TypingArea from './components/TypingArea'
import { WordsProvider } from './hooks/useWords'

const App = () => {
  return (
    <Flex
      sx={{
        maxWidth: 800,
        mx: 'auto',
        py: 3,
        justifyContent: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Box
        sx={{
          py: 3,
        }}
      >
        <Heading>Typefaster</Heading>
      </Box>
      <Flex
        sx={{
          minHeight: 105,
          flexGrow: 1,
          fontSize: 21,
          flexDirection: 'column',
          justifyContent: 'center',
          fontFamily: 'monospace',
          color: 'GrayText',
          lineHeight: '35px',
          whiteSpace: 'pre-wrap',
        }}
      >
        <WordsProvider lang="en">
          <TypingArea />
        </WordsProvider>
      </Flex>
      <Box
        sx={{
          py: 3,
        }}
      >
        &copy; 2020 / Dandi Wiratsangka
      </Box>
    </Flex>
  )
}

export default App
