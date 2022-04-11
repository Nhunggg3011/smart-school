import React, { Suspense, useEffect } from 'react'
import PropTypes from 'prop-types'
import LinearProgress from '@mui/material/LinearProgress'
import CssBaseline from '@mui/material/CssBaseline'
import useStyles from './AuthLayout.style'
import './auth.css'

const AuthLayout = ({ children }) => {
  const classes = useStyles()

  return (
    <Suspense fallback={<LinearProgress />}>
      <div className={classes.root}>
        <CssBaseline />
        {children}
        {/* <img className={classes.imageBottom} src={BgBottom} alt="" /> */}
      </div>
    </Suspense>
  )
}

AuthLayout.propTypes = {
  children: PropTypes.any,
}

export default AuthLayout
