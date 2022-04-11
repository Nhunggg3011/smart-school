/* eslint-disable no-return-await */
import { call } from './httpService'

export const importUser = async (data = [], type) => await call('/users/import-user', {
  data,
  type,
})

export const importTimeTable = async (data = []) => await call('/users/import-timetable', {
  data,
})

export const createUser = async (data) => await call('/users/create-user', data)
