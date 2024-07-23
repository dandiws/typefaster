import type { Config } from "utils/store";

export const CHANGE_LANGUAGE = "CHANGE_LANGUAGE";
export const CHANGE_MODE = "CHANGE_MODE";
export const CHANGE_DURATION = "CHANGE_DURATION";
export const CHANGE_THEME = "CHANGE_THEME";

const actionType = {
  CHANGE_LANGUAGE,
  CHANGE_MODE,
  CHANGE_DURATION,
  CHANGE_THEME,
} as const;

export type ActionType = keyof typeof actionType;
export type Action = { type: ActionType; payload: Partial<Config> };

export default actionType;
