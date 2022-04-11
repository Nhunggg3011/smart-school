/* eslint-disable no-return-await */
import { ZOOM_REDIRECT_URL } from 'common/Zoom'
import MStorage from 'utils/memoryStorage'
import { KEY_ZOOM_ACCESS_TOKEN } from 'constants/Zoom'
import { call } from './httpService'

const mapToken = (data) => ({
  token: MStorage.get(KEY_ZOOM_ACCESS_TOKEN),
  ...data,
})

export const connectZoom = (code) => call('/zoom/connect', {
  code,
  redirect_uri: ZOOM_REDIRECT_URL,
})

export const createMeeting = (data = {}) => call('/zoom/createMeeting', mapToken(data))
export const getZoomUserInfo = (data = {}) => call('/zoom/userinfo', mapToken(data))
export const refreshRoom = (uid) => call('/zoom/refresh', { uid })
