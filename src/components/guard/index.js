import React from 'react'
import PropTypes from 'prop-types'
import { useAuth } from 'store/auth'
import Loading3Dot from 'components/common/Loading3Dot'

const Guard = ({
  accessWhen,
  children,
  fallbackComp,
}) => {
  const [user, _, loading] = useAuth()
  if (loading) {
    return (
      <div style={{
        width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center',
      }}>
        <Loading3Dot />
      </div>
    )
  }

  const isAllowedAccess = accessWhen(user)
  if (!isAllowedAccess) return fallbackComp
  return children
}

Guard.defaultProps = {
  accessWhen: () => false,
}

Guard.propTypes = {
  children: PropTypes.node,
  accessWhen: PropTypes.func,
  fallbackComp: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
}

Guard.defaultProps = {
  fallbackComp: null,
}

export const isLogined = (user) => !!user
export const isNotLogined = (user) => !user

export default Guard
