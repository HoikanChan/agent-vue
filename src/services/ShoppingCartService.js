import Api from 'services/Api'
import sha256 from 'js-sha256'

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
    console.log(product)
    return Api().post('cart/update', product)
  },
  //删除购物车记录
  //params cartIds -> Array
  // cartIds   修改记录id，多个id以逗号分隔
  delete(cartIds) {
    return Api().post('cart/delete', { cartIds: cartIds.join(',') })
  },
  //选中购物车记录
  check(cartIds, isChecked) {
    return Api().post('cart/checked', {
      cartIds: Array.isArray(cartIds) ? cartIds.join(',') : cartIds,
      isChecked: isChecked ? 1 : 0
    })
  },
  //生成临时订单
  //   post请求参数

  // cartIds   修改记录id，多个id以逗号分隔（可选）
  // addressId 收货地址id（可选）
  checkout() {
    return Api().post('cart/checkout', {})
  },
  pay({ addressId, psw, postscript }) {
    return Api().post('order/submit', {
      addressId: addressId,
      passwd: sha256(psw),
      postscript: postscript
    })
  }
}
