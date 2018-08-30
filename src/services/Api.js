import axios from 'axios'
export default () => {
  const api = axios.create({
    baseURL: 'http://124.200.40.10:17080/agent/api/v1/'
  })
  api.interceptors.response.use(res => {
    return res.data
  })
  return api
}
