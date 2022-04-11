import Subs from 'assets/data/subjects.json'

export const WEEK_LIST = [{
  label: 'Thứ 2',
  value: 'mon',
}, {
  label: 'Thứ 3',
  value: 'tue',
}, {
  label: 'Thứ 4',
  value: 'wed',
}, {
  label: 'Thứ 5',
  value: 'thu',
}, {
  label: 'Thứ 6',
  value: 'fri',
}, {
  label: 'Thứ 7',
  value: 'sat',
}, {
  label: 'Chủ nhật',
  value: 'sun',
}]

export const WEEK_MAP = WEEK_LIST.reduce((acc, item) => {
  acc[item.value] = item
  return acc
}, {})
