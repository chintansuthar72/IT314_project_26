import axios from 'axios'
import { getSession } from '../utilities/permissions'

const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_ZEEGUU_API_ENDPOINT_PROD
    : process.env.REACT_APP_ZEEGUU_API_ENDPOINT_DEV

export async function apiGet(endpoint) {
  const params = { session: getSession() }
  const res = await axios.get(BASE_URL + endpoint, { params })
  return res
}

export async function apiPost(endpoint, data, isForm) {
  const params = { session: getSession() }

  const headers = isForm
    ? { 'Content-Type': 'multipart/form-data' }
    : { 'Content-Type': 'appliation/json' }

  const res = await axios({
    method: 'post',
    url: BASE_URL + endpoint,
    params: params,
    headers: headers,
    data: data
  })

  return res
}
