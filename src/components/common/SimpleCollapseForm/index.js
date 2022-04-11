import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@mui/styles/withStyles'
import clsx from 'clsx'
import Collapse from '@mui/material/Collapse'
import style from './style'

const SimpleCollapseForm = ({
  classes, className, Header, children, contentClassName, collapse,
}) => (
  <div className={clsx(classes.root, className)}>
    <div className={clsx(classes.header, {
      [classes.headerExpand]: collapse,
    })}
    >
      {Header}
    </div>
    <Collapse in={collapse}>
      <div className={clsx(classes.content, contentClassName)}>
        {children}
      </div>
    </Collapse>
  </div>
)

SimpleCollapseForm.defaultProps = {
  className: '',
  children: '',
  contentClassName: '',
  collapse: false,
  Header: '',
}

SimpleCollapseForm.propTypes = {
  classes: PropTypes.shape().isRequired,
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  contentClassName: PropTypes.string,
  collapse: PropTypes.bool,
  Header: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
}

export default withStyles(style)(SimpleCollapseForm)
