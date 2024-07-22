import { cn } from "lib/utils";
import type React from "react";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import useTypingStore from "../store/typing";
import actionType from "../store/typing/action";
import Hotkey from "./Hotkey";
import WordComponent from "./Word";

const DISABLED_KEYS = [
  "arrowup",
  "Arrowdown",
  "arrowleft",
  "arrowright",
  "home",
  "end",
  "tab",
];

const DISABLED_CTRL = ["a", "c", "v"];

const TypingArea = memo(() => {
  const { typing, dispatch } = useTypingStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const [blur, setBlur] = useState(false);

  useHotkeys("shift+Enter", () => {
    dispatch({ type: actionType.REFRESH_TYPING_STORE });
  });

  useHotkeys("shift+f", () => focusInput(), {
    keydown: false,
    keyup: true,
  });

  const focusInput = useCallback(() => {
    if (!inputRef.current) return;

    return inputRef.current.focus();
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (DISABLED_KEYS.includes(e.key.toLowerCase())) {
        e.preventDefault();
        return;
      }

      if (DISABLED_CTRL.includes(e.key.toLowerCase()) && e.ctrlKey) {
        e.preventDefault();
        return;
      }
    },
    [],
  );

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (typing.typingStatus === "done")
        dispatch({ type: actionType.REFRESH_TYPING_STORE });

      focusInput();
    },
    [dispatch, typing.typingStatus, focusInput],
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (typing.typingStatus === "pending") {
        dispatch({ type: actionType.START_TYPING });
      }

      const value = e.target.value;
      if (value.endsWith(" ")) {
        const seconds = (Date.now() - (typing.startTime ?? 0)) / 1000;
        dispatch({
          type: actionType.GOTO_NEXT_WORD,
          payload: { typingMinutes: seconds },
        });
      } else {
        dispatch({
          type: actionType.UPDATE_WORD,
          payload: { inputValue: value },
        });
      }
    },
    [dispatch, typing.typingStatus, typing.startTime],
  );

  useEffect(() => {
    const isInputFocused =
      inputRef.current && inputRef.current === document.activeElement;

    if (isInputFocused) setBlur(false);
    else setBlur(true);
  }, []);

  useEffect(() => {
    if (typing.typingStatus === "done") {
      setBlur(true);
    }
    if (typing.typingStatus === "pending") {
      focusInput();
    }
  }, [typing.typingStatus, focusInput]);

  return (
    <div className="relative">
      <div
        className={cn(
          "bg-typingBackground rounded-lg p-3",
          blur && "filter blur-[5px] opacity-25",
        )}
      >
        <div className="px-1 font-mono text-xl text-zinc-500 h-[70px] overflow-hidden leading-[35px] whitespace-pre-wrap">
          <input
            ref={inputRef}
            type="text"
            value={typing.inputValue}
            onChange={handleInputChange}
            onBlur={() => {
              // focusInput()
              setBlur(true);
            }}
            onFocus={() => setBlur(false)}
            className="w-10 opacity-0 absolute"
            onKeyDown={handleKeyDown}
            disabled={typing.typingStatus === "done"}
            autoCapitalize="off"
            // biome-ignore lint/a11y/noAutofocus: <explanation>
            autoFocus
          />
          {typing.wordSequence.map((w, i) => (
            <WordComponent
              // blur={blur}
              key={w.key}
              word={w}
              cursorIndex={
                i === typing.caretPosition[0] ? typing.caretPosition[1] : null
              }
            />
          ))}
        </div>
      </div>
      {blur && (
        // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
        <div
          className="absolute w-full h-full left-0 top-0 justify-center items-center text-typingText font-bold cursor-pointer text-lg flex flex-col"
          onClick={handleOverlayClick}
        >
          {typing.typingStatus === "done" ? (
            <>
              <div>
                Click or <Hotkey>Shift+Enter</Hotkey> to start new test
              </div>
            </>
          ) : (
            <span>
              Click or <Hotkey>Shift+F</Hotkey> to focus
            </span>
          )}
        </div>
      )}
    </div>
  );
});

export default TypingArea;
