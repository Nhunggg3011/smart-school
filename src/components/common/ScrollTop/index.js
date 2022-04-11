import React from 'react'
import PropTypes from 'prop-types'
import makeStyles from '@mui/styles/makeStyles'
import useScrollTrigger from '@mui/material/useScrollTrigger'
import Zoom from '@mui/material/Zoom'
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}))

export default function ScrollTop({ children, className, ...otherProps }) {
  const classes = useStyles()
  const trigger = useScrollTrigger({
    ...otherProps,
  })

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor')

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={clsx(classes.root, className)}>
        {children}
      </div>
    </Zoom>
  )
}

ScrollTop.defaultProps = {
  className: '',
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  className: PropTypes.string,
}
