// 操作用户信息数据库
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
exports.regUser = (account, password) => {
  let strSql =
    'insert into sys_user(account, password, sex, name ,avatar,signature) values(?,?,?,?,?,?)'
  return new Promise((resolve, reject) => {
    db.query(
      strSql,
      [account, password, '男', '立花泷', 'head.jpg', '这个人很懒,没有签名'],
      (err, results) => {
        if (err) reject(err.message)
        resolve(results)
      }
    )
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
    'select id,name,account,signature,sex,avatar from sys_user where account = (?)'
  return new Promise((resolve, reject) => {
    db.query(strSql, [account], async (err, results) => {
      if (err) reject(err.message)
      resolve(results)
    })
  })
}

// 模糊查询好友
exports.blurSearch = (data, friend) => {
  let strSql = `select id,account,sex,signature,name,avatar from sys_user where (account like '%${data}%' or name like '%${data}%') and account not in (${friend})`
  return new Promise((resolve, reject) => {
    db.query(strSql, (err, results) => {
      if (err) reject(err.message)
      resolve(results)
    })
  })
}

// 修改个人资料
exports.updateInfo = (sex, name, signature, account) => {
  let strSql =
    'update sys_user set sex = (?),name=(?),signature= (?) where account = (?)'
  return new Promise((resolve, reject) => {
    db.query(strSql, [sex, name, signature, account], (err, results) => {
      if (err) reject(err.message)
      resolve(results)
    })
  })
}
