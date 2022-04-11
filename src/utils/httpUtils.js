/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */

export const addHeader = (...headers) => async (cfg) => {
  try {
    const customHeaders = await Promise.all(headers.map((h) => h(cfg)))
    cfg.headers = customHeaders.reduce((headers, header) => ({
      ...headers,
      ...header,
    }), cfg.headers)

    return cfg
  } catch (e) {
    return cfg
  }
}
