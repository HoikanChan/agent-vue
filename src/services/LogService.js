import Api from 'services/Api'

export default {
  // isRead 是否已读（不传，默认查全部）
  //  0：未读
  //  1：已读
  // opType 日志类型（不传，默认查全部）
  //  0001：积分充值
  //  0002：会员升级
  //  0003：会员注册
  //  0004：积分奖励
  //  0005：实名认证
  get(opType, isRead) {
    if (opType === 'all') {
      opType = null
    }
    if (isRead === 'all') {
      isRead = null
    }
    return Api().get('logContext/voList', {
      params: { opType: opType, isRead: isRead }
    })
  },
  read(messageId) {
    return Api().get('logContext/isRead', { params: { messageId: messageId } })
  },
  readAll() {
    return Api().get('logContext/isAllRead')
  }
}
