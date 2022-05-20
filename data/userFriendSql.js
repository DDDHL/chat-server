// 操作用户好友数据库
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
  if (err) throw new Error('数据库连接失败')
})

// 注册时新增好友列表
exports.addFriendList = (account) => {
  let strSql = 'insert into sys_user_friends(userAccount) value(?)'
  return new Promise((resolve, reject) => {
    db.query(strSql, [account], (err, results) => {
      if (err) reject(err.message)
      resolve(results)
    })
  })
}

// 查询好友列表
exports.searchFriendList = (account) => {
  let strSql = 'select * from sys_user_friends where userAccount = (?)'
  return new Promise((resolve, reject) => {
    db.query(strSql, [account], (err, results) => {
      if (err) reject(err.message)
      resolve(results)
    })
  })
}

// 查询好友列表的详细信息
exports.searchFriendListInfo = (accountList) => {
  let strSql = `select id,account,sex,signature,name,avatar from sys_user where account in (${accountList})`
  return new Promise((resolve, reject) => {
    db.query(strSql, (err, results) => {
      if (err) reject(err.message)
      resolve(results)
    })
  })
}
