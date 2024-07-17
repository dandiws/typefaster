import { Config } from 'utils/store'
import actionType, { ActionType } from './action'

export type DispatchParam = { type: ActionType, payload: Partial<Config> }

function configReducer(state: Config, { type, payload }: DispatchParam): Config {
  switch (type) {
    case actionType.CHANGE_LANGUAGE:
      return {
        ...state,
        lang: payload.lang,
      }
    case actionType.CHANGE_DURATION:
      return {
        ...state,
        duration: payload.duration,
      }
    default:
      return state
  }
}

export default configReducer
