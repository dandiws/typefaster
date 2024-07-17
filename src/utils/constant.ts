export const language = {
  id: 'id',
  en: 'en',
} as const

export const mode = {
  time: 'time',
  word: 'word',
} as const

export const duration = {
  '30s': 30,
  '60s': 60,
} as const

export const theme = {
  default: 'Dark',
  light: 'Light',
  oneDarkPro: 'One Dark Pro',
  monokai: 'Monokai',
  pink: 'Pink',
} as const

const constant = {
  language,
  mode,
  duration,
  theme,
}

export type Language = keyof typeof language;
export type Mode = keyof typeof mode;
export type Theme = keyof typeof theme;
export type Duration = keyof typeof duration;

export default constant
