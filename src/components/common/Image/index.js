import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@mui/styles/withStyles'
import useImageError from 'utils/hooks/useImageError'
import style from './style'

const Image = (props) => {
  const {
    className,
    file,
  } = props
  const [setImg, hasError] = useImageError()

  if (hasError) {
    return (
      <img
        className={className}
        alt="no_image"
        src="/icons/no_image.svg"
      />
    )
  }

  return (
    <img
      ref={setImg}
      className={className}
      alt={`img-${file.name}`}
      src={file.src}
    />
  )
}

Image.propTypes = {
  className: PropTypes.shape().isRequired,
  file: PropTypes.oneOfType([PropTypes.object, PropTypes.shape]).isRequired,
}

export default withStyles(style)(Image)
