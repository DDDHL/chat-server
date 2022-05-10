// 处理token过期情况
exports.checkToken = (err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.send({ status: 1001, message: '登录信息已过期' })
  }
  console.log(err)
  return res.send({ status: 1002, message: '其他错误' })
}

// 其他错误中间件
exports.err = (err, req, res, next) => {
  console.log('服务器发生了错误' + err.message)
  res.send('Error!' + err.message)
}
