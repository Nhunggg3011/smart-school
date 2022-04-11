import React, { useState, useEffect } from 'react'
import { hexToRgb } from '@mui/material/styles'
import makeStyles from '@mui/styles/makeStyles'
import withStyles from '@mui/styles/withStyles'
import PropTypes from 'prop-types'
import LinearProgress from '@mui/material/LinearProgress'
import { COLORS } from 'themes/common'

const styles = () => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
  },
  title: {
    color: COLORS.gray.textGray2,
    fontSize: 12,
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  label: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    marginRight: 24,
  },
  value: {

  },
})

const useStyles = ({ opacity }) => makeStyles({
  root: {
    height: 10,
    borderRadius: '0 10px 10px 0',
  },
  colorPrimary: {
    backgroundColor: `rgba(${hexToRgb(COLORS.palette.primaryBlue).replace('rgb(', '').replace(')', '')}, 0.1)`,
  },
  bar: {
    borderRadius: '0 10px 10px 0',
    backgroundColor: COLORS.palette.primaryBlue,
    opacity,
  },
})

const LinearProgressBar = ({
  label, values, percentage, classes, color, opacity, ...props
}) => {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= percentage ? percentage : prevProgress + 10))
    }, 200)
    return () => {
      clearInterval(timer)
    }
  }, [])

  const linearStyle = useStyles({ opacity })()
  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <span className={classes.label}>{label}</span>
        <span>{values}</span>
      </div>
      <LinearProgress
        classes={{
          root: linearStyle.root,
          colorPrimary: linearStyle.colorPrimary,
          bar: linearStyle.bar,
        }} variant="determinate" value={progress}
        {...props}
      />
    </div>
  )
}

LinearProgressBar.defaultProps = {
  label: '',
  values: 10,
  percentage: 10,
  color: COLORS.palette.primaryBlue,
  opacity: 0,
}

LinearProgressBar.propTypes = {
  classes: PropTypes.shape().isRequired,
  values: PropTypes.string,
  label: PropTypes.string,
  percentage: PropTypes.number,
  color: PropTypes.string,
  opacity: PropTypes.number,
}

export default withStyles(styles)(LinearProgressBar)
