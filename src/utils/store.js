export function createTypingStore({
  inputValue = '',
  languageJSON = null,
  wordSequence = [],
  caretPosition = [0, 0],
  statistics = {},
}) {
  return {
    inputValue,
    languageJSON,
    wordSequence,
    caretPosition,
    statistics,
  }
}

export function createConfigStore({
  lang = 'id',
  mode = 'time',
  duration = 30,
}) {
  return {
    lang,
    mode,
    duration,
  }
}
