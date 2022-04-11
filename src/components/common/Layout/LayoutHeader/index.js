import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@mui/styles/withStyles'
import clsx from 'clsx'
import { vh } from 'themes/common'

const style = (theme) => ({
  container: {
    background: 'white',
    // boxShadow: '0px 2px 10px #EDF1FB',
    zIndex: 1,
  },

  sticky: {
    position: 'sticky',
    top: 0,
    zIndex: 20,

    [vh.down('md')]: {
      position: 'static',
      top: 'auto',
    },
  },

  content: {
    margin: '0 auto !important',
    paddingTop: `${theme.spacing(2)} !important`,
    paddingBottom: `${theme.spacing(2)} !important`,
    borderBottom: '1px solid #fafafa',
  },
})

const LayoutHeader = ({
  classes, children, sticky, className, contentClassName,
}) => (
  <div className={clsx(classes.container, {
    [classes.sticky]: sticky,
    [className]: className,
  })}
  >
    <div className={clsx(classes.content, 'grid lg wrap-content-header', { [contentClassName]: !!contentClassName })}>
      {children}
    </div>
  </div>
)

LayoutHeader.defaultProps = {
  sticky: false,
  className: null,
  contentClassName: null,
}

LayoutHeader.propTypes = {
  classes: PropTypes.shape().isRequired,
  children: PropTypes.node.isRequired,
  sticky: PropTypes.bool,
  className: PropTypes.string,
  contentClassName: PropTypes.string,
}

export default withStyles(style)(LayoutHeader)
