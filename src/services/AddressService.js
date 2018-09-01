import Api from 'services/Api'

export default {
  get() {
    return Api().get('address/list')
  },
  update(content) {
    return Api().post('address/save', content)
  }
}
