import { Language, Mode, Theme } from "./constant";
import Word from "./Word";

export interface Config {
  lang: Language;
  duration: number;
  mode: Mode;
  theme: Theme;
}

interface LanguageJSON {
  lang: string;
  name: string;
  words: string[]
}

export interface Typing {
  inputValue: string;
  languageJSON: LanguageJSON | null;
  wordSequence: Array<Word>;
  caretPosition: [number, number];
  statistics: {
    accuracy: number;
    wpm: number;
    correctWords: number;
    incorrectWords: number;
  };
  typingStatus: 'pending' | 'done' | 'started';
  typingMinutes?: number;
  startTime: number | null;
  finishTime: number | null;
}

export function createTypingStore({
  inputValue = '',
  languageJSON = null,
  wordSequence = [],
  caretPosition = [0, 0],
  statistics = { accuracy: 0, correctWords: 0, incorrectWords: 0, wpm: 0 },
  typingStatus = 'pending',
  startTime = null,
  finishTime = null,
}: Partial<Typing>): Typing {
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
  theme = 'default'
}: Partial<Config>): Config {
  return {
    lang,
    mode,
    duration,
    theme
  }
}
