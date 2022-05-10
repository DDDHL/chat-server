// 密码加密解密
const CryptoJS = require('crypto-js')

// 默认的 KEY 与 iv 如果没有给
const KEY = CryptoJS.enc.Utf8.parse('dddhl520526.>?')
const IV = CryptoJS.enc.Utf8.parse('dddhl520526.>?')
/**
 * AES加密 ：字符串 key iv  返回base64
 */
const Encrypt = (word, keyStr, ivStr) => {
  let key = KEY
  let iv = IV
  if (keyStr) {
    key = CryptoJS.enc.Utf8.parse(keyStr)
    iv = CryptoJS.enc.Utf8.parse(ivStr)
  }
  let srcs = CryptoJS.enc.Utf8.parse(word)
  var encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding,
  })
  return CryptoJS.enc.Base64.stringify(encrypted.ciphertext)
}
/**
 * AES 解密 ：字符串 key iv  返回base64
 *
 * @return {string}
 */
const Decrypt = (word) => {
  let key = KEY
  let iv = IV

  let base64 = CryptoJS.enc.Base64.parse(word)
  let src = CryptoJS.enc.Base64.stringify(base64)

  let decrypt = CryptoJS.AES.decrypt(src, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.ZeroPadding,
  })

  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
  return decryptedStr.toString()
}

module.exports = { Encrypt, Decrypt }
