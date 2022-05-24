// 操作图片
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

// 更新头像
exports.updateAvatar = (account, avatar) => {
  console.log(account, avatar)
  let strSql = 'update sys_user set avatar=(?) where account = (?)'
  return new Promise((resolve, reject) => {
    db.query(strSql, [avatar, account], (err, results) => {
      if (err) reject(err.message)
      resolve(results)
    })
  })
}
