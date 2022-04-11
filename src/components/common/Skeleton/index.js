import React from 'react'
import PropTypes from 'prop-types'

import OriginalSkeleton from '@mui/material/Skeleton'

const getRandom = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

const Skeleton = ({
  randomVisibility, // number, rate of appearance, 1 -> 50%, 2 -> 33.3%, 3 -> 25%
  randomWidth, // [min, max]
  randomHeight,

  randomWidthPercent,
  randomHeightPercent,

  style,
  ...props
}) => (
  <OriginalSkeleton
    {...(randomWidth && {
      width: getRandom(...randomWidth),
    })}
    {...(randomHeight && {
      width: getRandom(...randomHeight),
    })}
    style={{
      ...style,
      ...(randomVisibility && !getRandom(0, randomVisibility) && {
        display: 'none',
      }),
      ...(randomWidthPercent && {
        width: `${getRandom(...randomWidthPercent)}%`,
      }),
      ...(randomHeightPercent && {
        height: `${getRandom(...randomHeightPercent)}%`,
      }),
    }}
    {...props}
  />
)

Skeleton.defaultProps = {
  randomVisibility: null,
  randomWidth: null,
  randomHeight: null,
  randomWidthPercent: null,
  randomHeightPercent: null,
  style: {},
}

Skeleton.propTypes = {
  randomVisibility: PropTypes.number,
  randomWidth: PropTypes.arrayOf(PropTypes.number),
  randomHeight: PropTypes.arrayOf(PropTypes.number),
  randomWidthPercent: PropTypes.arrayOf(PropTypes.number),
  randomHeightPercent: PropTypes.arrayOf(PropTypes.number),
  style: PropTypes.shape(),
}

export default Skeleton
