import React from 'react'
import PropTypes from 'prop-types'
import { MenuItem, Typography } from '@mui/material'
import withStyles from '@mui/styles/withStyles'
import clsx from 'clsx'
import { COLORS } from 'themes/common'
import { STORE_SHORT_TYPE_NAMES, STORE_BADGE_COLOR } from 'constants/store'
import Select from './index'

const style = (theme) => ({
  root: {
    '& .MuiSelect-root': {
      justifyContent: 'flex-start',
    },
  },
  item: {
    // justifyContent: 'space-between',
    borderRadius: 3,
    alignItems: 'center',
    fontSize: 14,
  },
  title: {
    borderTop: `1px solid ${COLORS.gray.disableGray1}`,
    paddingTop: theme.spacing(1),
    paddingBottom: 1,
    marginTop: 5,
    pointerEvents: 'none',
    '&.no0': {
      border: 'none',
      paddingTop: 1,
    },
    '&:focus': {
      outline: 'none',
    },
  },
  subLabel: {
    color: COLORS.gray.textGray2,
  },
  label: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  badge: {
    color: 'white',
    padding: '2px 4px',
    borderRadius: 3,
    fontSize: 12,
    lineHeight: '14px',
    marginLeft: 6,
  },
})

const StoreSelect = ({ classes, className, ...props }) => {
  const renderStoreOption = (item, index) => (
    item.title
      ? <Typography key={item.value} variant="subtitle2" className={clsx(classes.title, `no${index}`)}>{item.label}</Typography>
      : (
        <MenuItem key={item.value} value={item.value} className={classes.item}>
          <div className={classes.label}>{item.label}</div>
          { STORE_SHORT_TYPE_NAMES[item.storeType] && (
            <div
              className={clsx(classes.badge)}
              style={{ backgroundColor: STORE_BADGE_COLOR[item.storeType] }}
            >
              {STORE_SHORT_TYPE_NAMES[item.storeType]}
            </div>
          ) }
        </MenuItem>
      )
  )
  return (<Select {...props} className={clsx(classes.root, className)} renderOption={renderStoreOption} />)
}

StoreSelect.defaultProps = {
  className: '',
}

StoreSelect.propTypes = {
  classes: PropTypes.shape().isRequired,
  className: PropTypes.string,
}

export default withStyles(style)(StoreSelect)
