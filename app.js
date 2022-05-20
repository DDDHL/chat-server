const express = require('express')
const app = express()
const cors = require('cors')
const error = require('./utils/error')
const userRouter = require('./router/user')
const userFriendRouter = require('./router/userFriends')
const path = require('path')
const chat = require('./webSocket/chatServer')
var { expressjwt: jwt } = require('express-jwt')

// 聊天服务器接口
const ChatServerPort = 4000
// express服务器接口
const ServerPort = 7777

// 聊天服务器
chat.chatServer(ChatServerPort)

// 跨域
app.use(cors())

// 图片共享
app.use('/public', express.static(path.join(__dirname, 'public')))

// 解析json
app.use(express.json())

// 解析token信息  user开头的接口无需验证
const secretKey = 'dddhl ^_^'
app.use(
  jwt({
    secret: secretKey,
    algorithms: ['HS256'],
  }).unless({ path: [/^\/user\//, /^\/public\//] })
)

// 用户模块接口
app.use(userRouter)
// 用户好友模块
app.use(userFriendRouter)

// 处理异常，错误中间件
app.use(error.checkToken)
app.use(error.err)

app.listen(ServerPort, () => {
  console.log('express服务器开启成功')
  console.log('服务器IP地址: http://localhost:' + ServerPort)
})
