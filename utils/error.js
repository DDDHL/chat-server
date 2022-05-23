// 主要错误中间件
exports.checkToken = (err, req, res, next) => {
  // token过期
  if (err.name === 'UnauthorizedError') {
    return res.send({ code: 1002, message: '登录信息已过期', data: {} })
  }
  // 参数不对
  if (err.message == 1006) {
    return res.send({ code: 1006, message: '参数错误', data: {} })
  }
}

// 服务器错误中间件
exports.err = (err, req, res, next) => {
  console.log('服务器错误' + err.message)
  res.send({
    code: 1001,
    message: '服务器错误',
    data: err.message,
  })
}
// 解决数据库异步错误
exports.promiseErr = (err, res) => {
  console.log('数据库操作错误:', err.sqlMessage)
  res.send({
    code: 1006,
    message: '参数错误,请检查接口',
  })
}
