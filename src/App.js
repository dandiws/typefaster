import { Box, Flex, Heading, Select } from 'theme-ui'
import TypingArea from './components/TypingArea'
import useConfigStore from './store/config'
import { TypingStoreProvider } from './store/typing'
import { CHANGE_LANGUAGE } from './store/config/action'
import { language, theme } from './utils/constant'
import { useCallback, useEffect } from 'react'
import Statistic from './components/Statistic'
import Timer from './components/Timer'

const App = () => {
  const { config, dispatch, setTheme } = useConfigStore()

  const handleSelectThemeChange = useCallback(
    (e) => {
      const selectedValue = e.target.options[e.target.selectedIndex].value
      setTheme(selectedValue)
    },
    [setTheme]
  )

  const handleSelectLanguageChange = useCallback(
    (e) => {
      const selectedValue = e.target.options[e.target.selectedIndex].value
      dispatch({
        type: CHANGE_LANGUAGE,
        payload: { lang: selectedValue },
      })
    },
    [dispatch]
  )

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
          alignItems: 'center',
        }}
      >
        <Heading>Typefaster</Heading>
      </Flex>
      <Flex
        sx={{
          minHeight: 105,
          flexGrow: 1,
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <TypingStoreProvider lang={config.lang}>
          <Timer duration={config.duration} />
          <TypingArea />
          <Box
            sx={{
              mt: 4,
            }}
          >
            <Statistic />
          </Box>
        </TypingStoreProvider>
      </Flex>
      <Flex
        sx={{
          py: 3,
          justifyContent: 'space-between',
          color: 'GrayText',
        }}
      >
        <span>&copy; 2020 / Dandi Wiratsangka</span>
        <Flex>
          <Select
            onChange={handleSelectThemeChange}
            sx={{ py: 0, pr: 30, width: 'auto', ml: 3 }}
            value={config.theme}
          >
            {Object.entries(theme).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </Select>
          <Select
            onChange={handleSelectLanguageChange}
            value={config.lang}
            sx={{ py: 0, pr: 30, width: 'auto', ml: 3 }}
          >
            {Object.entries(language).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </Select>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default App
