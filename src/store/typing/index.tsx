import { createContext, Dispatch, useContext, useEffect, useReducer } from 'react'
import typingReducer from './reducer'
import { createTypingStore, Typing } from '../../utils/store'
import { ActionType, INITIALIZE_TYPING_STORE } from './action'

const initialStore = createTypingStore({})

interface TypingContext {
  typing: Typing;
  dispatch: Dispatch<{ type: ActionType, payload?: Partial<Typing> }>;
}

export const TypingStoreContext = createContext<TypingContext>(null)

export const TypingStoreProvider = ({ children, lang }) => {
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

const useTypingStore = () => useContext(TypingStoreContext)
export default useTypingStore

async function fetchLanguageJSON(lang) {
  const response = await fetch(`/words/lang/${lang}.json`)
  return await response.json()
}
