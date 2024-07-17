import { createContext, Dispatch, SetStateAction, useContext, useReducer } from 'react'
import configReducer from './reducer'
import { Config, createConfigStore } from '../../utils/store'
import { useColorMode } from 'theme-ui'
import { Theme } from 'utils/constant'
import { Action } from './action'

const initialStore = createConfigStore({})

interface ConfigContext {
  config: Config;
  dispatch: Dispatch<Action>;
  setTheme: Dispatch<SetStateAction<Theme>>;
}

export const ConfigStoreContext = createContext<ConfigContext | null>(null)

export const ConfigStoreProvider = ({ children }: React.PropsWithChildren) => {
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

const useConfigStore = () => {
  const ctx = useContext(ConfigStoreContext);

  if(ctx === null) {
    throw new Error("`useConfigStore` should be used inside `ConfigStoreProvider`")
  }

  return ctx
}

export default useConfigStore
