import { createContext, Dispatch, useContext, useEffect, useReducer } from 'react'
import typingReducer from './reducer'
import { createTypingStore, Typing } from '../../utils/store'
import { Action, ActionType, INITIALIZE_TYPING_STORE } from './action'
import { Language } from 'utils/constant'

const initialStore = createTypingStore({})

interface TypingContext {
  typing: Typing;
  dispatch: Dispatch<Action>;
}

export const TypingStoreContext = createContext<TypingContext | null>(null)

export const TypingStoreProvider = ({ children, lang }: React.PropsWithChildren<{ lang: Language }>) => {
  const [typing, dispatch] = useReducer(typingReducer, initialStore)

  useEffect(() => {
    fetchLanguageJSON(lang)
      .then((languageJSON) => {
        dispatch({
          type: INITIALIZE_TYPING_STORE,
          payload: { languageJSON },
        })
      })
      .catch((e) => {
        console.log(e)
      })
  }, [lang])

  return (
    <TypingStoreContext.Provider value={{ typing, dispatch }}>
      {children}
    </TypingStoreContext.Provider>
  )
}

const useTypingStore = () => {
  const ctx = useContext(TypingStoreContext);
  if (ctx === null) {
    throw new Error("`useTypingStore` must be used inside `TypingStoreProvider`")
  }
  return ctx
}
export default useTypingStore

async function fetchLanguageJSON(lang: Language) {
  const response = await fetch(`/words/lang/${lang}.json`)
  return await response.json()
}
