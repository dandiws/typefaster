import type { Config } from "utils/store";
import actionType, { type Action } from "./action";

function configReducer(state: Config, { type, payload }: Action): Config {
  switch (type) {
    case actionType.CHANGE_LANGUAGE: {
      if (!payload.lang) return state;

      localStorage.setItem("lang", payload.lang);
      return {
        ...state,
        lang: payload.lang,
      };
    }
    case actionType.CHANGE_DURATION:
      return {
        ...state,
        duration: payload.duration ?? state.duration,
      };
    case actionType.CHANGE_THEME:
      if (!payload.theme) return state;

      document.documentElement.setAttribute("data-theme", payload.theme);
      localStorage.setItem("theme", payload.theme);

      return {
        ...state,
        theme: payload.theme,
      };

    default:
      return state;
  }
}

export default configReducer;
