exports.chatServer = (port) => {
  const ws = require('nodejs-websocket')
  const server = ws.createServer(function (socket) {
    // 读取字符串消息，事件名称为:text
    var count = 1
    socket.on('text', function (str) {
      // 在控制台输出前端传来的消息
      console.log(str)
      //向前端回复消息
      socket.sendText('服务器端收到客户端发来的消息' + str + count++)
    })

    socket.on('error', () => {
      console.log('聊天服务器出错')
    })
  })
  server.listen(port, () => {
    console.log('')
    console.log('聊天服务器开启成功')
    console.log('服务器IP:http://localhost:' + port)
    console.log('')
  })
}
