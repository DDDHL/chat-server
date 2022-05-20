// 生成服务器图片地址
exports.newImageAddress = (host, data) => {
  for (let i = 0; i < data.length; i++) {
    data[i].avatar = 'http://' + host + '/public/images/' + data[i].avatar
  }
  return data
}
