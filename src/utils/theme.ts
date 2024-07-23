interface ColorTheme {
  background: string;
  text: string;
  typingBackground: string;
  untypedLetter: string;
  correctLetter: string;
  incorrectLetter: string;
  extraLetter: string;
  caret: string;
}

export function createColorTheme({
  background,
  text,
  typingBackground,
  untypedLetter,
  correctLetter,
  incorrectLetter,
  extraLetter,
  caret,
}: ColorTheme) {
  return {
    background,
    text,
    typingBackground,
    untypedLetter,
    correctLetter,
    incorrectLetter,
    extraLetter,
    caret,
  };
}
