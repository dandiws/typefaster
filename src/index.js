import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ThemeProvider } from 'theme-ui'
import theme from './theme'
import { Global, css } from '@emotion/core'
import { AppConfigProvider } from './hooks/useConfig'
// import reportWebVitals from './reportWebVitals'

ReactDOM.render(
  <React.StrictMode>
    <Global
      styles={css`
        @-webkit-keyframes opacityBreath {
          50% {
            opacity: 0;
          }
        }

        @keyframes opacityBreath {
          50% {
            opacity: 0;
          }
        }
      `}
    />
    <AppConfigProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </AppConfigProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()
