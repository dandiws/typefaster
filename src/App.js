import { useContext, useEffect } from 'react'
import { Box, Button, Divider, Flex, Heading, Text } from 'theme-ui'
import TypingArea from './components/TypingArea'
import { AppConfigContext } from './hooks/useConfig'
import { WordsProvider } from './hooks/useWords'

const App = () => {
  const [config, dispatch] = useContext(AppConfigContext)

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
      <Flex
        sx={{
          py: 3,
          justifyContent: 'space-between',
          alignItems:'center'
        }}
      >
        <Heading>Typefaster</Heading>
        <Box>
          <Button type="button" role="button" sx={{
            bg: 'transparent',
            py:0,
            px:1,
            color: config.lang==='id' ? '#2186fa' : 'gray'
          }} onClick={e=>dispatch({type:'CHANGE_LANGUAGE', payload:{lang: 'id'}})}>id</Button>
          <Box as="span" sx={{color:'gray',mx:2}}>/</Box>
          <Button type="button" role="button" sx={{
            bg: 'transparent',
            py:0,
            px:1,
            color: config.lang==='en' ? '#2186fa' : 'gray'
          }} onClick={e=>dispatch({type:'CHANGE_LANGUAGE', payload:{lang: 'en'}})}>en</Button>
        </Box>
      </Flex>
      <Flex
        sx={{
          minHeight: 105,
          flexGrow: 1,
          fontSize: 21,
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <WordsProvider lang={config.lang}>
          <TypingArea />
        </WordsProvider>
      </Flex>
      <Flex
        sx={{
          py: 3,
          justifyContent:'center',
          color:'GrayText'
        }}
      >
        &copy; 2020 / Dandi Wiratsangka
      </Flex>
    </Flex>
  )
}

export default App
