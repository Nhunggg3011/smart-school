import React from 'react'
import Chip from '@mui/material/Chip'
import withStyles from '@mui/styles/withStyles'
import PropTypes from 'prop-types'
import { tags } from './tags'

const tagStyle = () => ({
  root: {
    fontSize: 14,
  },
})

const Tag = ({
  classes,
  size,
  variant,
  tag,
  fixedWidth,
  style,
  label,
  ...props
}) => (
  <Chip
    classes={classes}
    style={{
      color: tags[tag]?.color,
      backgroundColor: tags[tag]?.bgColor,
      minWidth: fixedWidth && 105,
      ...style,
    }}
    label={label || tags[tag]?.label || ''}
    variant={variant}
    size={size}
    deleteIcon={(
      <img
        src="/icons/close.svg"
        style={{
          width: 10,
          paddingLeft: 3,
          paddingRight: 3,
        }}
        alt="close"
      />
    )}
    {...props}
  />
)

Tag.defaultProps = {
  size: 'medium',
  variant: 'default',
  tag: '',
  label: '',
  fixedWidth: false,
  style: {},
}

Tag.propTypes = {
  classes: PropTypes.shape().isRequired,
  size: PropTypes.string,
  variant: PropTypes.string,
  tag: PropTypes.string,
  label: PropTypes.string,
  fixedWidth: PropTypes.bool,
  style: PropTypes.shape(),
}

export default withStyles(tagStyle)(Tag)
