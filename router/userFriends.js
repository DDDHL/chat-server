// 用户好友路由
var express = require('express')
var router = express.Router()
const {
  searchFriendList,
  searchFriendListInfo,
} = require('../data/userFriendSql')
const { newImageAddress } = require('../utils/imagesAddress')

// 用户新增好友
router.post('/addNewFriend', (req, res) => {})

// 用户获取好友列表
router.post('/getFriendList', (req, res) => {
  let account = req.body.account
  if (!account) {
    throw new Error(1006)
  }
  searchFriendList(account).then((result) => {
    let data = ''
    let list = JSON.parse(result[0].friendId)
    // 循环处理成 '',''
    for (let i = 0; i < list.length; i++) {
      data += "'" + list[i] + "'"
      if (i != list.length - 1) {
        data += ','
      }
    }
    searchFriendListInfo(data).then((result) => {
      res.send({
        code: '',
        message: '',
        data: newImageAddress(req.headers.host, result),
      })
    })
  })
})
module.exports = router
