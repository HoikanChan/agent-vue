export function level(level) {
  switch (Number(level)) {
    case 4:
      return '大区'
    case 3:
      return '大区'
    case 2:
      return '总代'
    case 1:
      return '官方合伙人'
    default:
      return '暂无'
  }
}

export function numFilter(value) {
  // 截取当前数据到小数点后两位

  let realVal = Number(value).toFixed(2)

  // num.toFixed(2)获取的是字符串

  return Number(realVal)
}
