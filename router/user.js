// 用户路由
const createJWT = require('jsonwebtoken')
const {
  getUserInfo,
  checkUser,
  regUser,
  checkReg,
  blurSearch,
  updateInfo,
  changePwd,
} = require('../data/userSql')
const { addFriendList, searchFriendList } = require('../data/userFriendSql')
const { decrypt } = require('../utils/secret')
const { newImageAddress } = require('../utils/imagesAddress')
var express = require('express')
var router = express.Router()
var { promiseErr } = require('../utils/error')
// token 密钥
const secretKey = 'dddhl ^_^'

// 检测token有效性
router.post('/checkToken', (req, res) => {
  res.send({
    code: '',
    message: 'token有效',
    data: {},
  })
})

// 用户注册
router.post('/user/regUser', (req, res) => {
  let password = decrypt(req.body.password)
  if (!req.body.account || !password) {
    throw new Error(1006)
  }
  // 检测是否存在账号
  checkReg(req.body.account)
    .then((result) => {
      if (result.length == 0) {
        // 注册用户
        regUser(req.body.account, password)
          .then((result) => {
            if (result.affectedRows === 1) {
              // 生成好友列表
              addFriendList(req.body.account)
                .then((result) => {
                  if (result.affectedRows === 1) {
                    res.send({
                      code: '',
                      message: '注册成功',
                      data: {},
                    })
                  }
                })
                .catch((err) => {
                  promiseErr(err, res)
                })
            }
          })
          .catch((err) => {
            promiseErr(err, res)
          })
      } else {
        res.send({
          code: 1005,
          message: '账号被注册',
          data: {},
        })
      }
    })
    .catch((err) => {
      promiseErr(err, res)
    })
})

// 用户登录
router.post('/user/login', (req, res) => {
  var account = req.body.account
  var password = req.body.password
  if (!account || !password) {
    throw new Error(1006)
  }
  checkUser(account)
    .then((result) => {
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
        getUserInfo(account)
          .then((result) => {
            res.send({
              code: '',
              message: '登录成功',
              data: {
                token: createJWT.sign({ account }, secretKey, {
                  expiresIn: '999h',
                }),
                info: newImageAddress(req.headers.host, result),
              },
            })
          })
          .catch((err) => {
            promiseErr(err, res)
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
    .catch((err) => {
      promiseErr(err, res)
    })
})

// 模糊查询用户
router.post('/blurSearch', (req, res) => {
  let data = req.body.params
  let account = req.auth.account
  if (!data || !account) {
    throw new Error(1006)
  }
  // 先查询已添加好友
  searchFriendList(account)
    .then((result) => {
      let friends = "'" + account + "'"
      if (result.length) {
        var list = JSON.parse(result[0].friendId)
      }
      if (list === undefined) {
        res.send({
          code: 1007,
          message: '不允许未注册用户查询',
          data: [],
        })
        return
      }
      if (list != null) {
        // 用户有好友，排除好友和自己
        // 循环处理成 '',''
        friends += ','
        for (let i = 0; i < list.length; i++) {
          friends += "'" + list[i] + "'"
          if (i != list.length - 1) {
            friends += ','
          }
        }
      }
      // 用户没有添加好友，模糊查询除自己外的所有用户
      blurSearch(data, friends)
        .then((result) => {
          res.send({
            code: '',
            message: '',
            data: newImageAddress(req.headers.host, result),
          })
        })
        .catch((err) => {
          promiseErr(err, res)
        })
    })
    .catch((err) => {
      promiseErr(err, res)
    })
})

// 修改个人信息
router.post('/changeInfo', (req, res) => {
  let account = req.auth.account
  let sex = req.body.sex
  let name = req.body.name
  let signature = req.body.signature
  if (!account || !sex || !name || !signature) {
    throw new Error(1006)
  }
  updateInfo(sex, name, signature, account)
    .then((result) => {
      if (result.affectedRows == 1) {
        res.send({
          code: '',
          message: '更新个人信息成功!',
          data: {},
        })
      }
    })
    .catch((err) => {
      promiseErr(err, res)
    })
})

// 用户修改密码
router.post('/changePwd', (req, res) => {
  let account = req.auth.account
  let password = req.body.password
  let newPwd = req.body.newPwd
  if (!account || !password || !newPwd) {
    throw new Error(1006)
  }
  changePwd(account, decrypt(password), decrypt(newPwd))
    .then((result) => {
      if (result.affectedRows == 1) {
        res.send({
          code: '',
          message: '修改密码成功!',
          data: {},
        })
        d
      } else {
        res.send({
          code: 1008,
          message: '原密码错误!',
          data: {},
        })
      }
    })
    .catch((err) => {
      promiseErr(err, res)
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
