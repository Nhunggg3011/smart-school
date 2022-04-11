import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import moment from 'moment'

const CountDown = ({ label, goal, className }) => {
  const genTime = () => {
    const checkedInTime = moment(goal || '00:00', 'HH:mm')
    const duration = moment.duration(checkedInTime.diff(moment()))
    const minutes = duration.asMinutes()
    const hours = duration.asHours()
    const s = duration.asSeconds()
    if (s > 0) {
      return `${hours >= 1 ? numeral(Math.floor(hours)).format('00') : ''}:${numeral(minutes - Math.floor(hours) * 60).format('00')}:${numeral(Math.floor(s - Math.floor(minutes) * 60)).format('00')}`
    }
    return ''
  }

  const [time, setTime] = useState(genTime())

  useEffect(() => {
    setTimeout(() => {
      setTime(genTime())
    }, 1000)
  }, [time])

  return (<span className={className}>{time ? `${label || ''}${time}` : ''}</span>)
}

CountDown.propTypes = {
  goal: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
}

export default CountDown
