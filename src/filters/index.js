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
  const arr = String(num).split('')
  const strArr = ['', '万']
  let apartNum = Number(arr.splice(-4).join(''))
  console.log(apartNum)
  if (!!apartNum) {
    const wNum = Number(arr.join(''))
    if (wNum) {
      return wNum + '万' + apartNum
    } else {
      return apartNum
    }
  } else {
    return arr.join('') + '万'
  }
}

// export function cnNum(num) {
//   var chnNumChar = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
//   var chnUnitChar = ['', '十', '百', '千', '万']
//   var strIns = '',
//     chnStr = ''
//   var unitPos = 0
//   var zero = true
//   while (num > 0) {
//     var v = num % 10
//     if (v === 0) {
//       if (!zero) {
//         zero = true
//         chnStr = chnNumChar[v] + chnStr
//       }
//     } else {
//       zero = false
//       if(chnUnitChar[unitPos]){
//         strIns = chnNumChar[v]
//         strIns += chnUnitChar[unitPos]
//       }else{
//         chnStr = num + chnStr
//         break
//       }
//     }
//     unitPos++
//     num = Math.floor(num / 10)
//   }
//   return chnStr
// }
