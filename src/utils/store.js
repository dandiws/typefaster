export function createTypingStore({
  inputValue = '',
  languageJSON = null,
  wordSequence = [],
  caretPosition = [0, 0],
  statistics = {},
  typingStatus = 'pending',
  startTime = null,
  finishTime = null,
}) {
  return {
    inputValue,
    languageJSON,
    wordSequence,
    caretPosition,
    statistics,
    typingStatus,
    startTime,
    finishTime,
  }
}

export function createConfigStore({
  lang = 'id',
  mode = 'time',
  duration = 60,
}) {
  return {
    lang,
    mode,
    duration,
  }
}
