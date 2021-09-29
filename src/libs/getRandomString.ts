/**
 * 获取随机字符串
 * @param len 所需要的字符串长度
 */
const getRandomString = (len = 10): string => {
  const CHARS = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz012345678'
  const MAX_LENGTH: number = CHARS.length

  let randomStr = ''
  for (let i = 0; i < len; i++) {
    randomStr += CHARS.charAt(Math.floor(Math.random() * MAX_LENGTH))
  }
  return randomStr
}

export default getRandomString
