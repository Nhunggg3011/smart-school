/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-return-await */
import { create } from 'apisauce'
import { envValues } from 'utils/env'
import fbAuth from 'services/fbService'

const SS_API = envValues('https://api.tkbonline.net', 'https://apidev.tkbonline.net', 'http://localhost:3011')
const Client = create({ baseURL: SS_API, timeout: 30 * 1000 })

Client.addAsyncRequestTransform((request) => async () => {
  const token = await fbAuth.getToken()
  request.headers['Content-Type'] = 'application/json'
  request.headers.Authorization = `Bearer ${token}`
})

export function getResponse(res) {
  if (res.ok) {
    return res.data
  }
  if (res.data && res.data.message) {
    return Promise.reject({ message: res.data.message, status: res.status })
  }
  return Promise.reject({
    message: res.originalError.message,
    status: res.status,
  })
}

export const call = async (path, data = {}) => {
  const res = await Client.post(path, data)
  return getResponse(res)
}
export default Client
