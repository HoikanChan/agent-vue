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

export function cnNum(num) {
  var chnNumChar = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  var chnUnitChar = ['', '十', '百', '千', '万', '亿', '万亿', '亿亿']
  var strIns = '',
    chnStr = ''
  var unitPos = 0
  var zero = true
  while (num > 0) {
    var v = num % 10
    if (v === 0) {
      if (!zero) {
        zero = true
        chnStr = chnNumChar[v] + chnStr
      }
    } else {
      zero = false
      strIns = chnNumChar[v]
      strIns += chnUnitChar[unitPos]
      chnStr = strIns + chnStr
    }
    unitPos++
    num = Math.floor(num / 10)
  }
  return chnStr
}
