import React, { Suspense } from 'react'
import PropTypes from 'prop-types'
import LinearProgress from '@mui/material/LinearProgress'
import CssBaseline from '@mui/material/CssBaseline'
import useStyles from './OnboardLayout.style'
import './auth.css'

const OnboardLayout = ({ children }) => {
  const classes = useStyles()
  return (
    <Suspense fallback={<LinearProgress />}>
      <div className={classes.root}>
        <CssBaseline />
        {children}
      </div>
    </Suspense>
  )
}

OnboardLayout.propTypes = {
  children: PropTypes.any,
}

export default OnboardLayout
