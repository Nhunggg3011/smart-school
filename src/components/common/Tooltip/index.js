import React from 'react'
import PropTypes from 'prop-types'
import { hexToRgb } from '@mui/material'
import withStyles from '@mui/styles/withStyles'
import TooltipTheme from '@mui/material/Tooltip'
import { COLORS } from 'themes/common'

const style = () => ({
  icon: {
    cursor: 'pointer',
    display: 'inline-flex',

    '& img': {
      maxWidth: '100%',
    },
  },

})

const TooltipStyled = withStyles(() => ({
  tooltip: {
    background: `rgba(${hexToRgb(COLORS.gray.darkGray).replace('rgb(', '').replace(')', '')}, 0.8)`,
    color: COLORS.palette.white,
    fontWeight: '400',
  },
}))(TooltipTheme)

const Tooltip = ({
  classes,
  icon,
  content,
  placement,
  tooltipClasses,
  size,
  ...props
}) => (
  <TooltipStyled
    title={content}
    placement={placement}
    classes={{ ...tooltipClasses }}
    enterTouchDelay={5}
    {...props}
  >
    <div className={classes.icon} style={{ width: size || 'auto' }}>
      {icon || <img src="/icons/info.svg" alt="info" />}
    </div>
  </TooltipStyled>
)
Tooltip.defaultProps = {
  placement: 'left-start',
  icon: null,
  tooltipClasses: {},
  size: 0,
}

Tooltip.propTypes = {
  classes: PropTypes.shape().isRequired,
  icon: PropTypes.node,
  content: PropTypes.node.isRequired,
  placement: PropTypes.string,
  tooltipClasses: PropTypes.shape(),
  size: PropTypes.number,
}

export default withStyles(style)(Tooltip)
