# Naming Convention

## Letter

Letter is an object that represent an character.

```js
{
  original: string,
  typed: null | string,
  status: 'untyped' | 'correct' | 'incorrect' | 'extra',
}
```

## LetterSequence

LetterSequence is array of [Letter](#letter)

## Word

Word is an object that represent sequence of letters.

```js
{
  isTyped: boolean,
  show: boolean,
  elRef: RefObject,
  originalWord: string,
  letterSequence: Array<Letter>,
}
```

## WordSequence

WordSequence is array of [Word](#word)

## TypingStore

TypingStore is an object that represent state of user's typing in typing area.

```js
{
  inputValue:string,
  languageJSON: {
    lang: string
    name: string
    words: Array<string>
  },
  wordSequence: WordSequence,
  caretPosition: [number, number],
  statistics: Object
}
```

## Statistics

Statistics is result of a test in range of time.

```js
{
  wpm: number,
  accuracy: number,
  correctWords: number,
  incorrectWords: number,
  time: number //in seconds
}
```
