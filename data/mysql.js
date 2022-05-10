// mysql.js 封装的插入函数
const mysql = require('mysql')

// 连接数据库
const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'chat-server',
})
// 检查 MySQL 模块是否正常
db.query('SELECT 1', (err, results) => {
  if (err) throw new Error(err.message)
})

exports.getUserInfo = () => {
  let strSql = 'select id,name,account,signature,sex from sys_user'
  return new Promise((resolve, reject) => {
    db.query(strSql, [data], async (err, results) => {
      if (err) reject(err.message)
      resolve(results)
    })
  })
}
