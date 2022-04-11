import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'

const BasicRoute = ({ component: Comp, xProps, ...props }) => {
  const renderComponent = (routeProps) => (
    <Comp {...xProps} {...routeProps} {...routeProps.match.params} />
  )
  return (<Route {...props} component={renderComponent} />)
}

BasicRoute.defaultProps = {
  xProps: {},
}

BasicRoute.propTypes = {
  component: PropTypes.any,
  xProps: PropTypes.shape(),
}

export default BasicRoute
