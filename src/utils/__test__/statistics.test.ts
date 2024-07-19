import Letter from "utils/Letter";
import Word from "utils/Word";
import {
  calculateAccuracy,
  calculateWPM,
  getCorrectWordSequence,
  getIncorrectWordSequence,
  getStatistics,
} from "utils/statistics";
import { describe, expect } from "vitest";

describe("getCorrectWordSequence function", () => {
  test("should always return an array", () => {
    const wordSequence = [
      new Word("hello"),
      new Word("world"),
      new Word("I"),
      new Word("love"),
      new Word("javascript"),
    ];

    expect(Array.isArray(getCorrectWordSequence(wordSequence))).toEqual(true);
    expect(Array.isArray(getCorrectWordSequence([]))).toEqual(true);
  });

  test("should return correct output and length", () => {
    const wordSequence = [
      new Word("hello"),
      new Word("world"),
      new Word("I"),
      new Word("love"),
      new Word("javascript"),
    ];

    for (const word of wordSequence) {
      word.isTyped = true;
    }

    wordSequence[1].letterSequence = wordSequence[0].letterSequence.map(
      (letter) => new Letter(letter.original, letter.original),
    );
    wordSequence[2].letterSequence = wordSequence[1].letterSequence.map(
      (letter) => new Letter(letter.original, letter.original),
    );

    const correctSequence = getCorrectWordSequence(wordSequence);
    expect(correctSequence[0]).toEqual(wordSequence[1]);
    expect(correctSequence[1]).toEqual(wordSequence[2]);
    expect(correctSequence.length).toEqual(2);

    wordSequence[1].isTyped = false;
    expect(getCorrectWordSequence(wordSequence)[0]).toEqual(wordSequence[2]);
    expect(getCorrectWordSequence(wordSequence).length).toEqual(1);
  });
});

describe("getIncorrectWordSequence function", () => {
  test("should always return an array", () => {
    const wordSequence = [
      new Word("hello"),
      new Word("world"),
      new Word("I"),
      new Word("love"),
      new Word("javascript"),
    ];

    expect(Array.isArray(getIncorrectWordSequence(wordSequence))).toEqual(true);
    expect(Array.isArray(getIncorrectWordSequence([]))).toEqual(true);
  });

  test("getIncorrectWordSequence", () => {
    const wordSequence = [
      new Word("hello"),
      new Word("world"),
      new Word("I"),
      new Word("love"),
      new Word("javascript"),
    ];

    for (const word of wordSequence) {
      word.isTyped = true;
    }

    wordSequence[1].letterSequence = wordSequence[0].letterSequence.map(
      (letter) => new Letter(letter.original, letter.original),
    );
    wordSequence[2].letterSequence = wordSequence[1].letterSequence.map(
      (letter) => new Letter(letter.original, letter.original),
    );
    wordSequence[4].letterSequence = wordSequence[1].letterSequence.map(
      (letter) => new Letter(letter.original, letter.original),
    );

    const incorrectSequence = getIncorrectWordSequence(wordSequence);
    expect(incorrectSequence[0]).toEqual(wordSequence[0]);
    expect(incorrectSequence[incorrectSequence.length - 1]).toEqual(
      wordSequence[3],
    );
    expect(incorrectSequence.length).toEqual(2);

    wordSequence[0].isTyped = false;
    expect(getIncorrectWordSequence(wordSequence).length).toEqual(1);
  });
});

describe("calculateWPM function", () => {
  test("should always return a number", () => {
    expect(calculateWPM([], 0)).toBeNaN();
    expect(calculateWPM([], -1)).toBeNaN();
    expect(calculateWPM([], 10)).toEqual(0);

    const wordSequence = [
      new Word("hello"),
      new Word("world"),
      new Word("I"),
      new Word("love"),
      new Word("javascript"),
    ];

    for (const word of wordSequence) {
      word.isTyped = true;
    }

    expect(calculateWPM(wordSequence, 60)).toBeGreaterThan(0);

    wordSequence[0].letterSequence = wordSequence[0].letterSequence.map(
      (letter) => new Letter(letter.original, letter.original),
    );

    expect(calculateWPM(wordSequence, 60)).toBeGreaterThan(0);
  });
});

describe("calculateAccuary function", () => {
  test("should always return a number", () => {
    const wordSequence = [
      new Word("hello"),
      new Word("world"),
      new Word("I"),
      new Word("love"),
      new Word("javascript"),
    ];

    for (const word of wordSequence) {
      word.isTyped = true;
    }

    expect(calculateAccuracy(wordSequence)).toBeGreaterThan(0);

    wordSequence[0].letterSequence = wordSequence[0].letterSequence.map(
      (letter) => new Letter(letter.original, letter.original),
    );

    expect(calculateAccuracy(wordSequence)).toBeGreaterThan(0);
  });
});

describe("getStatistics function", () => {
  test("should be numbers", () => {
    const output = Object.values(getStatistics([], 0))
      .map((val) => typeof val)
      .every((type) => type === "number");

    expect(output).toEqual(true);
  });
});
