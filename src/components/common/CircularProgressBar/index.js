import React, { useEffect, useState, useRef } from 'react'
import withStyles from '@mui/styles/withStyles'
import PropTypes from 'prop-types'
import { COLORS } from 'themes/common'

const styles = () => ({
  progressInput: {
    margin: '20px auto',
    width: '40%',
  },
  circleBackground: {
    fill: 'none',
    stroke: COLORS.palette.blueGradientEnd,
  },
  circleProgress: {
    fill: 'none',
    stroke: COLORS.palette.primaryBlue,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  },
  circleText: {
    fontSize: 32,
    fill: COLORS.gray.darkGray,
    textAlign: 'left',
  },
  text: {
    fontSize: '14px',
    fill: COLORS.gray.textGray2,
    textAlign: 'left',
  },
})

const CircularProgressBar = ({
  classes,
  size,
  percentage,
}) => {
  const [offset, setOffset] = useState(0)
  const circleRef = useRef(null)
  const numberRef = useRef(null)
  const strokeWidth = 20
  const radius = (size - strokeWidth) / 2
  const viewBox = `0 0 ${size} ${size}`
  const dashArray = radius * Math.PI * 2
  useEffect(() => {
    const progressOffset = dashArray - dashArray * (percentage / 100)
    setOffset(progressOffset)
    circleRef.current.style = 'transition: stroke-dashoffset 850ms ease-in-out;'
  }, [setOffset, dashArray, percentage, offset])

  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={`${strokeWidth}px`}
        className={classes.circleBackground}
      />
      <circle
        className={classes.circleProgress}
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={`${strokeWidth}px`}
        ref={circleRef}
          // Start progress marker at 12 O'Clock
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        strokeDasharray={dashArray}
        strokeDashoffset={offset}

      />
      <text
        className={classes.circleText}
        x="50%"
        y="45%"
        dy=".3em"
        textAnchor="middle"
        ref={numberRef}
      >
        {`${percentage}%`}
      </text>
      <text
        className={classes.text}
        x="50%"
        y="65%"
        textAnchor="middle"
      >
        New Users
      </text>
    </svg>
  )
}

CircularProgressBar.defaultProps = {
  size: 250,
  percentage: 58,
}

CircularProgressBar.propTypes = {
  classes: PropTypes.shape().isRequired,
  size: PropTypes.number,
  percentage: PropTypes.number,
}
export default withStyles(styles)(CircularProgressBar)
