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
  getGoodsDetail(goodsId) {
    return Api().get('goods/details', {
      params: { goodsId: goodsId }
    })
  }
}
