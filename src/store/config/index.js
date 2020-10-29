import { createContext, useContext, useReducer } from 'react'
import configReducer from './reducer'
import { createConfigStore } from '../../utils/store'
import { useColorMode } from 'theme-ui'

const initialStore = createConfigStore({})

export const ConfigStoreContext = createContext()

export const ConfigStoreProvider = ({ children }) => {
  const [config, dispatch] = useReducer(configReducer, initialStore)
  const [theme, setTheme] = useColorMode()

  return (
    <ConfigStoreContext.Provider
      value={{
        config: {
          ...config,
          theme,
        },
        dispatch,
        setTheme,
      }}
    >
      {children}
    </ConfigStoreContext.Provider>
  )
}

const useConfigStore = () => useContext(ConfigStoreContext)
export default useConfigStore
