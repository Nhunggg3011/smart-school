import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Tooltip } from '@mui/material'

import withStyles from '@mui/styles/withStyles'

const style = {
  divEl: {
    width: 'auto',
    display: 'inline-block',
    visibility: 'hidden',
    position: 'fixed',
    overflow: 'auto',
  },
}
const TooltipWrapper = ({
  classes, value, children, offset,
}) => {
  const [title, setTitle] = useState('')
  useEffect(() => {
    const divEl = document.getElementById('divEl')
    const wrapperEl = document.getElementById('wrapper')
    divEl.innerText = value

    if (divEl.clientWidth > wrapperEl.clientWidth - offset) {
      setTitle(value)
    } else {
      setTitle('')
    }
  }, [value])

  return (
    <>
      <Tooltip title={title} arrow>
        <div id="wrapper">
          {children}
        </div>
      </Tooltip>
      <div id="divEl" className={classes.divEl} />
    </>
  )
}

TooltipWrapper.defaultProps = {
  offset: 0,
  value: '',
}

TooltipWrapper.propTypes = {
  classes: PropTypes.shape().isRequired,
  children: PropTypes.node.isRequired,
  value: PropTypes.string,
  offset: PropTypes.number,
}

export default withStyles(style)(TooltipWrapper)
