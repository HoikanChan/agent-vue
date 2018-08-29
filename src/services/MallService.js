import Api from 'services/Api'

export default {
  getCategory() {
    return Api().get('category/list')
  },
  getGoodsList(categoryId) {
    if (categoryId) {
      return Api().get('goods/list', { params: { categoryId: categoryId } })
    } else {
      return Api().get('goods/list')
    }
  },
  getGoodsDetail(goodsId) {
    return Api().get('goods/details', {
      params: { goodsId: goodsId }
    })
  }
}
