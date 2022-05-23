// 操作聊天记录数据库
const mysql = require('mysql')

// 连接数据库
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '123456',
  database: 'chat-server',
})
// 检查 MySQL 模块是否正常
db.query('SELECT 1', (err, results) => {
  if (err) throw new Error('数据库连接失败')
})

// 单人聊天记录保存
exports.saveChatRecordBySingle = (from, to, record, time) => {
  let strSql =
    'insert into sys_chat_records(fromUser, toUser, chatRecord, createTime) value(?,?,?,?)'
  return new Promise((resolve, reject) => {
    db.query(strSql, [from, to, record, time], (err, results) => {
      if (err) reject(err.message)
      resolve(results)
    })
  })
}

// 查询单人聊天记录
exports.checkChatRecordBySingle = (from, to, pageSize) => {
  let strSql = `select * from sys_chat_records where (toUser = (?) and fromUser=(?)) or (fromUser = (?) and toUser = (?)) ORDER BY id DESC LIMIT ${pageSize}`
  return new Promise((resolve, reject) => {
    db.query(strSql, [from, to, from, to], (err, results) => {
      if (err) reject(err)
      resolve(results)
    })
  })
}
