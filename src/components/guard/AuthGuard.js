import React from 'react'
import PropTypes from 'prop-types'
import Redirect from 'components/common/Redirect'
import Guard, { isNotLogined } from 'components/guard'

const AuthGuard = ({ children }) => (
  <Guard accessWhen={isNotLogined} fallbackComp={<Redirect to="/trang-chu" />}>
    {children}
  </Guard>
)

AuthGuard.propTypes = {
  children: PropTypes.any,
}

export default AuthGuard
