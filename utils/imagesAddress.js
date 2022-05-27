// 生成服务器图片地址
exports.newImageAddress = (host, data, state = 'true') => {
  if (state == 'true') {
    for (let i = 0; i < data.length; i++) {
      data[i].avatar = 'http://' + host + '/public/images/' + data[i].avatar
    }
  } else if (state == 'false') {
    for (let i = 0; i < data.length; i++) {
      if (data[i].imgPath) {
        data[i].imgPath = 'http://' + host + '/public/group/' + data[i].imgPath
      } else {
        data[i].imgPath = ''
      }
    }
  }
  return data
}
