import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { FormLabel, TextField } from '@mui/material'
import withStyles from '@mui/styles/withStyles'
import clsx from 'clsx'
import InputAdornment from '@mui/material/InputAdornment'
import CircularProgress from '@mui/material/CircularProgress'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { COLORS } from 'themes/common'
import Tooltip from 'components/common/Tooltip'

const style = (theme) => ({
  container: {
    display: 'flex',
    flex: 1,
    position: 'relative',
  },
  root: {
    flex: 1,
    width: '100%',

    '& input': {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      fontSize: 14,
    },
    '& textarea': {
      fontSize: 14,
    },
    '& .MuiFormHelperText-root:first-letter': {
      textTransform: 'uppercase',
    },

    '& .MuiInputBase-root.Mui-disabled': {
      background: COLORS.gray.disableGray2,
      pointerEvents: 'none',
    },
  },
  inputAdornment: {
    background: COLORS.palette.secondaryBlue3,
  },
  iconContainer: {
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    marginRight: 8,
  },
  tickIcon: {
    marginRight: 10,
  },
  processingIcon: {
    marginRight: 12,
  },
  tooltip: {
    marginLeft: 16,
    cursor: 'pointer',
    display: 'inline-block',
    paddingTop: 6,
  },
  hasLegend: {
    '& $tooltip': {
      paddingTop: 28,
    },
  },
  tooltipContent: {
    paddingRight: 36,
    display: 'block',
    textAlign: 'left',
    fontSize: 12,
  },
  tooltipContentPaddingLeft: {
    paddingLeft: 48,
  },
  legendTooltip: {
    marginLeft: 8,
  },
  leftItem: {
    marginRight: 16,
    height: 32,
    display: 'inline-flex',
    alignItems: 'center',
  },
  leftItemWithTopSpace: {
    marginTop: 22,
  },
  formLabel: {
    textAlign: 'left',
    fontSize: 14,
    letterSpacing: 0,
    color: COLORS.palette.black,
    marginBottom: theme.spacing(1),
    opacity: 1,
    position: 'relative',
    zIndex: 2,
    display: '-webkit-box',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 1,
  },
  main: {
    flex: 1,
    minWidth: 0,
    position: 'relative',
  },
  endDotDotDot: {
    '& input': {
      display: 'inline-block',
      whiteSpace: 'nowrap',
      overflow: 'hidden !important',
      textOverflow: 'ellipsis',
    },
  },
})

const TextInputStyled = withStyles((theme) => ({
  root: {
    '& input': {
      fontSize: 14,
    },
    '& .MuiOutlinedInput-root': {
      paddingRight: 0,
    },
    '&.correct': {
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: COLORS.accent.viridianGreen1,
        },
        '&:hover fieldset': {
          borderColor: COLORS.accent.viridianGreen1,
        },
        '&.Mui-focused fieldset': {
          borderColor: COLORS.accent.viridianGreen1,
        },
      },
    },
    '&.remove-cursor': {
      '& .MuiOutlinedInput-root': {
        '& input': {
          color: 'transparent',
          textShadow: `0 0 0 ${COLORS.gray.textGray1}`,
          cursor: 'pointer',
          '&::placeholder': {
            color: 'transparent',
          },
        },
      },
    },
    '& input.MuiInputBase-input': {
      height: theme.spacing(2),
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      paddingRight: theme.spacing(2),
      '&:disabled': {
        borderRadius: theme.spacing(0.5),
        background: COLORS.gray.disableGray2,
        cursor: 'auto !important',
      },
    },
    '& .MuiOutlinedInput-root.Mui-disabled': {
      background: COLORS.gray.disableGray2,
    },

    '& .MuiFormHelperText-contained': {
      marginRight: 3,
      marginLeft: 3,
    },

    '& .MuiFormHelperText-root.Mui-error': {
      color: COLORS.accent.rubyRed1,
    },

    '&.leftItem': {
      '& .MuiFormHelperText-contained': {
        marginRight: 3,
      },
    },

    '& .MuiInputLabel-outlined': {
      [theme.breakpoints.up('lg')]: {
        fontSize: 14,

        '&:not(.MuiInputLabel-shrink)': {
          transform: 'translate(14px, 10px) scale(1)',
        },
      },

      '&:not(.MuiInputLabel-shrink)': {
        transform: 'translate(14px, 9px) scale(1)',
      },
    },
  },
}))(TextField)

const TextInput = ({
  classes,
  className,
  containerClassName,
  type,
  correct,
  processing,
  tooltip,
  leftItem,
  rightIcon,
  legend,
  legendTooltip,
  offsetEnd,
  error,
  helperText,
  endDotDotDot,
  disabledScroll,
  handleBlur,
  inputProps,
  checkRemoveCursor,
  ...props
}) => {
  const [show, setShow] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const passwordClasses = type === 'password' ? ' password' : ''
  const correctClasses = correct ? 'correct' : ''
  const removeCursorClasses = checkRemoveCursor ? 'remove-cursor' : ''

  const theme = useTheme()
  const isTablet = useMediaQuery(theme.breakpoints.down('md'))

  const renderTooltip = () => {
    if (isTablet && tooltip?.responsive) {
      return (
        <div role="presentation" className={classes.tooltip} style={{ width: tooltip?.size || 'auto' }} onClick={() => setShowTooltip(!showTooltip)}>
          {tooltip?.icon || <img src="/icons/info.svg" alt="info" />}
        </div>
      )
    }

    const { responsive, ...tooltipProps } = tooltip
    return (
      <Tooltip
        className={classes.tooltip}
        {...tooltipProps}
      />
    )
  }

  return (
    <>
      <div className={clsx(classes.container, containerClassName, { [classes.endDotDotDot]: endDotDotDot, [classes.hasLegend]: !!legend })}>
        {leftItem && <div className={clsx(classes.leftItem, { [classes.leftItemWithTopSpace]: legend })}>{leftItem}</div>}

        <div className={classes.main}>
          {legend && (
            <FormLabel component="legend" className={classes.formLabel}>
              {legend}
              {legendTooltip
                && (
                  <Tooltip
                    className={classes.legendTooltip}
                    {...legendTooltip}
                  />
                )}
            </FormLabel>
          )}

          <TextInputStyled
            className={clsx(passwordClasses, correctClasses, removeCursorClasses, className, classes.root)}
            variant="outlined"
            size="small"
            type={show ? 'text' : type}
            error={error}
            helperText={helperText}
            onWheel={disabledScroll ? (event) => event.target.blur() : undefined}
            InputProps={{
              endAdornment: rightIcon && (
                <InputAdornment position="end" className={classes.inputAdornment}>
                  {correct && (
                    <div className={clsx(classes.iconContainer, classes.tickIcon)}>
                      <img alt="tick" src="/icons/tick-input.svg" />
                    </div>
                  )}
                  {type === 'password' && (
                    <div
                      className={classes.iconContainer}
                      role="presentation"
                      onClick={() => setShow(!show)}
                    >
                      {show ? <img alt="invisible" src="/icons/visibility-off.svg" /> : <img alt="visible" src="/icons/visibility.svg" />}
                    </div>
                  )}
                  {processing && (
                    <div className={clsx(classes.iconContainer, classes.processingIcon)}>
                      <CircularProgress size={16} />
                    </div>
                  )}
                </InputAdornment>
              ),

            }}
            {...props}
            // eslint-disable-next-line react/jsx-no-duplicate-props
            inputProps={{
              ...inputProps,
            }}
            {...inputProps}
          />
        </div>
        {tooltip && renderTooltip()}
        {offsetEnd && <span style={{ width: 36 }} />}
      </div>
      {isTablet && showTooltip && tooltip?.responsive && tooltip?.content && <div className={clsx(classes.tooltipContent, { [classes.tooltipContentPaddingLeft]: leftItem })}>{tooltip?.content}</div>}
    </>
  )
}

TextInput.defaultProps = {
  className: '',
  type: '',
  containerClassName: '',
  correct: false,
  processing: false,
  tooltip: null,
  leftItem: null,
  rightIcon: false,
  legend: '',
  offsetEnd: false,
  legendTooltip: null,
  error: false,
  helperText: '',
  endDotDotDot: false,
  disabledScroll: false,
  handleBlur: () => {},
  inputProps: {},
  checkRemoveCursor: false,
}

TextInput.propTypes = {
  classes: PropTypes.shape().isRequired,
  className: PropTypes.string,
  containerClassName: PropTypes.string,
  type: PropTypes.string,
  correct: PropTypes.bool,
  processing: PropTypes.bool,
  tooltip: PropTypes.oneOfType([
    PropTypes.shape(),
    PropTypes.object,
  ]),
  legend: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  leftItem: PropTypes.node,
  rightIcon: PropTypes.bool,
  offsetEnd: PropTypes.bool,
  legendTooltip: PropTypes.oneOfType([
    PropTypes.shape(),
    PropTypes.object,
  ]),
  error: PropTypes.bool,
  helperText: PropTypes.string,
  disabledScroll: PropTypes.bool,
  endDotDotDot: PropTypes.bool,
  handleBlur: PropTypes.func,
  inputProps: PropTypes.shape(),
  checkRemoveCursor: PropTypes.bool,
}

export default withStyles(style)(TextInput)
