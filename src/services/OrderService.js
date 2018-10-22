import Api from 'services/Api'
export default {
  //列取订单
  get(params) {
    return Api().get('order/list', { params: params })
  },
  detail(orderId) {
    return Api().get('order/detail', {
      params: { orderId: orderId }
    })
  },
  confirm(orderId) {
    return Api().get('order/confirmOrder', {
      params: { orderId: orderId }
    })
  },
  logistics(orderId) {
    return Api().get('order/detail', {
      params: { orderId: orderId }
    })
  }
}
