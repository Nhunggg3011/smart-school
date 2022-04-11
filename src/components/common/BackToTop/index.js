import React, { useState, useEffect } from 'react'
import { IconButton } from '@mui/material'
import withStyles from '@mui/styles/withStyles'
import PropTypes from 'prop-types'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import clsx from 'clsx'
import { useLocation } from 'react-router-dom'
import { COLORS, VIEWPORT_HEIGHT } from 'themes/common'

const style = (theme) => ({
  root: {
    display: 'none',
    [theme.breakpoints.down('md')]: {
      display: 'block',
    },
    'body.mobile-tablet-device &': {
      display: 'block',
    },
    'body[style*="overflow: hidden"] &, body[style*="overflow:hidden"] &': {
      display: 'none',
    },
    width: '60px',
    height: '60px',
    zIndex: 100,
    position: 'fixed',
    bottom: theme.spacing(4),
    right: theme.spacing(4),
    backgroundColor: `${COLORS.gray.textGray2}`,
    color: 'white',
    '& .MuiSvgIcon-root': {
      height: '1.5em',
      width: '1.5em',
    },
    '&:hover, & .Mui-focusVisible': {
      transition: '0.3s',
      color: 'white',
      backgroundColor: `${COLORS.gray.textGray2}`,
    },
  },
})

const BackToTopButton = ({
  classes,
  className,
  variant,
  showBelow,
  ...props
}) => {
  const [isShow, setIsShow] = useState(false)
  const [tracker, setTracker] = useState(null)
  const { pathname } = useLocation()

  const goTop = () => {
    tracker?.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleScroll = () => {
    const contentWrapEl = document.getElementById('content')
    const contentUnderStickyEl = document.getElementById('content-under-sticky')

    const trackerEl = (window.innerHeight > VIEWPORT_HEIGHT.md && !!contentUnderStickyEl) ? contentUnderStickyEl : contentWrapEl

    if (!trackerEl) return

    const { scrollTop, scrollHeight, offsetHeight } = trackerEl
    const isEligible = scrollTop > showBelow || scrollTop === scrollHeight - offsetHeight

    setTracker(trackerEl)

    if (!isShow && isEligible) {
      setIsShow(true)
    }

    if (isShow && !isEligible) {
      setIsShow(false)
    }
  }

  useEffect(() => {
    document.getElementById('content').addEventListener('scroll', handleScroll, true)
    return () => {
      document.getElementById('content')?.removeEventListener('scroll', handleScroll, true)
    }
  }, [isShow])

  useEffect(() => {
    if (tracker) {
      goTop()
    }
  }, [pathname, tracker])

  return (isShow) && (
    <IconButton
      className={clsx(classes.root, className)}
      variant={variant}
      {...props}
      onClick={goTop}
      size="large"
    >
      <ArrowUpwardIcon />
    </IconButton>
  )
}

BackToTopButton.defaultProps = {
  variant: 'contained',
  customclasses: {},
  className: '',
  showBelow: 0,
}

BackToTopButton.propTypes = {
  classes: PropTypes.shape().isRequired,
  customclasses: PropTypes.shape(),
  className: PropTypes.oneOfType([
    PropTypes.shape(),
    PropTypes.any,
  ]),
  variant: PropTypes.string,
  showBelow: PropTypes.number,
}

export default withStyles(style)(BackToTopButton)
