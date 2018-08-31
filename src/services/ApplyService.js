import Api from 'services/Api'

export default {
  getUpgradeList() {
    return Api().get('applyOrder/upgradeList')
  },
  upgrade(levelId) {
    return Api().get('applyOrder/upgradeSubmit', {
      params: { levelId: levelId }
    })
  },
  //列取我的审核订单
  auditList(levelId) {
    return Api().get('applyOrder/listMyAudit', {
      params: { levelId: levelId }
    })
  },
  //列取我的审核订单
  applyList(params) {
    return Api().get('applyOrder/listMyApply', {
      params: params
    })
  },
  //审核订单
  audit(params) {
    return Api().get('applyOrder/auditApply', {
      params: params
    })
  },
  //充值申请上级信息
  chargeInfo(content) {
    return Api().get('applyOrder/rechargeCheckOut', content)
  },
  //提交充值申请
  chargePoint(content) {
    return Api().post('applyOrder/rechargeSubmit', content)
  }
}
