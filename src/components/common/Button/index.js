import React from 'react'
import PropTypes from 'prop-types'
import { Button as ThemeButton } from '@mui/material'
import withStyles from '@mui/styles/withStyles'
import clsx from 'clsx'
import CircularProgress from '@mui/material/CircularProgress'
import { COLORS } from 'themes/common'

const ButtonStyled = withStyles(() => ({
  root: {
    height: 32,
    paddingTop: 0,
    paddingBottom: 0,
    textTransform: 'none',
    boxShadow: 'none',
    borderRadius: 5,
    '&.Mui-disabled': {
      color: `${COLORS.gray.disableGray} !important`,
      backgroundColor: `${COLORS.gray.disableGray2} !important`,
    },
  },
  label: {
    fontSize: 14,
    fontWeight: 400,
    paddingLeft: 10,
    paddingRight: 10,
  },
}))(ThemeButton)

const CircularProgressStyled = withStyles(() => ({
  root: {
    marginLeft: 8,
  },
}))(CircularProgress)

const style = () => ({
  rounded: {
    height: 38,
    borderRadius: 19,
  },
  // label
  labelPrimary: {
    color: `${COLORS.palette.white} !important`,
  },
  labelSecondary: {
    color: COLORS.gray.darkGray,
  },
  labelThird: {
    color: '#F64066',
  },
  labelWarning: {
    color: COLORS.palette.white,
  },
  // bg
  bgPrimary: {
    background: `${COLORS.palette.primaryBlue} !important`,
    '&:hover': {
      boxShadow: '0px 2px 6px #2933C533',
      background: COLORS.palette.primaryBlue,
    },
  },
  bgSecondary: {
    background: COLORS.palette.secondaryBlue3,
    '&:hover': {
      background: COLORS.palette.secondaryBlue3,
      boxShadow: '0px 2px 6px #2933C533',
    },
  },
  bgThird: {
    background: '#FEEBEF',
    '&:hover': {
      background: '#FEEBEF',
      boxShadow: '0px 2px 6px #2933C533',
    },
  },
  bgWarning: {
    background: COLORS.accent.apricotOrange1,
    '&:hover': {
      background: COLORS.accent.apricotOrange1,
      boxShadow: '0px 2px 6px #2933C533',
    },
  },
  // variant
  outline: {
    background: COLORS.palette.secondaryBlue3,
    color: COLORS.palette.primaryBlue,
    border: `1px solid ${COLORS.palette.primaryBlue}`,
    '&:hover': {
      boxShadow: '0px 2px 6px #2933C533',
      background: COLORS.palette.secondaryBlue3,
    },
  },
  loading: {
    opacity: 0.4,
    boxShadow: 'none',
    pointerEvents: 'none',
  },
  loadingOver: {
    position: 'absolute',
  },
})

const Button = ({
  classes,
  className,
  label,
  children,
  color,
  loading,
  rounded,
  variant,
  customclasses,
  loadingOver,
  ...props
}) => {
  const labelColor = clsx(
    classes.labelSecondary,
    color === 'primary' && classes.labelPrimary,
    color === 'third' && classes.labelThird,
    color === 'warning' && classes.labelWarning,
  )
  const backgroundColor = clsx(
    classes.bgSecondary,
    color === 'primary' && classes.bgPrimary,
    color === 'third' && classes.bgThird,
    color === 'warning' && classes.bgWarning,
  )
  const hasRounded = rounded ? `${classes.rounded}` : ''
  const outline = variant === 'outlined' ? classes.outline : ''
  const loadingClasses = loading ? classes.loading : ''

  return (
    <ButtonStyled
      className={
        clsx(
          hasRounded,
          labelColor,
          backgroundColor,
          outline,
          loadingClasses,
          className,
        )
      }
      classes={{
        root: classes.root,
        ...customclasses,
      }}
      variant={variant}
      {...props}
    >
      {label || children}
      {loading && (
      <CircularProgressStyled
        size={18}
        color="inherit"
        className={clsx({
          [classes.loadingOver]: loadingOver,
        })}
      />
      )}
    </ButtonStyled>
  )
}

Button.defaultProps = {
  label: '',
  color: 'primary',
  variant: 'contained',
  children: '',
  loading: false,
  rounded: false,
  className: '',
  customclasses: {},
  loadingOver: false,
}

Button.propTypes = {
  classes: PropTypes.shape().isRequired,
  customclasses: PropTypes.shape(),
  className: PropTypes.oneOfType([
    PropTypes.shape(),
    PropTypes.any,
  ]),
  label: PropTypes.oneOfType([
    PropTypes.shape(),
    PropTypes.string,
    PropTypes.any,
  ]),
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.shape(),
    PropTypes.string,
  ]),
  color: PropTypes.string,
  loading: PropTypes.bool,
  rounded: PropTypes.bool,
  variant: PropTypes.string,
  loadingOver: PropTypes.bool,
}

export default withStyles(style)(Button)
