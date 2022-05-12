// 用户数据库
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

// 检测用户账户是否存在
exports.checkReg = (account) => {
  let strSql = 'select account from sys_user where account = (?)'
  return new Promise((resolve, reject) => {
    db.query(strSql, [account], (err, results) => {
      if (err) reject(err.message)
      resolve(results)
    })
  })
}

// 注册用户
exports.regUser = (account, password, sex, name) => {
  let strSql =
    'insert into sys_user(account, password, sex, name) values(?,?,?,?)'
  return new Promise((resolve, reject) => {
    db.query(strSql, [account, password, sex, name], (err, results) => {
      if (err) reject(err.message)
      resolve(results)
    })
  })
}

// 验证账户密码
exports.checkUser = (account) => {
  let strSql = 'select password from sys_user where account = (?)'
  return new Promise((resolve, reject) => {
    db.query(strSql, [account], (err, results) => {
      if (err) reject(err.message)
      resolve(results)
    })
  })
}

// 根据账户查询用户信息
exports.getUserInfo = (account) => {
  let strSql =
    'select id,name,account,signature,sex from sys_user where account = (?)'
  return new Promise((resolve, reject) => {
    db.query(strSql, [account], async (err, results) => {
      if (err) reject(err.message)
      resolve(results)
    })
  })
}
