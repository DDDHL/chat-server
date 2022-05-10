const express = require('express')
const app = express()
const createJWT = require('jsonwebtoken')
var { expressjwt: jwt } = require('express-jwt')
const cors = require('cors')
const error = require('./utils/error')
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
    code: 200,
    message: '退出登录成功',
    data: { 用户: req.auth.account },
  })
})

app.post('/user/login', (req, res) => {
  var account = req.body.account
  res.send({
    status: 200,
    message: '登录成功',
    token: createJWT.sign({ account }, secretKey, { expiresIn: '2h' }),
  })
})

// 处理异常，错误中间件
app.use(error.checkToken)
app.use(error.err)

app.listen(7777, () => {
  console.log('http://127.0.0.1:7777')
})
