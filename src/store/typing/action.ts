import { Typing } from "utils/store"

export const INITIALIZE_TYPING_STORE = 'INITIALIZE_TYPING_STORE'
export const UPDATE_WORD = 'UPDATE_WORD'
export const GOTO_NEXT_WORD = 'GOTO_NEXT_WORD'
export const REFRESH_TYPING_STORE = 'REFRESH_TYPING_STORE'
export const START_TYPING = 'START_TYPING'
export const DONE_TYPING = 'DONE_TYPING'

const action = {
  INITIALIZE_TYPING_STORE,
  UPDATE_WORD,
  GOTO_NEXT_WORD,
  REFRESH_TYPING_STORE,
  START_TYPING,
  DONE_TYPING,
} as const;

export type ActionType = keyof typeof action;
export type Action = { type: ActionType, payload?: Partial<Typing> }

export default action
