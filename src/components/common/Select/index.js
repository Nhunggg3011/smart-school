import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  FormControl,
  FormHelperText,
  FormLabel,
  MenuItem,
  Select as MSelect,
  Typography,
  InputLabel,
} from '@mui/material'
import withStyles from '@mui/styles/withStyles'
import { KeyboardArrowDown } from '@mui/icons-material'
import IconButton from '@mui/material/IconButton'
import clsx from 'clsx'
import { COLORS } from 'themes/common'
import Icon from 'components/common/Icon'
import Tooltip from 'components/common/Tooltip'
import Checkbox from '../Checkbox'
import style from './style'
import Button from '../Button'

const Select = ({
  classes, value, options, className, leftItemClassName,
  legend, label, onChange: onDataChange, leftItem, rightItem, helperText,
  placeholder, onClear, displayValue, iconComponent, transparent,
  notActiveOutlineBlur, renderOption, MenuProps, multiple, clearable,
  actionOnFocus, actionOnBlur, onBlur, legendTooltip, groupByKey,
  ...props
}) => {
  const [open, setOpen] = useState(false)

  const renderDefOption = (item, index) => (
    multiple ? (
      <MenuItem key={item.value} value={item.value} disabled={item.disabled} className={classes.optionItem}>
        <Checkbox className={classes.checkbox} checked={(value || []).includes(item.value)} onClick={(e) => e.preventDefault()} />
        <span className={classes.optionLabel}>{item?.label || ''}</span>
      </MenuItem>
    ) : (item.title
      ? <Typography key={item.value} variant="subtitle2" className={clsx(classes.title, `no${index}`)}>{item.label}</Typography>
      : (
        <MenuItem key={item.value} value={item.value} disabled={item.disabled} className={classes.item}>
          <div className={classes.label}>{item.label}</div>
          {
              item.subLabel && <div className={classes.subLabel}>{item.subLabel}</div>
            }
        </MenuItem>
      )
    )
  )
  const groupBy = (listOptions, key) => {
    let listGroupBy = []
    if (listOptions && listOptions.length > 0) {
      listGroupBy = Array.from(new Set(listOptions.map((item) => item[key])))
    }
    return listGroupBy
  }

  const renderGroupOption = (itemGroupBy, index, listOptions, key) => {
    const items = listOptions.filter((x) => x[key] === itemGroupBy).map((item) => (
      item.title
        ? (
          <MenuItem key={item.value} value={item.value} disabled={item.disabled} className={classes.item}>
            <div className={classes.label}>{item.label}</div>
          </MenuItem>
        )
        : (
          <MenuItem key={item.value} value={item.value} disabled={item.disabled} className={classes.item}>
            <div className={classes.label}>{item.label}</div>
            {
              item.subLabel && <div className={classes.subLabel}>{item.subLabel}</div>
            }
          </MenuItem>
        )
    ))
    return [itemGroupBy && <Typography key={itemGroupBy} variant="subtitle2" className={clsx(classes.title, `no${0}`)}>{itemGroupBy || ''}</Typography>, items]
  }

  const onOpen = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
    actionOnBlur()
  }

  const onFocus = () => {
    actionOnFocus()
  }

  const onChange = (e) => {
    if (e && e.target) {
      if (multiple && e.target.value && e.target.value.length && e.target.value.includes('button_action')) {
        setOpen(false)
      }
      onDataChange(e.target.value, e)
    }
  }

  const xProps = () => {
    if (multiple) {
      const openProps = {
        open,
        onOpen,
        onClose,
        onFocus,
      }

      if (placeholder && (!value || !value.length)) {
        return {
          renderValue: () => <div className={classes.placeholder}>{placeholder}</div>,
          displayEmpty: true,
          ...openProps,

        }
      }
      return {
        renderValue: (items) => {
          const list = options.filter((x) => (items || []).includes(x.value)).map((x) => x.shortLabel || x.label || '') || []
          return (
            <>
              <span className={classes.optionLabel}>{list[0] || ''}</span>
              {list.length > 1 && (
                <span className={classes.addLabel}>{`+${list.length - 1}`}</span>
              )}
            </>
          )
        },
        ...openProps,
      }
    }
    if (placeholder && !value) {
      return {
        renderValue: () => <div className={classes.placeholder}>{placeholder}</div>,
        displayEmpty: true,
      }
    }
    if (value && displayValue) {
      return {
        renderValue: () => value,
      }
    }
    return {}
  }

  return (
    <FormControl
      className={clsx(classes.container, className)}
      {...props}
      {...(label ? { variant: 'outlined' } : {})}
    >
      {leftItem && <div className={clsx(classes.leftItem, leftItemClassName, { [classes.leftItemWithTopSpace]: legend })}>{leftItem}</div>}

      <div className={classes.main}>
        {legend && (
        <>
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
        </>
        )}

        {label && (
          <InputLabel>{label}</InputLabel>
        )}
        <MSelect
          {...props}
          MenuProps={MenuProps}
          {...(label ? { label } : {})}
          className={clsx(classes.input, { multiple, [classes.transparent]: transparent })}
          classes={{
            root: classes.root,
            iconOutlined: classes.icon,
            notActiveOutlineBlur: notActiveOutlineBlur ? classes.notActiveOutlineBlur : '',
          }}
          multiple={multiple}
          value={multiple ? (value || []) : (value || '')}
          IconComponent={
            iconComponent
            || (clearable && onClear
              && (
                (!multiple && !!value && value !== placeholder)
                || (multiple && !!value && value.length > 0)
              )
              ? () => (
                <IconButton
                  style={{
                    position: 'absolute', right: 0, padding: 10,
                  }}
                  size="small" onClick={(e) => {
                    e.stopPropagation()
                    onClear()
                  }}
                >
                  <Icon
                    name="close"
                    color={COLORS.palette.primaryBlue}
                    size={10}
                  />
                </IconButton>
              )
              : KeyboardArrowDown)
          }
          variant="outlined"
          onChange={(e) => onChange(e)}
          {...xProps()}
        >
          {
            options && options.length > 0
              ? groupByKey ? groupBy(options, groupByKey).map((item, index) => renderGroupOption(item, index, options, groupByKey))
                : options.map(renderOption || renderDefOption) : [{ value: 'no_option', label: 'No Options', disabled: true }].map(renderOption || renderDefOption)
          }
          {
            !!multiple && (
            <div className={classes.buttonContainer} value="button_action">
              <Button
                onClick={() => onDataChange([], 'apply')}
                onMouseDown={(e) => {
                  e.preventDefault()
                }}
              >
                Apply

              </Button>
              <Button
                onClick={() => actionOnBlur()}
                color="secondary"
                onMouseDown={(e) => {
                  e.preventDefault()
                }}
              >
                Cancel
              </Button>
            </div>
            )
          }
        </MSelect>
        {helperText && <FormHelperText className={classes.error}>{helperText}</FormHelperText>}
      </div>
      {rightItem && <div className={classes.rightItem}>{rightItem}</div>}
    </FormControl>
  )
}

Select.defaultProps = {
  className: '',
  leftItemClassName: '',
  value: '',
  options: [{ value: 'no_option', label: 'No Options' }],
  legend: '',
  label: '',
  onChange: () => {},
  leftItem: null,
  rightItem: null,
  helperText: '',
  placeholder: '',
  iconComponent: null,
  onClear: null,
  displayValue: false,
  transparent: false,
  notActiveOutlineBlur: true,
  renderOption: null,
  multiple: false,
  actionOnFocus: () => {},
  actionOnBlur: () => {},
  MenuProps: {},
  onBlur: () => {},
  clearable: false,
  legendTooltip: null,
  groupByKey: '',
}

Select.propTypes = {
  classes: PropTypes.shape().isRequired,
  className: PropTypes.string,
  leftItemClassName: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  options: PropTypes.arrayOf(PropTypes.shape()),
  legend: PropTypes.node,
  label: PropTypes.node,
  onChange: PropTypes.func,
  leftItem: PropTypes.node,
  rightItem: PropTypes.node,
  helperText: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  placeholder: PropTypes.string,
  iconComponent: PropTypes.elementType,
  onClear: PropTypes.func, // TODO: blur after select that onClear can be clicked right after select
  displayValue: PropTypes.bool,
  transparent: PropTypes.bool,
  notActiveOutlineBlur: PropTypes.bool,
  clearable: PropTypes.bool,
  renderOption: PropTypes.func,
  MenuProps: PropTypes.shape(),
  onBlur: PropTypes.func,
  multiple: PropTypes.bool,
  actionOnFocus: PropTypes.func,
  actionOnBlur: PropTypes.func,
  legendTooltip: PropTypes.oneOfType([
    PropTypes.shape(),
    PropTypes.object,
  ]),
  groupByKey: PropTypes.string,
}

export default withStyles(style)(Select)
