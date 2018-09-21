import Api from 'services/Api'
import { host } from 'services/Api'
import sha256 from 'js-sha256'
export default {
  //获取所有代理等级
  getGradeList() {
    return Api().get('grade/briefList')
  },
  //注册
  register(crendentials) {
    return Api().post('user/register', crendentials)
  },
  //注册：图片验证码
  registerCode: host + 'user/registerCode.jpg',
  //注册：短信验证码，需要先获得图片验证码
  sendCode(mobile, registerCode) {
    return Api().get('user/registerSMSCode', {
      params: {
        mobile: mobile,
        registerCode: registerCode
      }
    })
  },
  login({ mobile, password }) {
    return Api().get('user/login', {
      params: {
        mobile: mobile,
        password: sha256(password)
      }
    })
  },
  logout() {
    return Api().get('user/logout')
  },
  userinfo() {
    return Api().get('user/info')
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
  //修改手机，1.获取验证码
  changeMobileSMSCode(newMobile) {
    return Api().get('user/changeMobileSMSCode', {
      params: {
        newMobile: newMobile
      }
    })
  },
  //修改手机，2.修改手机号
  changeMobile(params) {
    return Api().get('user/changeMobile', {
      params: params
    })
  },
  // 更新用户信息
  updatePersonalInfo(form) {
    return Api().post('user/updatePersonal', form)
  },
  // 获取二维码
  getQrCode() {
    return Api().post('user/getQrCode')
  },
  //根据推荐码获取推荐人信息
  getReferrer(referralCode) {
    return Api().get('user/referrer', {
      params: {
        referralCode: referralCode
      }
    })
  },
  //提交实名认证申请
  applyUserCertification(params) {
    return Api().get('userCertification/apply', {
      params: params
    })
  },
  //查看实名认证申请
  viewUserCertification() {
    return Api().get('userCertification/info')
  },
  //授权书
  getAuthorization() {
    return Api().get('user/getAuthorization')
  }
}
