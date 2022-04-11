import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Typography } from '@mui/material'
import withStyles from '@mui/styles/withStyles'
import clsx from 'clsx'
import { COLORS } from 'themes/common'
import Footer from './Footer'

const style = (theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column !important',
    background: 'white',
    borderRadius: 10,
    marginBottom: theme.spacing(2),
    boxShadow: '0px 2px 10px #EDF1FB',
    padding: theme.spacing(3),
  },
  content: {
    flex: 1,
  },
  divider: {
    width: `calc(100% + ${theme.spacing(4)})`,
    margin: theme.spacing(3, -3),
    height: 1,
    background: COLORS.gray.disableGray1,
  },
  title: {
    color: COLORS.palette.primaryBlue,
    textTransform: 'uppercase !important',
    fontWeight: '500 !important',
    marginBottom: `${theme.spacing(1)} !important`,
  },
})

const GridItem = ({
  classes, className, children, title, titleClassName, header, contentClassName, ...props
}) => (
  <Grid item {...props} className={clsx(classes.container, className)}>
    {title && (<Typography variant="subtitle1" className={clsx(classes.title, titleClassName)}>{title}</Typography>)}
    {header}
    {<div className={clsx(classes.content, contentClassName)}>{children}</div>}
  </Grid>
)

GridItem.defaultProps = {
  className: '',
  titleClassName: '',
  contentClassName: '',
  header: '',
  title: null,
}

GridItem.propTypes = {
  classes: PropTypes.shape().isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  title: PropTypes.string,
  header: PropTypes.node,
  titleClassName: PropTypes.string,
  contentClassName: PropTypes.string,
}

GridItem.Footer = Footer

export default withStyles(style)(GridItem)
