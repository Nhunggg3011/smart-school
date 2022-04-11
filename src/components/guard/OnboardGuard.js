import React from 'react'
import PropTypes from 'prop-types'
import Redirect from 'components/common/Redirect'
import Guard from 'components/guard'

const OnboardGuard = ({ children }) => (
  <Guard accessWhen={(user) => user && (user.admin && !user.onboard)} fallbackComp={<Redirect to="/trang-chu" />}>
    {children}
  </Guard>
)

OnboardGuard.propTypes = {
  children: PropTypes.any,
}

export default OnboardGuard
