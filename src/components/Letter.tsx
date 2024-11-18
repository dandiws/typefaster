import { cn } from "lib/utils";
import { memo } from "react";
import type Letter from "utils/Letter";

const letterColor: { [key: string]: string } = {
  untyped: "text-untypedLetter",
  correct: "text-correctLetter",
  incorrect: "text-incorrectLetter",
  extra: "text-extraLetter",
};

const LetterComponent = memo(
  ({ letter, cursor }: { letter: Letter; cursor?: boolean }) => (
    <span
      data-testid="letter"
      className={cn(
        "relative",
        letter.status && letterColor[letter.status],
        cursor &&
          "before:content-['|'] before:text-caret before:absolute before:right-1/2 before:animate-caret",
      )}
    >
      {letter.typed || letter.original}
    </span>
  ),
  (prevProps, nextProps) =>
    prevProps.letter.typed === nextProps.letter.typed &&
    prevProps.cursor === nextProps.cursor,
);

export default LetterComponent;
