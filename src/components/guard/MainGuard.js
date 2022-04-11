import React from 'react'
import PropTypes from 'prop-types'
import Redirect from 'components/common/Redirect'
import Guard from 'components/guard'

const MainGuard = ({ children }) => (
  <Guard accessWhen={(user) => user && (!user.admin || (user.admin && user.onboard))} fallbackComp={<Redirect to="/cau-hinh" />}>
    {children}
  </Guard>
)

MainGuard.propTypes = {
  children: PropTypes.any,
}

export default MainGuard
