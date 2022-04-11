import * as React from 'react'
import ErrorBgImage from 'assets/img/500.svg'
import { RecoilRoot } from 'recoil'
import { ThemeProvider } from '@mui/material/styles'
import { ErrorBoundary } from 'react-error-boundary'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

import theme from './themes/theme'
import 'assets/base.css'

const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE,
}

const ErrorFallback = () => (
  <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
    <h2>Ooops, đã có lỗi xảy ra :( </h2>
    <img src={ErrorBgImage} width={500} height={500} alt="500" />
    <br />
    <button
      type="button"
      onClick={() => window.location.assign(window.location.origin)}
    >
      Refresh
    </button>
  </div>
)

const AppProvider = ({ children }) => (
  <ThemeProvider theme={theme}>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <RecoilRoot>
        <AlertProvider template={AlertTemplate} {...options}>
          <div className="App">
            {children}
          </div>
        </AlertProvider>
      </RecoilRoot>
    </ErrorBoundary>
    <div id="alert" />
  </ThemeProvider>
)

export default AppProvider
