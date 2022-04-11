import React, { useState } from 'react'
import PropTypes from 'prop-types'

const ImageProcess = ({
  classes, src, className, placeholder, ...props
}) => {
  const [loaded, setLoaded] = useState(true)
  return loaded && src ? (
    <img
      className={className}
      src={src}
      alt=""
      onError={() => setLoaded(false)}
      {...props}
    />
  ) : <img {...props} className={className} src={placeholder} alt="no_image" />
}

ImageProcess.defaultProps = {
  src: '',
  className: '',
  placeholder: '/icons/no_image.svg',
}

ImageProcess.propTypes = {
  classes: PropTypes.shape().isRequired,
  className: PropTypes.string,
  src: PropTypes.string,
  placeholder: PropTypes.string,
}

export default ImageProcess
