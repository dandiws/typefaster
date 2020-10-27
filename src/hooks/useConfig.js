import { createContext, useEffect, useReducer } from 'react'

const defaultConfig = {
  lang: 'id',
  mode: 'time',
  time: 30,
}

function configReducer(state, action) {
  switch(action.type){
    case 'CHANGE_LANGUAGE':
      return {
        ...state,
        lang: action.payload.lang
      }
    default:
      return state
  }
}

export const AppConfigContext = createContext(defaultConfig)

export const AppConfigProvider = ({ children, initialConfig = defaultConfig }) => {
  const [config, dispatch] = useReducer(configReducer, initialConfig)

  useEffect(() => {
    console.log('CONFIG_CHANGED', { config })
  }, [config])

  return (
    <AppConfigContext.Provider value={[config, dispatch]}>
      {children}
    </AppConfigContext.Provider>
  )
}