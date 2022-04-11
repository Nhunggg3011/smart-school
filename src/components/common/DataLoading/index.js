import React from 'react'
import PropTypes from 'prop-types'
import { CircularProgress } from '@mui/material'
import withStyles from '@mui/styles/withStyles'
import clsx from 'clsx'

const style = () => ({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    maxHeight: 600,
  },
})

const DataLoading = ({ loading, classes, className: customClassName }) => (
  loading && (
    <div className={clsx(classes.container, customClassName)}>
      <CircularProgress />
    </div>
  )
)

DataLoading.defaultProps = {
  loading: false,
  className: '',
}

DataLoading.propTypes = {
  loading: PropTypes.bool,
  classes: PropTypes.shape().isRequired,
  className: PropTypes.string,
}

export default withStyles(style)(DataLoading)
