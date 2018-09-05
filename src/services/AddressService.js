import Api from 'services/Api'

export default {
  get() {
    return Api().get('address/list')
  },
  delete(id) {
    return Api().get('address/delete', {
      params: {
        id: id
      }
    })
  },
  update(content) {
    return Api().post('address/save', content)
  }
}
