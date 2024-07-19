import type { Config } from "utils/store";
import actionType, { type Action } from "./action";

function configReducer(state: Config, { type, payload }: Action): Config {
  switch (type) {
    case actionType.CHANGE_LANGUAGE:
      return {
        ...state,
        lang: payload.lang ?? state.lang,
      };
    case actionType.CHANGE_DURATION:
      return {
        ...state,
        duration: payload.duration ?? state.duration,
      };
    default:
      return state;
  }
}

export default configReducer;
