import axios from 'axios'
import router from '../router'
export default () => {
  const api = axios.create({
    //测试地址
    // baseURL: 'http://dl.upyuns.com/agent/api/v1/'
    //正式地址
    baseURL: 'http://dl.upyuns.com/agent/api/v1/'
  })
  api.interceptors.response.use(res => {
    return res.data
  })
  api.interceptors.response.use(res => {
    if (res.errno && res.errmsg.includes('登录')) {
      router.push({ name: 'login' })
    }
    return res
  })
  return api
}
