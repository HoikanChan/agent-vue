import Api from 'services/Api'
import sha256 from 'js-sha256'
export default {
  sendCode(mobile) {
    return Api().get('user/registerSMSCode', {
      params: {
        mobile: mobile
      }
    })
  },
  //获取所有代理等级
  getGradeList() {
    return Api().get('grade/briefList')
  },
  register(crendentials) {
    return Api().post('user/register', crendentials)
  },
  login({ mobile, password }) {
    return Api().get('user/login', {
      params: {
        mobile: mobile,
        password: sha256(password)
      }
    })
  }
}
