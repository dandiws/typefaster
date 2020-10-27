import { createContext, useEffect, useReducer } from 'react'

const defaultConfig = {
  lang: 'id',
  mode: 'time',
  time: 30,
}

function configReducer(state, action) {}

const AppConfigContext = createContext(defaultConfig)

const AppConfigProvider = ({ children, initialConfig = defaultConfig }) => {
  const [config, dispatch] = useReducer(configReducer, initialConfig)

  useEffect(() => {
    console.log('CONFIG_CHANGED', { config })
  }, [config])

  return (
    <AppConfigContext.Provider value={config}>
      {children}
    </AppConfigContext.Provider>
  )
}

export { AppConfigContext, AppConfigProvider }
