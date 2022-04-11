import React from 'react'
import Rating from '@mui/material/Rating'
import withStyles from '@mui/styles/withStyles'
import PropTypes from 'prop-types'
import { COLORS } from 'themes/common'
import Icon from 'components/common/Icon'

const style = () => ({
  container: {
    display: 'inline-flex',
  },
})

const StyledRating = withStyles({
  decimal: {
    margin: '0 1px',
  },
  icon: {
    '&>div': {
      maskSize: 'auto !important',
      WebkitMaskSize: 'auto !important',
      maskPosition: 'center left !important',
      WebkitMaskPosition: 'center left !important',
    },
  },
})(Rating)

const Star = ({
  classes, name, value, type, disabled, ...props
}) => (
  <div className={classes.container}>
    <StyledRating
      className={classes.star}
      name={name}
      value={value}
      disabled={disabled}
      precision={0.5}
      emptyIcon={<Icon name="star" color={COLORS.gray.disableGray1} size="small" />}
      icon={<Icon name="star" color={COLORS.accent.mustardYellow1} size="small" />}
      {...props}
    />
  </div>
)

Star.defaultProps = {
  value: 0,
  type: '',
  disabled: false,
  name: '',
}

Star.propTypes = {
  classes: PropTypes.shape().isRequired,
  value: PropTypes.number,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  name: PropTypes.string,
}

export default withStyles(style)(Star)
