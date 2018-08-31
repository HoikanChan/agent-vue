import axios from 'axios'
import router from '../router'
export default () => {
  const api = axios.create({
    baseURL: 'http://124.200.40.10:17080/agent/api/v1/'
  })
  api.interceptors.response.use(res => {
    return res.data
  })
  api.interceptors.response.use(res => {
    if(res.errno && res.errmsg === '请先登录'){
      router.push({name:'login'})
    }
    return res
  })
  return api
}
