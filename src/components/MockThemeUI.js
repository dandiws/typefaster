import React from 'react';
import { ThemeProvider } from 'theme-ui'
import theme from 'theme'

function MockThemeUI({ children }) {
  return (
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>  
  )
}

export default MockThemeUI;