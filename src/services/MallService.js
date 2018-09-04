import Api from 'services/Api'

export default {
  getCategory() {
    return Api().get('category/list')
  },
  getGoodsList(categoryId, page = 1) {
    const limit = 8
    console.log(page, Number(page - 1) * limit)
    if (categoryId) {
      return Api().get('goods/list', {
        params: { categoryId: categoryId, offset: (page - 1) * limit, limit }
      })
    } else {
      return Api().get('goods/list', {
        params: { categoryId: categoryId, offset: (page - 1) * limit, limit }
      })
    }
  },
  getGoodsDetail(goodsId) {
    return Api().get('goods/details', {
      params: { goodsId: goodsId }
    })
  }
}
