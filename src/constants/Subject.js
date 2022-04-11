import Subs from 'assets/data/subjects.json'

export const SUBJECT_LIST = Subs

export const SUBJECT_MAP = Subs.reduce((acc, item) => {
  acc[item.value] = item
  return acc
}, {})
