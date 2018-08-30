import Api from 'services/Api'

export default {
  //加入购物车
  add(product) {
    return Api().post('cart/add', product)
  },
  //获取购物车
  get() {
    return Api().get('cart/getCart')
  },
  //修改购物车商品数量
  update(product) {
    return Api().post('cart/update', product)
  },
  //删除购物车记录
  //params cartIds -> Array
  // cartIds   修改记录id，多个id以逗号分隔
  delete(cartIds) {
    return Api().post('cart/delete', { cartIds: cartIds.join(',') })
  }
}
