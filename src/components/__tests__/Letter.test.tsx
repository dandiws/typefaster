import { render, screen } from "@testing-library/react";
import LetterComponent from "components/Letter";
import MockThemeUI from "components/MockThemeUI";
import Letter from "utils/Letter";
import { expect, test } from "vitest";

import { matchers } from "@emotion/jest";

// Add the custom matchers provided by '@emotion/jest'

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
expect.extend(matchers as any);

test("Letter component render correct letter", () => {
  const letter = new Letter("a", "b");
  render(<LetterComponent letter={letter} />);
  expect(screen.getByTestId("letter").textContent).toBe("b");
});

test("Letter component render correct letter - 2", () => {
  const letter = new Letter("a");
  render(<LetterComponent letter={letter} />);
  expect(screen.getByTestId("letter").textContent).toBe("a");
});

test("Letter component should render caret", () => {
  const letter = new Letter("a");
  render(
    <MockThemeUI>
      <LetterComponent letter={letter} cursor={true} />
    </MockThemeUI>,
  );
  expect(screen.getByTestId("letter")).toHaveStyleRule("content", '"|"', {
    target: ":before",
  });
});

test("Letter component should not render caret", () => {
  const letter = new Letter("a");
  render(
    <MockThemeUI>
      <LetterComponent letter={letter} cursor={false} />
    </MockThemeUI>,
  );
  expect(screen.getByTestId("letter")).not.toHaveStyleRule("content", '"|"', {
    target: ":before",
  });
});
