import React from 'react'
import PropTypes from 'prop-types'
import { FormControlLabel, Checkbox } from '@mui/material'
import withStyles from '@mui/styles/withStyles'
import CheckIcon from '@mui/icons-material/Check'
import clsx from 'clsx'
import { COLORS } from 'themes/common'

const style = {
  formControlLabel: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    marginLeft: -8,
    '& .MuiFormControlLabel-label': {
      color: COLORS.palette.black,
      fontSize: 14,
    },
  },
  checkedIcon: {
    width: 20,
    height: 20,
    border: `1px solid ${COLORS.palette.secondaryBlue8}`,
    borderRadius: 3,
    background: COLORS.palette.secondaryBlue3,
  },
  uncheckedIcon: {
    width: 20,
    height: 20,
    border: `1px solid ${COLORS.palette.secondaryBlue2}`,
    borderRadius: 3,
    background: COLORS.palette.secondaryBlue3,
    color: 'transparent',
    '&.error': {
      border: `1px solid ${COLORS.accent.rubyRed1}`,
    },
    '&.whiteColor': {
      background: 'white',
    },
  },
  disabledBorder: {
    border: `1px solid ${COLORS.palette.secondaryBlue2}`,
  },
}

const CheckBoxStyled = withStyles(() => ({
  root: {
    color: COLORS.palette.secondaryBlue2,
    padding: 8,
  },
  checked: {},
}))((props) => <Checkbox {...props} />)

const CheckBox = ({
  classes,
  label,
  disabled,
  color,
  error,
  children,
  className,
  whiteColor,
  ...props
}) => (
  <FormControlLabel
    className={clsx(classes.formControlLabel, className)}
    label={label || children}
    control={(
      <CheckBoxStyled
        color={color}
        disabled={disabled}
        checkedIcon={<CheckIcon className={clsx(classes.checkedIcon, { [classes.disabledBorder]: disabled })} />}
        icon={<CheckIcon className={clsx(classes.uncheckedIcon, { error }, { whiteColor })} />}
        role="presentation"
        onClick={(e) => {
          e.stopPropagation()
        }}
        {...props}
      />
    )}
    {
      ...(disabled ? { onClick: (e) => e.preventDefault() } : {})
    }
  />
)

CheckBox.defaultProps = {
  color: 'primary',
  disabled: false,
  className: '',
  label: '',
  children: '',
  error: false,
  whiteColor: false,
}

CheckBox.propTypes = {
  classes: PropTypes.shape().isRequired,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape(),
  ]),
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape(),
  ]),
  color: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  whiteColor: PropTypes.bool,
}

export default withStyles(style)(CheckBox)
