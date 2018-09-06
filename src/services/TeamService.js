import Api from 'services/Api'
export default {
  getReferrer(params) {
    return Api().get('team/referrer')
  },
  getParent(params) {
    return Api().get('team/parent')
  },
  getChildren(params) {
    return Api().get('team/children')
  },
  search(keyword) {
    return Api().get('team/search', {
      params: {
        keyword: keyword
      }
    })
  },
  childInfo(childId) {
    return Api().get('team/teamOfChild', {
      params: {
        childId: childId
      }
    })
  }
}
