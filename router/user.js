// 用户路由
const createJWT = require('jsonwebtoken')
const { getUserInfo, checkUser, regUser, checkReg } = require('../data/userSql')
const { decrypt } = require('../utils/secret')
var express = require('express')
var router = express.Router()
// token 密钥
const secretKey = 'dddhl ^_^'

// 用户注册
router.post('/user/regUser', (req, res) => {
  let password = decrypt(req.body.password)
  if (!req.body.account || !password) {
    throw new Error(1006)
  }
  checkReg(req.body.account).then((result) => {
    if (result.length == 0) {
      regUser(req.body.account, password).then((result) => {
        if (result.affectedRows === 1) {
          res.send({
            code: '',
            message: '注册成功',
            data: {},
          })
        }
      })
    } else {
      res.send({
        code: 1005,
        message: '账号被注册',
        data: {},
      })
    }
  })
})

// 用户登录
router.post('/user/login', (req, res) => {
  var account = req.body.account
  var password = req.body.password
  if (!account || !password) {
    throw new Error(1006)
  }
  checkUser(account).then((result) => {
    if (result.length == 0) {
      // 没有该用户
      res.send({
        code: 1003,
        message: '账号未注册',
        data: {},
      })
      return
    }
    // 有此用户，进行判断
    if (decrypt(password) === result[0].password) {
      getUserInfo(account).then((result) => {
        res.send({
          code: '',
          message: '登录成功',
          data: {
            token: createJWT.sign({ account }, secretKey, {
              expiresIn: '2h',
            }),
            info: result[0],
          },
        })
      })
    } else {
      // 密码错误
      res.send({
        code: 1004,
        message: '密码错误',
        data: {},
      })
    }
  })
})

// 用户退出
router.post('/logout', (req, res) => {
  res.send({
    code: '',
    message: '退出登录成功',
    data: { token解析: req.auth.account },
  })
})

module.exports = router
