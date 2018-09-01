import Api from 'services/Api'

export default {
  get() {
    return Api().get('userCredit/getInfo')
  },
  getList(logType, months) {
    if (logType === 'all') {
      logType = null
    }
    return Api().get('creditLog/list', {
      params: {
        logType: logType,
        months: months
      }
    })
  },
  getInfo(logType, months) {
    if (logType === 'all') {
      logType = null
    }
    return Api().get('creditLog/info', {
      params: {
        logType: logType,
        months: months
      }
    })
  },
  getGoodsDetail(goodsId) {
    return Api().get('goods/details', {
      params: { goodsId: goodsId }
    })
  }
}
