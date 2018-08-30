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
  },
  //忘记密码，获取短信验证码
  sendRecoverSMSCode(mobile) {
    return Api().get('user/recoverSMSCode', {
      params: {
        mobile: mobile
      }
    })
  },
  //忘记密码，修改密码
  recoverPsw(params) {
    return Api().get('user/recover', {
      params: params
    })
  },
  // 更新用户信息
  updatePersonalInfo(form) {
    return Api().post('user/updatePersonal', form)
  }
}
