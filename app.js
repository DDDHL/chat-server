const express = require('express')
const app = express()
const cors = require('cors')
const error = require('./utils/error')
const userRouter = require('./router/user.js')
var { expressjwt: jwt } = require('express-jwt')

// 跨域
app.use(cors())

// 解析json
app.use(express.json())

// 解析token信息  user开头的接口无需验证
const secretKey = 'dddhl ^_^'
app.use(
  jwt({
    secret: secretKey,
    algorithms: ['HS256'],
  }).unless({ path: [/^\/user\//] })
)

// 用户模块接口
app.use(userRouter)

// 处理异常，错误中间件
app.use(error.checkToken)
app.use(error.err)

app.listen(7777, () => {
  console.log('http://127.0.0.1:7777')
})
