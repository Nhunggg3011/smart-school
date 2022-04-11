import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@mui/styles/withStyles'
import clsx from 'clsx'
import { COLORS } from 'themes/common'

const style = (theme) => ({
  divider: {
    width: `calc(100% + ${theme.spacing(4)})`,
    margin: theme.spacing(3, -3),
    marginTop: 'auto',
    height: 1,
    background: COLORS.gray.disableGray1,
  },
})

const Footer = ({ classes, children, className }) => (
  <>
    <div className={clsx(classes.divider, className)} />
    <div className={classes.footer}>{children}</div>
  </>
)

Footer.defaultProps = {
  className: '',
}

Footer.propTypes = {
  classes: PropTypes.shape().isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

export default withStyles(style)(Footer)
