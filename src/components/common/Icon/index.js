import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@mui/styles/withStyles'
import clsx from 'clsx'
import { COLORS } from 'themes/common'
import style from './style'

const Icon = ({
  classes, name, size, color, className,
}) => (
  <div
    className={clsx(classes.icon, size, className)}
    style={{
      color,
      maskImage: `url(/icons/${name}.svg)`,
      WebkitMaskImage: `url(/icons/${name}.svg)`,
      backgroundColor: color,
      maskSize: 'contain',
      WebkitMaskSize: 'contain',
      maskRepeat: 'no-repeat',
      WebkitMaskRepeat: 'no-repeat',
      maskPosition: 'center',
      WebkitMaskPosition: 'center',
      display: 'inline-block',
      width: typeof size === 'number' && size,
      height: typeof size === 'number' && size,
    }}
  />
)

Icon.defaultProps = {
  size: 'medium',
  color: COLORS.gray.darkGray,
  className: '',
}

Icon.propTypes = {
  classes: PropTypes.shape().isRequired,
  name: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([
    PropTypes.oneOf([
      'small', 'medium', 'large',
    ]),
    PropTypes.number,
  ]),
  color: PropTypes.string,
  className: PropTypes.string,
}

export default withStyles(style)(Icon)
