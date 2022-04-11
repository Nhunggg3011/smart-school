import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles'
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import theme from 'themes/theme'
import CustomDialog from './CustomDialog'

const DialogContent = (props) => {
  const [open, setOpen] = useState(true)

  useEffect(() => {
    setOpen(true)
  }, [props])

  const close = () => {
    setOpen(false)
  }

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}><CustomDialog open={open} onClose={close} {...props} /></ThemeProvider>
    </StyledEngineProvider>
  )
}

const showDialog = (props) => {
  ReactDOM.render(<DialogContent {...props} />, document.getElementById('errorMessage'))
}

export {
  showDialog,
}
