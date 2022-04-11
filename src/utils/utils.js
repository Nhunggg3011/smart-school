import { WEEK_LIST } from 'constants/Week'
import moment from 'moment'

/* eslint-disable no-underscore-dangle */
export function getRandomIntInclusive(min, max) {
  const _min = Math.ceil(min)
  const _max = Math.floor(max)
  return Math.floor(Math.random() * (_max - _min + 1) + _min) // The maximum is inclusive and the minimum is inclusive
}

export function getCurrentWeekDay() {
  return WEEK_LIST[moment().isoWeekday() - 1].value
}

export function getCurrentWeekName() {
  return WEEK_LIST[moment().isoWeekday() - 1].label
}
