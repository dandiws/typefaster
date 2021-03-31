import React from 'react'
import { render, screen } from '@testing-library/react'
import Word from 'utils/Word'
import WordComponent from 'components/Word'
import MockThemeUI from 'components/MockThemeUI'

import { matchers } from '@emotion/jest'

// Add the custom matchers provided by '@emotion/jest'
expect.extend(matchers)


test('Word component null if word.show is false', () => {
  let word = new Word('javascript')
  word.show = false

  render(<WordComponent word={word} />)
  expect(screen.queryByTestId('word')).toBe(null)
})

test('Word component render correct word', () => {
  let word = new Word('javascript')
  render(
    <MockThemeUI>
      <WordComponent word={word} />
    </MockThemeUI>
  )
  expect(screen.getByTestId('word')).toHaveTextContent('javascript')
})

test('Correctly typed word is not strike through', () => {
  let word = new Word('javascript')
  word.isTyped = true
  word.letterSequence = word.letterSequence.map(letter=>({
    ...letter,
    status: 'correct'
  }))

  render(
    <MockThemeUI>
      <WordComponent word={word} />
    </MockThemeUI>
  )
  expect(screen.getByTestId('word')).not.toHaveStyleRule('text-decoration',`line-through`)
})

test('Incorrectly typed word is strike through', () => {
  let word = new Word('javascript')
  word.isTyped = true
  word.letterSequence = word.letterSequence.map(letter=>({
    ...letter,
    status: 'correct'
  }))

  word.letterSequence[2].status = 'incorrect'

  render(
    <MockThemeUI>
      <WordComponent word={word} />
    </MockThemeUI>
  )
  expect(screen.getByTestId('word')).toHaveStyleRule('text-decoration',`line-through`)
})
