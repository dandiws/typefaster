import {
  type Dispatch,
  type SetStateAction,
  createContext,
  useCallback,
  useContext,
  useReducer,
} from "react";
import type { Theme } from "utils/constant";
import { type Config, createConfigStore } from "../../utils/store";
import type { Action } from "./action";
import configReducer from "./reducer";

const initialStore = createConfigStore({});

interface ConfigContext {
  config: Config;
  dispatch: Dispatch<Action>;
}

export const ConfigStoreContext = createContext<ConfigContext | null>(null);

export const ConfigStoreProvider = ({ children }: React.PropsWithChildren) => {
  const [config, dispatch] = useReducer(configReducer, initialStore);

  return (
    <ConfigStoreContext.Provider
      value={{
        config: {
          ...config,
        },
        dispatch,
      }}
    >
      {children}
    </ConfigStoreContext.Provider>
  );
};

const useConfigStore = () => {
  const ctx = useContext(ConfigStoreContext);

  if (ctx === null) {
    throw new Error(
      "`useConfigStore` should be used inside `ConfigStoreProvider`",
    );
  }

  return ctx;
};

export default useConfigStore;
