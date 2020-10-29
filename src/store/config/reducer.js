import actionType from './action'

function configReducer(state, { type, payload }) {
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
      break
  }
}

export default configReducer
