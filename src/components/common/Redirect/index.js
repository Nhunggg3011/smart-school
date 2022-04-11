import React from 'react'
import PropTypes from 'prop-types'
import { Redirect, useLocation } from 'react-router-dom'

const RedirectWithQueryParams = ({ to, ...props }) => {
  const location = useLocation()
  return (
    <Redirect {...props} to={`${to}${location.search}`.replace('??', '?')} />
  )
}

RedirectWithQueryParams.propTypes = {
  to: PropTypes.string.isRequired,
}

export default RedirectWithQueryParams
