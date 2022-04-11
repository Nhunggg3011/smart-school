import React from 'react'
import PropTypes from 'prop-types'
import Redirect from 'components/common/Redirect'
import Guard, { isLogined } from 'components/guard'

const AuthenticatedGuard = ({ children }) => (
  <Guard accessWhen={isLogined} fallbackComp={<Redirect to="/dang-nhap" />}>
    {children}
  </Guard>
)

AuthenticatedGuard.propTypes = {
  children: PropTypes.any,
}

export default AuthenticatedGuard
