import axios from 'axios'
import router from '../router'
// const host = 'http://dl.upyuns.com/agent/api/v1/'
//开发地址
const host = 'http://124.200.40.10:17080/agent/api/v1/'
//上线地址
// const host = 'http://sdl.cwzbz.com/agent/api/v1/'
export default () => {
  const api = axios.create({
    baseURL: host
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
//图片上传地址
const uploadUrl = `${host}pic/upload`
export { host, uploadUrl }
