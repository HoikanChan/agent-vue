import Api from 'services/Api'

export default {
  getAddress() {
    return Api().get('address/list')
  }
}
