import { cn } from "lib/utils";
import { memo } from "react";
import Letter from "utils/Letter";
import type Word from "../utils/Word";
import { isCorrectlyTyped } from "../utils/Word";
import LetterComponent from "./Letter";

const WordComponent = memo(
  ({ word, cursorIndex }: { word: Word; cursorIndex?: number | null }) => {
    return (
      word.show && (
        <span ref={word.elRef}>
          <span
            data-testid="word"
            className={cn(
              "inline-block decoration-incorrectLetter",
              word.isTyped && !isCorrectlyTyped(word) && "line-through",
            )}
          >
            {word.letterSequence.map((l, i) => (
              <LetterComponent
                cursor={i === cursorIndex}
                key={`${l.original ?? ""}-${i}`}
                letter={l}
              />
            ))}
          </span>
          <LetterComponent
            cursor={!!cursorIndex && cursorIndex >= word.originalWord.length}
            letter={new Letter(" ")}
          />
        </span>
      )
    );
  },
  (prevProps, nextProps) =>
    prevProps.cursorIndex === nextProps.cursorIndex &&
    prevProps.word.show === nextProps.word.show &&
    prevProps.word.isTyped === nextProps.word.isTyped,
);

export default WordComponent;
