import React, { Suspense } from 'react'
import PropTypes from 'prop-types'
import LinearProgress from '@mui/material/LinearProgress'

const BlankLayout = ({ children }) => (
  <Suspense fallback={<LinearProgress />}>
    {children}
  </Suspense>
)

BlankLayout.propTypes = {
  children: PropTypes.any,
}

export default BlankLayout
