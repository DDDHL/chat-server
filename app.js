const express = require('express')
const app = express()
const createJWT = require('jsonwebtoken')
const cors = require('cors')
const error = require('./utils/error')
var { expressjwt: jwt } = require('express-jwt')
const { getUserInfo, checkUser } = require('./data/user')
// token 密钥
const secretKey = 'dddhl ^_^'

// 跨域
app.use(cors())

// 解析json
app.use(express.json())

// 解析token信息  user开头的接口无需验证
app.use(
  jwt({
    secret: secretKey,
    algorithms: ['HS256'],
  }).unless({ path: [/^\/user\//] })
)

// 接口
app.post('/logout', (req, res) => {
  res.send({
    code: '',
    message: '退出登录成功',
    data: { token解析: req.auth.account },
  })
})

app.post('/user/login', (req, res) => {
  var account = req.body.account
  var password = req.body.password
  checkUser(account).then((result) => {
    if (!result[0]) {
      // 没有该用户
      res.send({
        code: 1003,
        message: '该账号未注册',
        data: {},
      })
      return
    }
    // 有此用户，进行判断
    if (password === result[0].password) {
      getUserInfo(account).then((result) => {
        res.send({
          code: '',
          message: '登录成功',
          data: {
            token: createJWT.sign({ account }, secretKey, {
              expiresIn: '2h',
            }),
            info: result,
          },
        })
        return
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

// 处理异常，错误中间件
app.use(error.checkToken)
app.use(error.err)

app.listen(7777, () => {
  console.log('http://127.0.0.1:7777')
})
