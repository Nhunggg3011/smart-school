import React from 'react'
import PropTypes from 'prop-types'
import CircularProgress from '@mui/material/CircularProgress'

const Loading = ({ loading }) => loading ? (
  <div className="loading-global">
    <CircularProgress size={30} />
  </div>
) : ''

Loading.propTypes = {
  loading: PropTypes.bool,
}

export default Loading
