import { createColorTheme } from '../utils/theme'

const light = createColorTheme({
  background: '#fcfcfc',
  text: '#060606',
  untypedLetter: '#999999',
  correctLetter: '#000',
  incorrectLetter: '#ff4242',
  extraLetter: '#999999',
  typingBackground: '#f5f5f5',
  caret: '#000000',
  secondaryText: 'text',
})

const oneDarkPro = createColorTheme({
  background: '#21252B',
  typingBackground: '#282C34',
  text: '#999999',
  untypedLetter: '#C678DD',
  incorrectLetter: '#E5C07B',
  correctLetter: '#69B679',
  extraLetter: '#ABB0B2',
  caret: '#528BFF',
})

const monokai = createColorTheme({
  background: '#1E1F1C',
  text: '#B67534',
  typingBackground: '#272822',
  correctLetter: '#fff',
  incorrectLetter: '#D72F37',
  caret: '#fff',
})

const pink = createColorTheme({
  background: '#181818',
  typingBackground: '#202020',
  text: '#fd778d',
  untypedLetter: '#ffd3da',
  correctLetter: '#fd778d',
  incorrectLetter: '#ffc710',
  extraLetter: '#fdcddf',
})

const colors = {
  text: '#fff',
  secondaryText: 'grayText',
  background: '#060606',
  primary: '#3cf',
  secondary: '#e0f',
  muted: '#191919',
  highlight: '#29112c',
  gray: '#999',
  purple: '#c0f',
  correctLetter: '#55ec47',
  incorrectLetter: '#F07178',
  extraLetter: '#f0c471',
  untypedLetter: 'grayText',
  typingBackground: '#181717',
  modes: {
    light,
    oneDarkPro,
    monokai,
    pink,
  },
}

export default colors
