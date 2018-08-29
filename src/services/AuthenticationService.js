import Api from 'services/Api'

export default {
  register(crendentials) {
    return Api().post('register', crendentials)
  },
  login(crendentials) {
    return Api().post('login', crendentials)
  }
}
