import { render, screen } from "@testing-library/react";
import MockThemeUI from "components/MockThemeUI";
import WordComponent from "components/Word";
import Word from "utils/Word";
import { expect, test } from "vitest";

import { matchers } from "@emotion/jest";

// Add the custom matchers provided by '@emotion/jest'

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
expect.extend(matchers as any);

test("Word component null if word.show is false", () => {
  const word = new Word("javascript");
  word.show = false;

  render(<WordComponent word={word} />);
  expect(screen.queryByTestId("word")).toBe(null);
});

test("Word component render correct word", () => {
  const word = new Word("javascript");
  render(
    <MockThemeUI>
      <WordComponent word={word} />
    </MockThemeUI>,
  );
  expect(screen.getByTestId("word").textContent).toBe("javascript");
});

test("Correctly typed word is not strike through", () => {
  const word = new Word("javascript");
  word.isTyped = true;
  word.letterSequence = word.letterSequence.map((letter) => ({
    ...letter,
    status: "correct",
  }));

  render(
    <MockThemeUI>
      <WordComponent word={word} />
    </MockThemeUI>,
  );
  expect(screen.getByTestId("word")).not.toHaveStyleRule(
    "text-decoration",
    "line-through",
  );
});

test("Incorrectly typed word is strike through", () => {
  const word = new Word("javascript");
  word.isTyped = true;
  word.letterSequence = word.letterSequence.map((letter) => ({
    ...letter,
    status: "correct",
  }));

  word.letterSequence[2].status = "incorrect";

  render(
    <MockThemeUI>
      <WordComponent word={word} />
    </MockThemeUI>,
  );
  expect(screen.getByTestId("word")).toHaveStyleRule(
    "text-decoration",
    "line-through",
  );
});
