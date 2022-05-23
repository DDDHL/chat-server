const ws = require('nodejs-websocket')
const { saveChatRecordBySingle } = require('../data/chatRecordSql')
var dayjs = require('dayjs')
var server
var userList = new Map()
exports.chatServer = (port) => {
  server = ws.createServer(function (socket) {
    // 读取字符串消息，事件名称为:text
    socket.on('text', function (str) {
      let data = JSON.parse(str)
      if (data.state == 'connet') {
        // 新用户连接进来
        userList.set(data.account, socket)
      } else {
        // 发送信息
        sendMsg(data.toAccount, data.fromAccount, data.msg)
      }
    })
    socket.on('error', () => {
      console.log('有客户端断开')
    })
  })
  server.listen(port, () => {
    console.log('')
    console.log('聊天服务器开启成功')
    console.log('服务器IP:http://localhost:' + port)
    console.log('')
  })
}
function sendMsg(to, from, msg) {
  let toConn = userList.get(to)
  let fromConn = userList.get(from)
  // 保存单人聊天信息
  let time = dayjs().format('YYYY-MM-DD HH:mm')
  saveChatRecordBySingle(from, to, msg, time)
    .then((res) => {
      if (res.affectedRows == 1) {
        if (toConn) {
          // 在线情况下发送
          toConn.sendText(
            JSON.stringify({
              fromUser: from,
              toUser: to,
              chatRecord: msg,
              createTime: time,
            })
          )
        }
        if (fromConn) {
          // 在线情况下发送
          fromConn.sendText(
            JSON.stringify({
              fromUser: from,
              toUser: to,
              chatRecord: msg,
              createTime: time,
            })
          )
        }
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
