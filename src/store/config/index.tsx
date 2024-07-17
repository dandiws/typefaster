import { createContext, Dispatch, SetStateAction, useContext, useReducer } from 'react'
import configReducer, { DispatchParam } from './reducer'
import { Config, createConfigStore } from '../../utils/store'
import { useColorMode } from 'theme-ui'
import { Theme } from 'utils/constant'

const initialStore = createConfigStore({})

interface ConfigContext {
  config: Config;
  dispatch: Dispatch<DispatchParam>;
  setTheme: Dispatch<SetStateAction<string>>;
}

export const ConfigStoreContext = createContext<ConfigContext>(null)

export const ConfigStoreProvider = ({ children }) => {
  const [config, dispatch] = useReducer(configReducer, initialStore)
  const [theme, setTheme] = useColorMode<Theme>()

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
